import Vue from 'vue';
import VueRouter from 'vue-router';
import store from "@/store/index";
import useAuth from "@/hooks/auth";
const { whoami } = useAuth()

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'hash',
    routes: [
        /**
         * Auth views
         */
        {
            path: '/',
            component: () => import('../AppGuest.vue'),
            children: [
                {
                    path: '/login',
                    alias: '',
                    name: 'auth-login',
                    component: () => import('../views/auth/LoginView.vue'),
                }
            ]
        },

        /**
         * App views
         */
        {
            path: '/app',
            component: () => import('../AppAuth.vue'),
            children: [
                {
                    path: '/dashboard',
                    alias: '',
                    name: 'dashboard',
                    meta: { requiresAuth: true },
                    component: () => import('../views/Dashboard.vue'),
                },
                {
                    path: '/mobilehome',
                    name: 'home-mobile',
                    meta: { requiresAuth: true },
                    component: () => import('../views/HomeMobile.vue'),
                },
                {
                    path: '/webhome',
                    name: 'home-web',
                    meta: { requiresAuth: true },
                    component: () => import('../views/HomeWeb.vue'),
                },
                {
                    path: '/localites',
                    name: 'localite-index',
                    meta: { requiresAuth: true },
                    component: () => import('../views/LocaliteIndex.vue'),
                },
                {
                    path: '/localites/:localiteId',
                    name: 'localite-show',
                    component: () => import('../views/LocaliteShow.vue')
                },
                {
                    path: '/parrains',
                    name: 'parrain-index',
                    component: () => import('../views/ParrainIndex.vue')
                },
                {
                    path: '/create-parrainage',
                    name: 'parrain-create',
                    component: () => import('../views/ParrainCreate.vue')
                },
            ]
        },

        /**
         * 404 Not Found
         */
        // {
        //     path: '*',
        //     name: 'NotFound',
        //     component: () => import('../views/About.vue')
        // },
    ]
});

router.beforeEach((to, from, next) => {
    const authUser = store.getters["auth/authUser"]
    const reqAuth = to.matched.some((record) => record.meta.requiresAuth)
    const loginQuery = { path: "/login", query: { redirect: to.fullPath } }
  
    if (reqAuth && !authUser) {
        const authToken = store.getters["auth/authToken"]
        if (authToken) {
            whoami().then(response => {
                store.commit('auth/SET_USER', response)
                next()
            })
            // .catch(error => {
            //     this.$swal({
            //         icon: 'error',
            //         title: 'Oops...',
            //         text: error.message
            //     });
            // })
        } else {
            next(loginQuery)
        }
    } else {
        next()
    }
});

export default router;
