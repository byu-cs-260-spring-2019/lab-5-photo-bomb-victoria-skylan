const functions = require('firebase-functions');
const firebase = require('firebase-admin');
const express = require('express');

const firebaseApp = firebase.initializeApp(
    functions.config().firebase
);

const app = express();

var db = firebase.firestore();

var userRef = db.collection('users');
        
app.get('/api/users', async (req, res) => {
    try{
        let querySnapshot = await userRef.get();
        res.send(querySnapshot.docs.map(doc => doc.data()));
    }catch(err){
        res.sendStatus(500);
    }
});

app.post('/api/users', async (req, res) => {
    try {
        let user = {
            id: Math.random(),
            email: req.body.email,
            color: req.body.color,
            theName: req.body.theName,
          };
          userRef.doc(user.id.toString()).set(user);
        res.send(user);
      } catch (error) {
        console.log(error);
        res.sendStatus(600);
      }
});

exports.app = functions.https.onRequest(app);