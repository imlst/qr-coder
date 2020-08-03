import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        favorites: [],
    },
    mutations: {
        setFavoriteList(state, payload) {
            state.favorites = payload;
        },

        addFavorite(state, payload) {
            state.favorites.push(payload);
        },

        removeFavorite(state, payload) {
            state.favorites.splice(state.favorites.indexOf(payload), 1);
        },
    },
    getters: {
        getFavorites(state) {
            return state.favorites;
        },
    },
    actions: {
    },
    modules: {
    }
})
