# Part 3: Server Setup

We need to setup a server for the back end of this project. In the top level of
this project, install some packages we will need:

```
npm install express firebase
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


We are going to be initializing our firebase app slightly differently with this new structure.  In `src/main.js`, add the following. 
```
import store from "./store";
import firebase from 'firebase';

Vue.config.productionTip = false;

var firebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
```

You will find the values you need to add in your Firebase console under the "Project Overview", then "Project Settings".  Go down to the section entitled "Your apps", click "Add App", click on the option for web, give you app a name and you should see the config values you can fill in in your `main.js` file.

Go to [Part 4](/tutorials/part4.md).
