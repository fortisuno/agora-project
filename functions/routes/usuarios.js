const { firestore, auth } = require("../server");
const { Router } = require("express");
const { v4 } = require("uuid");
const { handleAutherror } = require("../handleAuthError");

const router = Router();
const COLLECTION = "usuarios";

const addOne = async ({ body }, res) => {
	try {
		const { password, ...content } = body;
		const { email, phoneNumber, nombre, apellidoPaterno, apellidoMaterno, tipo, ubicacion } = content;
		const displayName = `${nombre} ${apellidoPaterno} ${apellidoMaterno}`;

		const user = { uid: v4(), password, email, displayName };
		!!phoneNumber && (user.phoneNumber = "+52" + phoneNumber);

		const { uid } = await auth.createUser(user);
		const docRef = firestore.collection(COLLECTION).doc(uid);

		await docRef.set({
			ubicacion,
			tipo,
			nombre,
			apellidoPaterno,
			apellidoMaterno,
			avatar: `${nombre.charAt(0)}${apellidoPaterno.charAt(0)}`
		});

		return res.status(200).json({ message: "Usuario creado con exito" });
	} catch (error) {
		const { email, phoneNumber } = body;
		const errorMessage = `Hubo un error al agregar el usuario`;
		const httpError = handleAutherror(error, { phoneNumber, email }, errorMessage);
		return res.status(httpError.status).json({ message: httpError.message, details: error });
	}
};

const getById = async ({ params }, res) => {
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
			message: `Hubo un error al obtener el usuario ${params.id}`
		});
	}
};

const deleteById = async ({ params }, res) => {
	try {
		await auth.deleteUser(params.id);

		const docRef = firestore.collection(COLLECTION).doc(params.id);
		const snapshot = await docRef.get();

		if (!snapshot.exists) {
			return res.status(404).json({ message: `El usuario ${params.id} no existe` });
		}

		const { tipo } = snapshot.data();

		const collectionRef = tipo === "cliente" ? "pedidos" : "propuestas";

		const query = firestore.collection(collectionRef).where("usuario.id", "==", params.id);

		const querySnapshot = await query.get();

		const batch = firestore.batch();

		querySnapshot.docs.forEach((doc) => {
			batch.delete(doc.ref);
		});

		batch.delete(docRef);
		const writeResult = await batch.commit();

		return res.status(200).json({ message: `El usuario ${params.id} ha sido eliminado`, writeResult });
	} catch (error) {
		const { id } = params;
		const errorMessage = `Hubo un error al eliminar el usuario ${id}`;
		const httpError = handleAutherror(error, { id, phoneNumber: "", email: "" }, errorMessage);
		return res.status(httpError.status).json({ message: httpError.message });
	}
};

const updateById = async ({ params, body }, res) => {
	try {
		const docRef = firestore.collection(COLLECTION).doc(params.id);
		const snapshot = await docRef.get();

		if (!snapshot.exists) {
			return res.status(404).json({ message: `El usuario ${params.id} no existe` });
		}

		const current = snapshot.data();

		const displayName = `${body.nombre || current.nombre} ${body.apellidoPaterno || current.apellidoPaterno} ${
			body.apellidoMaterno || current.apellidoMaterno
		}`;

		const { uid } = await auth.updateUser(params.id, {
			displayName,
			email: body.email,
			phoneNumber: "+52" + body.phoneNumber
		});

		const collectionRef = current.tipo === "cliente" ? "pedidos" : "propuestas";

		const query = firestore.collection(collectionRef).where("usuario.id", "==", params.id);

		const querySnapshot = await query.get();

		const batch = firestore.batch();

		querySnapshot.docs.forEach((doc) => {
			const newData =
				current.tipo === "cliente"
					? { usuario: { id: params.id, displayName } }
					: {
							usuario: { id: params.id, displayName },
							ubicacion: body.ubicacion,
							email: body.email,
							phoneNumber: "+52" + body.phoneNumber
					  };
			batch.update(doc.ref, newData);
		});

		batch.update(docRef, {
			ubicacion: body.ubicacion,
			nombre: body.nombre,
			apellidoPaterno: body.apellidoPaterno,
			apellidoMaterno: body.apellidoMaterno,
			avatar: `${body.nombre.charAt(0)}${body.apellidoPaterno.charAt(0)}`
		});

		const writeResult = await batch.commit();

		return res.status(200).json({ message: `El usuario ${uid} ha sido actualizado`, writeResult });
	} catch (error) {
		const { email, phoneNumber } = body;
		const errorMessage = `Hubo un error al actualizar el usuario ${params.id}`;
		const httpError = handleAutherror(error, { id: params.id, phoneNumber, email }, errorMessage);
		return res.status(httpError.status).json({ message: httpError.message, details: error });
	}
};

router.post(`/${COLLECTION}/add`, addOne);

router.get(`/${COLLECTION}/:id`, getById);

router.delete(`/${COLLECTION}/:id`, deleteById);

router.put(`/${COLLECTION}/:id`, updateById);

module.exports = router;
