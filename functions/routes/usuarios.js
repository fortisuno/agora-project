const { firestore, auth } = require("../server");
const { Router } = require("express");
const { v4 } = require("uuid");
const { handleAutherror } = require("../handleAuthError");

const router = Router();
const COLLECTION = "usuarios";
const INTERNAL_ERROR_MESSAGE = ", por favor intente nuevamente o comuníquese con el administrador del sistema";

router.post(`/${COLLECTION}/add`, addUser);

router.get(`/${COLLECTION}/:id`, getUser);

router.delete(`/${COLLECTION}/:id`, deleteUser);

router.put(`/${COLLECTION}/:id`, updateUser);

const addUser = async ({ body }, res) => {
	try {
		const { password, ...content } = body;
		const { email, phoneNumber, nombre, apellidoPaterno, apellidoMaterno } = content;
		const displayName = `${nombre} ${apellidoPaterno} ${apellidoMaterno}`;

		const user = { uid: v4(), password, email, displayName };
		!!phoneNumber && (user.phoneNumber = "+52" + phoneNumber);

		const { uid } = await auth.createUser(user);
		const docRef = firestore.collection(COLLECTION).doc(uid);

		await docRef.set(content);

		return res.status(200).json({ message: "Usuario creado con exito" });
	} catch (error) {
		const { id, email, phoneNumber } = body;
		const errorMessage = `Hubo un error al agregar el usuario ${id}` + INTERNAL_ERROR_MESSAGE;
		const httpError = handleAutherror(error, { id, phoneNumber, email }, errorMessage);
		return res.status(httpError.status).json({ message: httpError.message });
	}
};

const getUser = async ({ params }, res) => {
	try {
		const docRef = firestore.collection(COLLECTION).doc(params.id);
		const snapshot = await docRef.get();

		if (!snapshot.exists) {
			return res.status(404).json({ message: `El usuario ${params.id} no existe` });
		}

		const snapshotData = snapshot.data();
		return res.status(200).json({ id: snapshot.id, ...snapshotData });
	} catch (error) {
		return res.status(500).json({
			message: `Hubo un error al obtener el usuario ${params.id}` + INTERNAL_ERROR_MESSAGE
		});
	}
};

const deleteUser = async ({ params }, res) => {
	try {
		await auth.deleteUser(params.id);

		const docRef = firestore.collection(COLLECTION).doc(params.id);
		const snapshot = await docRef.get();

		if (!snapshot.exists) {
			return res.status(404).json({ message: `El usuario ${params.id} no existe` });
		}

		const { tipo } = snapshot.data();

		const collectionRef = tipo === "cliente" ? "pedidos" : "propuestas";

		const query = firestore.collection(collectionRef).where("usuarioId", "==", params.id);

		const querySnapshot = await query.get();
		const docs = querySnapshot.docs.map((doc) => doc.id);

		const batch = firestore.batch();

		docs.forEach((id) => {
			batch.delete(db.collection(collectionRef).doc(id));
		});
		batch.delete(docRef);
		batch.commit();

		return res.status(200).json({ message: `El usuario ${params.id} ha sido eliminado` });
	} catch (error) {
		const { id } = params;
		const errorMessage = `Hubo un error al eliminar el usuario ${id}` + INTERNAL_ERROR_MESSAGE;
		const httpError = handleAutherror(error, { id, phoneNumber: "", email: "" }, errorMessage);
		return res.status(httpError.status).json({ message: httpError.message });
	}
};

const updateUser = async ({ body }, res) => {
	try {
		const { id, ...content } = body;
		const docRef = firestore.collection(COLLECTION).doc(id);
		const snapshot = await docRef.get();

		if (!snapshot.exists) {
			return res.status(404).json({ message: `El usuario ${body.id} no existe` });
		}

		const current = snapshot.data();

		const displayName = `${content.nombre || current.nombre} ${content.apellidoPaterno || current.apellidoPaterno} ${
			content.apellidoMaterno || current.apellidoMaterno
		}`;

		const { uid } = await auth.updateUser(id, { displayName, email, phoneNumber });

		await docRef.update(content);

		return res.status(200).json({ message: `El usuario ${uid} ha sido actualizado` });
	} catch (error) {
		const { id, email, phoneNumber } = body;
		const errorMessage = `Hubo un error al actualizar el usuario ${id}` + INTERNAL_ERROR_MESSAGE;
		const httpError = handleAutherror(error, { id, phoneNumber, email }, errorMessage);
		return res.status(httpError.status).json({ message: httpError.message });
	}
};

module.exports = router;
