const functions = require("firebase-functions");
const admin = require("firebase-admin/app");
const { Router } = require("express");
const authen = require("firebase-admin/auth");
const fs = require("firebase-admin/firestore");
const uid = require("uuid");
const { app } = require("firebase-admin");

const db = fs.getFirestore();
const aut = authen.getAuth();

const router = Router();

const INTERNAL_ERROR_MESSAGE = ", por favor intente nuevamente o comuníquese con el administrador del sistema";

router.post("/usuarios", async (req, res) => {
	try {
		const uuid = uid.v4();
		const nombre = req.body.nombre;
		const apellidoPaterno = req.body.apellidoPaterno;
		const apellidoMaterno = req.body.apellidoMaterno;
		const nambre = nombre + apellidoPaterno + apellidoMaterno;
		const numero = "+52" + req.body.phoneNumber;

		await aut.createUser({
			uid: uuid,
			email: req.body.email,
			emailVerified: true,
			phoneNumber: numero,
			password: req.body.password,
			displayName: nambre
		});

		db.collection("usuarios")
			.doc("/" + uuid + "/")
			.create({
				nombre: req.body.nombre,
				apellidoPaterno: req.body.apellidoPaterno,
				apellidoMaterno: req.body.apellidoMaterno,
				tipo: req.body.tipo,
				ubicacion: req.body.ubicacion,
				email: req.body.email,
				phoneNumber: numero
			});

		return res.status(200).json({ message: "Usuario creado con exito" });
	} catch (error) {
		const errorMessage = `Hubo un error al agregar el usuario` + INTERNAL_ERROR_MESSAGE;
		return res.status(500).json({ message: errorMessage });
	}
});

router.get("/usuarios/:id", async (req, res) => {
	try {
		const doc = db.collection("usuarios").doc(req.params.id);
		const item = await doc.get();
		const response = item.data();
		return res.status(200).json({ message: "Usuario obtenido exitosamente." });
	} catch (error) {
		return res.status(500).send({ message: "Error en la solicitud." });
	}
});

router.get("/usuarios", async (req, res) => {
	try {
		const query = db.collection("usuarios");
		const querySnapshot = await query.get();
		const docs = querySnapshot.docs;

		const response = docs.map((doc) => ({
			nombre: doc.data().nombre,
			apellidoPaterno: doc.data().apellidoPaterno,
			apellidoMaterno: doc.data().apellidoMaterno,
			email: doc.data().email,
			phoneNumber: doc.data().phoneNumber,
			ubicacion: doc.data().ubicacion
		}));
		return res.status(200).json(response);
	} catch (error) {
		return res.status(500).json({ message: "Error en la solicitud." });
	}
});

router.delete("/usuarios/:id", async (req, res) => {
	try {
		// 0. Eliminar el usuario de la autenticacion
		await aut.deleteUser(req.params.id);

		// 1. Extraer el usuario id del queryParam
		const usuarioId = req.params.id;

		// 1.1. Obtener el documento del usuario

		let docs = [];
		let query = null
		let querySnapshot = null
		query = db.collection("usuarios");
		querySnapshot = await query.get();
		docs = querySnapshot.docs;

		const response = docs.map((tipo) => tipo.data().tipo);// se debe de obtener el tipo del usuario;

		// 2. Obtener el arreglo de pedidos o propuestas del usuario
		docs = [];
		query = null;
		querySnapshot = null;

		if (response === "cliente") {
			query = db.collection("pedidos");
			querySnapshot = await query.where("usuarioId", "==", usuarioId).get();
			docs = querySnapshot.docs;
		} else {
			query = db.collection("propuestas");
			querySnapshot = await query.where("usuarioId", "==", usuarioId).get();
			docs = querySnapshot.docs;
		}

		// 3. Mapear el arreglo de pedidos o propuestas para obtener el id de cada uno
		const pedidosIds = docs.map((pedido) => pedido.id);

		// 4. Crear batch
		const batch = db.batch();

		// 5. Iterar el arreglo de ids de pedidos o propuestas para eliminarlos por id
		if (response === "cliente"){
			pedidosIds.forEach((pedidoId) => {
				batch.delete(db.collection("pedidos").doc(pedidoId));
			});
		}else{
			pedidosIds.forEach((pedidoId) => {
				batch.delete(db.collection("propuestas").doc(pedidoId));
			});
		}

		// 6. Hacer commit del batch
		batch.commit();

		// 7. Eliminar documeto del usuario
		const document = db.collection("usuarios").doc(req.params.id);
		await document.delete();

		// 8. Devolver respuesta de exito
		return res.status(200).json({ message: "El usuario fue eliminado con exito." });
	} catch (error) {
		return res.status(500).json({ message: "Error, el usuario no ha sido eliminado" });
	}
});

router.patch("/usuarios/:id", async (req, res) => {
	try {
		const uid = req.params.id;
		const document = db.collection("usuarios").doc(uid);
		await document.update({
			nombre: req.body.nombre,
			apellidoPaterno: req.body.apellidoPaterno,
			apellidoMaterno: req.body.apellidoMaterno,
			email: req.body.email,
			phoneNumber: "+52" + req.body.phoneNumber
		});

		const nambre = req.body.nombre + req.body.apellidoPaterno + req.body.apellidoMaterno;

		aut.updateUser(uid, {
			email: req.body.email,
			phoneNumber: "+52" + req.body.phoneNumber,
			displayName: nambre
		});

		return res.status(200).json({ message: "Cambios realizados con exito" });
	} catch (error) {
		return res.status(500).send({ message: "Error en la solicitud." });
	}
});

module.exports = router;
