export default {
    namespaced: true,

    state: () => ({
        // 
    }),

    getters: {
        name: () => {
            return {
                title: "Parrainage B2C",
                subtitle: "Espace de gestiion"
            }
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
                    title: 'Localite',
                    routeName: 'localite-index',
                    icon: 'mdi-card-account-details-outline',
                    profiles: ['*']
                },
            ]
            return menu.filter((item) => {
                return item.profiles.includes('*') || item.profiles.includes(userProfile)
            })
        }
    }
}
