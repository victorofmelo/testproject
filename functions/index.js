const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
const hash = require('object-hash');
exports.helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});

exports.criarHash = functions.https.onRequest((request, response) => {

    const novoHash = hash({cpf: request.body.cpf});

    admin.firestore().collection("aulas").doc(novoHash).set({
        latitude: request.body.latitude,
        longitude: request.body.longitude,
        hash: novoHash,
        cpf: request.body.cpf,
        aberto: true,
        criacao:admin.firestore.FieldValue.serverTimestamp()
  
    }).then(writeResult => {
            response.json({
                status : "finalizei"
            });
    });
})
