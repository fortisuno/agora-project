const admin = require("firebase-admin");

admin.initializeApp({
	credential: admin.credential.applicationDefault()
});

exports.firestore = admin.firestore();
exports.auth = admin.auth();
