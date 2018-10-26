import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import { routes } from './router/routes';
import { store } from './store/store';
import axios from 'axios';
import * as firebase from 'firebase';

Vue.use(VueRouter);

axios.defaults.baseURL = 'https://episodic-7721b.firebaseio.com';

const router = new VueRouter({
    routes,
    mode: 'history'
});

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App),
    created () {
        firebase.initializeApp({
          apiKey: "AIzaSyAedvKXjpECFZJ4Us8UAYxRFHEuWIpVnv4",
          authDomain: "episodic-7721b.firebaseapp.com",
          databaseURL: "https://episodic-7721b.firebaseio.com",
          projectId: "episodic-7721b",
          storageBucket: "episodic-7721b.appspot.com",
        });
        firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            this.$store.dispatch('autoSignIn', user)
          }
        })
        this.$store.dispatch('loadSeries');
    }
})
