# Part 3: Server Setup

We need to setup a server for the back end of this project. In the top level of
this project, install express:

```
npm install express
```

We need to set up firebase as well
```
firebase init
```
Select options for hosting, firestore, and functions.   Dont forget to change the "public" folder to be "dist"


Add the following content to `functions/index.js`:

```
const functions = require('firebase-functions');
const firebase = require('firebase-admin');
const express = require('express');

const firebaseApp = firebase.initializeApp(
    functions.config().firebase
);
const app = express();

var db = firebase.firestore();

exports.app = functions.https.onRequest(app);
```

This sets up Express and a connection to the Firebase Firestore. See previous
activities for explanations of these.

You also need to create a file in the top level of this project called `vue.config.js`, containing the following:

```
module.exports = {
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://localhost:5000',
      },
    }
  }
}
```

This lets the webpack development server that is started by `npm run serve` proxy the requests for the API and send them to your node server.


Go to [Part 4](/tutorials/part4.md).
