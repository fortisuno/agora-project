const { firestore, auth } = require("../server");
const { Router } = require("express");

const router = Router();
const COLLECTION = "propuestas";

const addOne = async ({ body }, res) => {
	try {
		const date = new Date();
		const id = date.getTime().toString();

		const docRef = firestore.collection(COLLECTION).doc(id);

		const writeResult = await docRef.set(body);

		return res.status(200).json({ message: `La propuesta ${id} ha sido creada`, writeResult });
	} catch (error) {
		return res.status(500).json({
			message: `Hubo un error al agregar la propuesta`
		});
	}
};

const getAll = async ({ query }, res) => {
	try {
		let docRef = firestore.collection(COLLECTION).where("pedidoId", "==", query.pedidoId);
		const snapshot = await docRef.get();

		const snapshotData = snapshot.docs.map((doc) => {
			return {
				id: doc.id,
				...doc.data()
			};
		});

		return res.status(200).json(snapshotData);
	} catch (error) {
		return res.status(500).json({ message: "Hubo un error al obtener propuestas" });
	}
};

const getById = async ({ params }, res) => {
	try {
		const docRef = firestore.collection(COLLECTION).doc(params.id);
		const snapshot = await docRef.get();

		if (!snapshot.exists) {
			return res.status(404).json({ message: `La propuesta ${params.id} no existe.` });
		}

		const snapshotData = snapshot.data();
		return res.status(200).json(snapshotData);
	} catch (error) {
		return res.status(500).json({
			message: `Hubo un error al obtener la propuesta ${params.id}.`
		});
	}
};

const deleteById = async ({ params }, res) => {
	try {
		const docRef = firestore.collection(COLLECTION).doc(params.id);
		const snapshot = await docRef.get();

		if (!snapshot.exists) {
			return res.status(404).json({ message: `La propuesta ${params.id} no existe.` });
		}

		const writeResult = await docRef.delete();

		return res.status(200).json({ message: `La propuesta ${params.id} ha sido eliminada.`, writeResult });
	} catch (error) {
		return res.status(500).json({
			message: `Hubo un error al eliminar la propuesta ${params.id}.`
		});
	}
};

const updateById = async ({ params, body }, res) => {
	try {
		const docRef = firestore.collection(COLLECTION).doc(params.id);
		const snapshot = await docRef.get();

		if (!snapshot.exists) {
			return res.status(404).json({ message: `La propuesta ${params.id} no existe.` });
		}

		const writeResult = await docRef.update(body);

		return res.status(200).json({ message: `La propuesta ${params.id} ha sido actualizada.`, writeResult });
	} catch (error) {
		return res.status(500).json({
			message: `Hubo un error al actualizar la propuesta ${params.id}.`
		});
	}
};

router.post(`/${COLLECTION}/add`, addOne);

router.get(`/${COLLECTION}/:id`, getById);

router.get(`/${COLLECTION}`, getAll);

router.delete(`/${COLLECTION}/:id`, deleteById);

router.put(`/${COLLECTION}/:id`, updateById);

module.exports = router;
