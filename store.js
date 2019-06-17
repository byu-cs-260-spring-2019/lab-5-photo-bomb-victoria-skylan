import Vue from 'vue'
import Vuex from "vuex";
import firebase from 'firebase';
import axios from 'axios';
import { db } from '@/main'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
  },
  actions: {
    async register(context, data) {
      try {
        let response = await firebase.auth().createUserWithEmailAndPassword(data.email, data.password);
        context.commit('setUser', response.data);
        return "";
      } catch (error) {
        return error.message;
      }
    }, 
    async addUser(context, data) {
      try {
        let response = await axios.post("/api/events", { 
          email: data.email, 
          color: data.color, 
          name: data.theName
        });
        //context.commit('setUser', response.data);
        return "";
      } catch (error) {
        return error.message;
      }
    },
    async login(context, data) {
      try {
        let response = await firebase.auth().signInWithEmailAndPassword(data.email, data.password);
        context.commit('setUser', response.user);
        return "";
      } catch (error) {
        return error.message;
      }
    }, 
    async logout(context) {
      try {
        await firebase.auth().signOut();
        context.commit('setUser', null);
        return "";
      } catch (error) {
        return error.message;
      }
    },
    async getUser(context) {
      try {
        let response = await  firebase.auth().currentUser;
        context.commit('setUser', response.user);
        return "";
      } catch (error) {
        return "";
      }
    }
  }
});
