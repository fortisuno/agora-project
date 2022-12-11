const functions = require("firebase-functions");
const admin = require('firebase-admin/app')
const { Router } = require('express');
const fs = require('firebase-admin/firestore');
const uid = require('uuid') 

const db = fs.getFirestore()

const router = Router()

router.post("/usuarios", async (req,res) => {
    try {
        const uuid = uid.v4();
        await db.collection("usuarios")
        .doc("/" + uuid + "/")
        .create({
            nombre: req.body.nombre,
            apellidoPaterno: req.body.apellidoPaterno,
            apellidoMaterno: req.body.apellidoMaterno,
            tipo: req.body.tipo,
            ubicacion: req.body.ubicacion,
            correo: req.body.correo,
            telefono: req.body.telefono,
            contraseña: req.body.contraseña
        })
        return res.status(204).json();
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
});

router.get("/usuarios/:id", (req, res) => {
    (async () => {
        try {
            const doc = db.collection("usuarios").doc(req.params.id)
            const item = await doc.get()
            const response = item.data()
            return res.status(200).json(response)
        } catch (error) {
            return res.status(500).send(error);
        }
    })();
});

router.get("/usuarios", async (req, res) => {
    try {
        const query = db.collection("usuarios");
        const querySnapshot = await query.get();
        const docs = querySnapshot.docs;

        const response = docs.map(doc => ({
            nombre: req.body.nombre,
            apellidoPaterno: req.body.apellidoPaterno,
            apellidoMaterno: req.body.apellidoMaterno,
            correo: req.body.correo,
            telefono: req.body.telefono,
            ubicacion: req.body.ubicacion
    }))
    return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json();
    }
});

router.delete("/usuarios/:id", async (req, res) => {
    try {
        const document = db.collection("usuarios").doc(req.params.id)
        await document.delete()
        return res.status(200).json();
    } catch (error) {
        return res.status(500).json();
    }
});

router.patch('/usuarios/:id', async (req, res) => {
    try {
        const document = db.collection('usuarios').doc(req.params.id)
        await document.update({
            nombre: req.body.nombre,
            apellidoPaterno: req.body.apellidoPaterno,
            apellidoMaterno: req.body.apellidoMaterno,
            correo: req.body.correo,
            telefono: req.body.telefono
        })
        return res.status(200).json()
    } catch (error) {
        return res.status(500).send(error);
    }
})

module.exports = router