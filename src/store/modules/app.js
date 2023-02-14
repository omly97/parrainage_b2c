export default {
    namespaced: true,

    state: () => ({
        currentPageTitle: null
    }),

    mutations: {
        setCurrentPageTitle (state, title) {
            state.currentPageTitle = title;
        }
    },

    getters: {
        name: () => {
            return {
                title: "Parrainage B2C",
                subtitle: "Espace de gestiion"
            }
        },
        pageTitle: (state) => {
            return state.currentPageTitle
        },
        menu: () => (userProfile) => {
            // const PROFILE_COLLECTEUR = "collecteur";
            // const PROFILE_SUPERVISEUR = "superviseur";
            const menu = [
                {
                    title: 'Dashboard',
                    routeName: 'dashboard',
                    icon: 'mdi-view-dashboard',
                    profiles: ['*']
                },
                {
                    title: 'Parrain',
                    routeName: 'parrain-index',
                    icon: 'mdi-card-account-details-outline',
                    profiles: ['*']
                },
                {
                    title: 'Localite',
                    routeName: 'localite-index',
                    icon: 'mdi-map-marker-outline',
                    profiles: ['*']
                },
            ]
            return menu.filter((item) => {
                return item.profiles.includes('*') || item.profiles.includes(userProfile)
            })
        }
    }
}
