import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from 'firebase';
Vue.config.productionTip = false;


  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDdDCrn1MRZc7ba5Afoei1oNtDUoCLtWKk",
    authDomain: "cs260-ca296.firebaseapp.com",
    databaseURL: "https://cs260-ca296.firebaseio.com",
    projectId: "cs260-ca296",
    storageBucket: "cs260-ca296.appspot.com",
    messagingSenderId: "549981133977",
    appId: "1:549981133977:web:cee734fd571b6333"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export const db = firebase.firestore()
  
new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')

firebase.auth().onAuthStateChanged(user => {
  if(user){
    store.commit('setUser',user);
  }
  else {
    store.commit('setUser',null);
  }
});