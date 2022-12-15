const { firestore, auth } = require("../server");
const { Router } = require("express");

const router = Router();
const COLLECTION = "pedidos";

const addOne = async ({ body }, res) => {
	try {
		const date = new Date();
		const id = date.getTime().toString();

		const docRef = firestore.collection(COLLECTION).doc(id);

		const writeResult = await docRef.set(body);

		return res.status(200).json({ message: `El pedido ${id} ha sido creado`, writeResult });
	} catch (error) {
		return res.status(500).json({
			message: `Hubo un error al agregar el pedido`
		});
	}
};

const getAll = async ({ query }, res) => {
	try {
		const docRef = firestore.collection(COLLECTION).where("usuario.id", "==", query.usuarioId);
		const snapshot = await docRef.get();

		const snapshotData = snapshot.docs.map((doc) => {
			return {
				id: doc.id,
				...doc.data()
			};
		});

		return res.status(200).json(snapshotData);
	} catch (error) {
		return res.status(500).json({ message: "Hubo un error al obtener pedidos" });
	}
};

const getById = async ({ params }, res) => {
	try {
		const docRef = firestore.collection(COLLECTION).doc(params.id);
		const snapshot = await docRef.get();

		if (!snapshot.exists) {
			return res.status(404).json({ message: `El pedido ${params.id} no existe.` });
		}

		const snapshotData = snapshot.data();
		return res.status(200).json(snapshotData);
	} catch (error) {
		return res.status(500).json({
			message: `Hubo un error al obtener el pedido ${params.id}.`
		});
	}
};

const deleteById = async ({ params }, res) => {
	try {
		const docRef = firestore.collection(COLLECTION).doc(params.id);
		const snapshot = await docRef.get();

		if (!snapshot.exists) {
			return res.status(404).json({ message: `El pedido ${params.id} no existe.` });
		}

		const query = firestore.collection("propuestas").where("pedidoId", "==", params.id);

		const querySnapshot = await query.get();

		const batch = firestore.batch();

		querySnapshot.docs.forEach((doc) => {
			batch.delete(doc.ref);
		});

		batch.delete(docRef);

		const writeResult = await batch.commit();

		return res.status(200).json({ message: `El pedido ${params.id} ha sido eliminado.`, writeResult });
	} catch (error) {
		return res.status(500).json({
			message: `Hubo un error al eliminar el pedido ${params.id}.`
		});
	}
};

const updateById = async ({ params, body }, res) => {
	try {
		const docRef = firestore.collection(COLLECTION).doc(params.id);
		const snapshot = await docRef.get();

		if (!snapshot.exists) {
			return res.status(404).json({ message: `El pedido ${params.id} no existe.` });
		}

		const writeResult = await docRef.update(body);

		return res.status(200).json({ message: `El pedido ${params.id} ha sido actualizado.`, writeResult });
	} catch (error) {
		return res.status(500).json({
			message: `Hubo un error al actualizar el pedido ${params.id}.`
		});
	}
};

router.post(`/${COLLECTION}/add`, addOne);

router.get(`/${COLLECTION}/:id`, getById);

router.get(`/${COLLECTION}`, getAll);

router.delete(`/${COLLECTION}/:id`, deleteById);

router.put(`/${COLLECTION}/:id`, updateById);

module.exports = router;
