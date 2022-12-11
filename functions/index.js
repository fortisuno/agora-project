const functions = require("firebase-functions");
const admin = require('firebase-admin/app')
const express = require('express');
const fs = require('firebase-admin/firestore')

const app = express()

admin.initializeApp({
    credential: admin.applicationDefault()
});

app.use(require('./js/prueba'))
app.use(require('./js/reg'))
app.use(require('./js/usuarios'))
app.use(require('./js/propuestas'))


exports.app = functions.https.onRequest(app);