const functions = require("firebase-functions");
const admin = require('firebase-admin/app')
const { Router } = require('express');
const fs = require('firebase-admin/firestore')

const router = Router()

const db = fs.getFirestore()

router.post('/api/productos', async (req, res) => {
    try{
        await db.collection('productos')
        .doc('/' + req.body.id + '/')
        .create({ name: req.body.name })
        return res.status(200).json();
    }
    catch(error){
        return res.status(500).send(error);
    }
})

router.get('/api/productos/:id', async (req, res) => {
    try {
        const doc = db.collection('productos').doc(req.params.id)
        const item = await doc.get()
        const respose = item.data()
        return res.status(200).json(respose)
    } catch (error) {
        return res.status(500).send(error);
    }
})

router.get('/api/productos', async (req,res) => {
    try {
        const query =db.collection('productos');
        const querySnapshot = await query.get();
        const docs = querySnapshot.docs;
    
        const response = docs.map(doc => ({
            id: doc.id,
            name: doc.data().name
        }))
    
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).send(error);         
    }

})

router.delete('/api/productos/:id',async (req, res) => {
    try {
        const document = db.collection('productos').doc(req.params.id)
        await document.delete()
        return res.status(200).json()
    } catch (error) {
        return res.status(500).send(error);            
    }
})

router.put('/api/productos/:id', async (req, res) => {
    try {
        const document = db.collection('productos').doc(req.params.id)
        await document.update({
            name: req.body.name
        })
        return res.status(200).json()
    } catch (error) {
        return res.status(500).send(error);  
    }
})

module.exports = router