const functions = require("firebase-functions");
const admin = require('firebase-admin/app')
const express = require('express');
const fs = require('firebase-admin/firestore')

const app = express()

admin.initializeApp({
    credential: admin.applicationDefault()
});

app.use(require('./src/pedidos'))
app.use(require('./src/usuarios'))
app.use(require('./src/propuestas'))

exports.app = functions.https.onRequest(app);
