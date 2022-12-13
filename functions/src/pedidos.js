const functions = require("firebase-functions");
const admin = require('firebase-admin/app')
const { Router } = require('express');
const fs = require('firebase-admin/firestore');

const router = Router()

const db = fs.getFirestore()

router.post('/pedidos', async (req, res) => {
    try{
        const data = fs.Timestamp.now().toMillis()/1000
        await db.collection('pedidos')
        .doc('/'+data.toFixed(0)+'/')
        .create({ 
            titulo: req.body.titulo,
            usuarioId: req.body.usuarioId,
            usuarioNombre: req.body.usuarioNombre,
            presupuesto: req.body.presupuesto,
            cantidad: req.body.cantidad,
            unidad: req.body.unidad,
            categoria: req.body.categoria,
            descripcion: req.body.descripcion
        })

        const snapshot = await db.collection('usuarios').get();
            snapshot.forEach((doc) => {
            console.log(doc.id, '=>', doc.data());
        })

        return res.status(200).json({message: "Pedido creado con exito"});
    }
    catch(error){
        return res.status(500).send(error);
    }
})

router.get('/pedidos/:id', async (req, res) => {
    try {
        const doc = db.collection('pedidos').doc(req.params.id)
        const item = await doc.get()
        const respose = item.data()
        return res.status(200).json(respose)
    } catch (error) {
        return res.status(500).send(error);
    }
})

router.get('/pedidos', async (req,res) => {
    try {
        const query =db.collection('pedidos');
        const querySnapshot = await query.get();
        const docs = querySnapshot.docs;
    
        const response = docs.map(doc => ({
            id: doc.id,
            name: doc.data().titulo,
            categoria: doc.data().categoria
        }))
    
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).send(error);         
    }

})

router.delete('/pedidos/:id',async (req, res) => {
    try {
        const document = db.collection('pedidos').doc(req.params.id)
        await document.delete()
        return res.status(200).json()
    } catch (error) {
        return res.status(500).send(error);            
    }
})

router.patch('/pedidos/:id', async (req, res) => {
    try {
        const document = db.collection('pedidos').doc(req.params.id)
        await document.update({
            titulo: req.body.name,
            presupuesto: req.body.presupuesto,
            cantidad: req.body.cantidad,
            unidad: req.body.unidad,
            categoria: req.body.categoria,
            desc: req.body.desc
        })
        return res.status(200).json({message: "Cambios realizados con exito"})
    } catch (error) {
        return res.status(500).send(error);  
    }
})

module.exports = router