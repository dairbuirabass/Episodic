import Vue from 'vue';
import Vuex from 'vuex';
import * as firebase from 'firebase';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        loadedSeries: [],
        user: null,
        loading: false,
        error: null
    },
    mutations: {
        setLoadedSeries (state, payload) {
             state.loadedSeries = payload
        },
        addSerial (state, payload) {
            state.loadedSeries.push(payload)
        },
        setUser (state, payload) {
             state.user = payload
        },
        setLoading (state, payload) {
             state.loading = payload
        },
        setError (state, payload) {
            state.error = payload
        },
        clearError (state) {
            state.error = null
        }
    },
    actions: {
        loadSeries ({commit}) {
            commit('setLoading', true)
            firebase.database().ref('series').once('value')
              .then((data) => {
                  let series = []
                  const obj = data.val()
                  for (let key in obj) {
                      let imgUrl
                      firebase.storage().ref('series/' + key).getDownloadURL()
                        .then(url => {
                          imgUrl = url

                          series.push({
                              id: key,
                              title: obj[key].title,
                              synopsis: obj[key].synopsis,
                              genre: obj[key].genre,
                              imageUrl: imgUrl,
                              yearStarted: obj[key].yearStarted,
                              yearFinished: obj[key].yearFinished
                          })
                        })
                  }
                  commit('setLoadedSeries', series)
                  commit('setLoading', false)
                })
                .catch(
                    (error) => {
                        console.log(error)
                        commit('setLoading', false)
                    }
                )
        },
        addSerial ({commit, getters}, payload) {
            let yearFinished
            if (payload.yearFinished === '') {
                yearFinished = null
            } else {
                yearFinished = payload.yearFinished
            }
            const serial = {
                title: payload.title,
                synopsis: payload.synopsis,
                genre: payload.genre,
                yearLaunched: payload.yearLaunched,
                yearFinished: yearFinished
            }
            let key
            firebase.database().ref('series').push(serial)
              .then((data) => {
                  key = data.key
                  return key
              })
              .then(key => {
                  return firebase.storage().ref('series/' + key).put(payload.image)
              })
              .then(() => {
                  commit('addSerial', {
                      ...serial,
                      id: key
                  })
              })
              .catch((error) => {
                  console.log(error)
              })
            // Reach out to firebase and store it
        },
        signUserUp ({commit}, payload) {
            commit('setLoading', true)
            commit('clearError')
            firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
              .then(
                user => {
                    commit('setLoading', false)
                    const newUser = {
                        id: user.uid,
                        registeredSeries: []
                    }
                    commit('setUser', newUser)
                }
              )
              .catch(
                error => {
                    commit('setLoading', false)
                    commit('setError', error)
                    console.log(error)
                }
              )
        },
        signUserIn ({commit}, payload) {
            commit('setLoading', true)
            commit('clearError')
            firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
              .then(
                user => {
                    commit('setLoading', false)
                    const newUser = {
                        id: user.uid,
                        registeredSeries: []
                    }
                    commit('setUser', newUser)
                }
              )
              .catch(
                error => {
                    commit('setLoading', false)
                    commit('setError', error)
                    console.log(error)
                }
              )
        },
        autoSignIn ({commit}, payload) {
            commit('setUser', {id: payload.uid, registeredSeries: []})
        },
        logout ({commit}) {
            firebase.auth().signOut()
            commit('setUser', null)
        },
        clearError ({commit}) {
            commit('clearError')
        },
        setError ({commit}, payload) {
            commit('setError', payload)
        }
    },
    getters: {
        loadedSeries (state) {
            return state.loadedSeries.sort((serialA, serialB) => {
                return serialA.date > serialB.date
            })
        },
        user (state) {
            return state.user
        },
        loading (state) {
            return state.loading
        },
        error (state) {
            return state.error
        }
    }
})
