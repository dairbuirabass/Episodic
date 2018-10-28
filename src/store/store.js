import Vue from 'vue';
import Vuex from 'vuex';
import * as firebase from 'firebase';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        loadedSeries: [],
        activeSerial: [],
        loadedEpisodes: [],
        activeEpisodes: [],
        user: null,
        loading: false,
        error: null
    },
    mutations: {
        setLoadedSeries (state, payload) {
            state.loadedSeries = payload
        },
        setLoadedEpisodes (state, payload) {
            state.loadedEpisodes = payload
        },
        addSerial (state, payload) {
            state.loadedSeries.push(payload)
        },
        addEpisode (state, payload) {
            state.loadedEpisodes.push(payload)
        },
        setActiveSerial (state, payload) {
            state.activeSerial = state.loadedSeries.filter(serial => {
              return serial.id === payload
            })
        },
        setActiveEpisodes (state, payload) {
            state.activeEpisodes = state.loadedEpisodes.filter(episode => {
              return episode.serialId === payload
            })
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
                              yearLaunched: obj[key].yearLaunched,
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
              .then((snapshot) => {
                  return snapshot.ref.getDownloadURL()
              })
              .then((url) => {
                  commit('addSerial', {
                      ...serial,
                      id: key,
                      imageUrl: url
                  })
              })
              .catch((error) => {
                  console.log(error)
              })
        },
        loadEpisodes ({commit}) {
          commit('setLoading', true)
          firebase.database().ref('episodes').once('value')
            .then((data) => {
                let episodes = []
                const obj = data.val()
                for (let key in obj) {
                    episodes.push({
                        id: key,
                        serialId: obj[key].serialId,
                        title: obj[key].title,
                        synopsis: obj[key].synopsis,
                        tags: obj[key].tags,
                        dateOfRelease: obj[key].dateOfRelease
                  })
                }
                commit('setLoadedEpisodes', episodes)
                commit('setLoading', false)
              })
              .catch(
                  (error) => {
                      console.log(error)
                      commit('setLoading', false)
                  }
              )
        },
        addEpisode({commit, getters}, payload) {
            const episode = {
                serialId: payload.serialId,
                title: payload.title,
                synopsis: payload.synopsis,
                tags: payload.tags,
                dateOfRelease: payload.dateOfRelease,
            }
            firebase.database().ref('episodes').push(episode)
              .then(() => {
                  commit('addEpisode', {
                      ...episode,
                  })
              })
              .catch((error) => {
                  console.log(error)
              })
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
                let a = new Date(serialA.yearLaunched).getTime()
                let b = new Date(serialB.yearLaunched).getTime()

                return a > b
            })
        },
        loadedEpisodes (state) {
            return state.loadedEpisodes
        },
        loadSerial (state) {
            return state.activeSerial
        },
        loadEpisodes (state) {
            return state.activeEpisodes
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
