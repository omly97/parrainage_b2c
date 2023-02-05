import Vue from 'vue';
import Vuex from 'vuex';
import moduleApp from "./modules/app";
import moduleAuth from "./modules/auth";

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        app: moduleApp,
        auth: moduleAuth,
    }
});

export default store;
