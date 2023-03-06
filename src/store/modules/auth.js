const AUTH_TOKEN_NAME = 'pb2b-user-token';

export default {
    namespaced: true,

    state: () => ({
        user: null,
        localites: null,
        token: localStorage.getItem(AUTH_TOKEN_NAME) || '',
    }),

    mutations: {
        SET_USER (state, user) {
            state.user = user;
        },
        SET_LOCALITES (state, localites) {
            state.localites = localites;
        },
        SET_TOKEN(state, token) {
            state.token = token
            localStorage.setItem(AUTH_TOKEN_NAME, token)
        }
    },

    getters: {
        authToken: (state) => {
            return state.token;
        },
        authUser: (state) => {
            return state.user;
        },
        authLocalites: (state) => {
            return state.localites;
        },
        isAuthenticated(state) {
            return !!state.token
        },
        isAdmin: (state) => {
            return state.user.isAdmin;
        }
    },

    actions: {
        login(context , token, user, localites) {
            context.commit('SET_USER', user);
            context.commit('SET_LOCALITES', localites);
            context.commit('SET_TOKEN', token);
            localStorage.setItem(AUTH_TOKEN_NAME, token);
        },
        logout({ commit }) {
            commit("SET_USER", null);
            commit('SET_LOCALITES', null);
            commit("SET_TOKEN", null);
            localStorage.removeItem(AUTH_TOKEN_NAME);
        }
    }
}
