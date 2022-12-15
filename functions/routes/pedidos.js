const { firestore, auth } = require("../server");
const { Router } = require("express");

const router = Router();
const COLLECTION = "pedidos";
const INTERNAL_ERROR_MESSAGE = ", por favor intente nuevamente o comuníquese con el administrador del sistema";

router.post("/pedidos", async (req, res) => {
	try {
		const data = fs.Timestamp.now().toMillis() / 1000;
		await db
			.collection("pedidos")
			.doc("/" + data.toFixed(0) + "/")
			.create({
				titulo: req.body.titulo,
				usuarioId: req.body.usuarioId,
				usuarioNombre: req.body.usuarioNombre,
				presupuesto: req.body.presupuesto,
				cantidad: req.body.cantidad,
				unidad: req.body.unidad,
				categoria: req.body.categoria,
				descripcion: req.body.descripcion,
				ubicacion: req.body.ubicacion
			});

		const snapshot = await db.collection("usuarios").get();
		snapshot.forEach((doc) => {
			console.log(doc.id, "=>", doc.data());
		});

		return res.status(200).json({ message: "Pedido creado con exito" });
	} catch (error) {
		return res.status(500).send(error);
	}
});

router.get("/pedidos/:id", async (req, res) => {
	try {
		const doc = db.collection("pedidos").doc(req.params.id);
		const item = await doc.get();
		const respose = item.data();
		return res.status(200).json(respose);
	} catch (error) {
		return res.status(500).send(error);
	}
});

router.get("/pedidos", async (req, res) => {
	try {
		const query = db.collection("pedidos");
		const querySnapshot = await query.get();
		const docs = querySnapshot.docs;

		const response = docs.map((doc) => ({
			id: doc.id,
			name: doc.data().titulo,
			categoria: doc.data().categoria,
			ubicacion: doc.data().ubicacion
		}));

		return res.status(200).json(response);
	} catch (error) {
		return res.status(500).send(error);
	}
});

router.delete("/pedidos/:id", async (req, res) => {
	try {
		const document = db.collection("pedidos").doc(req.params.id);
		await document.delete();
		return res.status(200).json();
	} catch (error) {
		return res.status(500).send(error);
	}
});

router.patch("/pedidos/:id", async (req, res) => {
	try {
		const document = db.collection("pedidos").doc(req.params.id);
		await document.update({
			titulo: req.body.name,
			presupuesto: req.body.presupuesto,
			cantidad: req.body.cantidad,
			unidad: req.body.unidad,
			categoria: req.body.categoria,
			descripcion: req.body.descripcion,
			ubicacion: req.body.ubicacion
		});
		return res.status(200).json({ message: "Cambios realizados con exito" });
	} catch (error) {
		return res.status(500).send(error);
	}
});

const addPedido = async ({ body }, res) => {
	try {
		const docRef = firestore.collection(COLLECTION).doc(id);
		const snapshot = await docRef.get();

		await docRef.set({ ...body, search: body.titulo.toLowerCase() });

		return res.status(200).json({ message: `La categoría ${id} ha sido creado` });
	} catch (error) {
		return res.status(500).json({
			message: `Hubo un error al agregar el pedido`
		});
	}
};

const getAllPedidos = async (req, res) => {
	try {
		let docRef = firestore.collection(COLLECTION);
		const snapshot = await docRef.get();

		const snapshotData = snapshot.docs.map((doc) => {
			const { search, ...content } = doc.data();

			return {
				id: doc.id,
				...content
			};
		});

		return res.status(200).json(snapshotData);
	} catch (error) {
		return res.status(500).json({ message: "Hubo un error al obtener pedidos" });
	}
};

const getPedido = async ({ params }, res) => {
	try {
		const docRef = firestore.collection(COLLECTION).doc(params.id);
		const snapshot = await docRef.get();

		if (!snapshot.exists) {
			return res.status(404).json({ message: `El pedido ${params.id} no existe` });
		}

		const snapshotData = snapshot.data();
		return res.status(200).json(snapshotData);
	} catch (error) {
		return res.status(500).json({
			message: `Hubo un error al obtener el pedido ${params.id}`
		});
	}
};

module.exports = router;
