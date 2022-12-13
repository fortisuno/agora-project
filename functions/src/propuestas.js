const functions = require("firebase-functions");
const admin = require('firebase-admin/app')
const { Router } = require('express');
const fs = require('firebase-admin/firestore');

const db = fs.getFirestore()

const router = Router()

router.post("/propuestas", async (req,res) => {
    try {
        const data = fs.Timestamp.now().toMillis()/1000
        await db.collection('propuestas')
        .doc('/'+'P-'+data.toFixed(0)+'/')
        .create({
            usuarioId: req.body.usuarioId,
            usuarioNombre: req.body.usuarioNombre,
            monto: req.body.monto,
            cantidad: req.body.cantidad,
            unidad: req.body.unidad
        })
        return res.status(200).json({message: "Propuesta creada con exito"});
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
});
 
router.get("/propuestas/:id", async (req, res) => {
    try {
        const doc = db.collection("propuestas").doc(req.params.id)
        const item = await doc.get()
        const response = item.data()
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).send(error);
    }
});

router.get("/propuestas", async (req, res) => {
    try {
        const query = db.collection("propuestas");
        const querySnapshot = await query.get();
        const docs = querySnapshot.docs;

        const response = docs.map(doc => ({
            usuarioNombre: req.body.usuarioNombre,
            monto: req.body.monto,
            cantidad: req.body.cantidad,
            unidad: req.body.unidad
    }))
    return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json();
    }
});

router.delete("/propuestas/:id", async (req, res) => {
    try {
        const document = db.collection("usuarios").doc(req.params.id)
        await document.delete()
        return res.status(200).json();
    } catch (error) {
        return res.status(500).json();
    }
});

router.patch('/propuesta/:id', async (req, res) => {
    try {
        const document = db.collection('propuesta').doc(req.params.id)
        await document.update({
            monto: req.body.monto,
            cantidad: req.body.cantidad,
            unidad: req.body.unidad
        })
        return res.status(200).json({message: "Cambios realizados con exito"})
    } catch (error) {
        return res.status(500).send(error);
    }
})

module.exports = router