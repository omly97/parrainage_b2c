const AUTH_TOKEN_NAME = 'pb2b-user-token';

export default {
    namespaced: true,

    state: () => ({
        user: null,
        token: localStorage.getItem(AUTH_TOKEN_NAME) || '',
    }),

    mutations: {
        setUser (state, user) {
            state.user = user;
        },
        setToken(state, token) {
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
        isAuthenticated(state) {
            return !!state.token
        },
        isAdmin: (state) => {
            return state.user.isAdmin;
        }
    },

    actions: {
        login(context , token, user) {
            context.commit('setUser', user);
            context.commit('setToken', token);
            localStorage.setItem(AUTH_TOKEN_NAME, token);
        },
        logout({ commit }) {
            commit("setUser", null);
            commit("setToken", null);
            localStorage.removeItem(AUTH_TOKEN_NAME);
        }
    }
}
