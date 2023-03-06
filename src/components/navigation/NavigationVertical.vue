<template>
    <div>
        <v-list>
            <v-list-item>
                <v-list-item-avatar @click="$router.push({ name: 'home-mobile' })">
                    <v-img
                        :src="require('@/assets/img/user.png')"
                        alt="moi"
                        height="40px"
                    />
                </v-list-item-avatar>
                <v-list-item-content></v-list-item-content>
                <v-list-item-action>
                    <v-icon
                        v-text="$vuetify.theme.dark ? 'mdi-white-balance-sunny' : 'mdi-weather-night'"
                        @click="$vuetify.theme.dark = !$vuetify.theme.dark"
                    ></v-icon>
                </v-list-item-action>
            </v-list-item>
            <v-list-item v-if="authUser">
                <v-list-item-content @click="$router.push({ name: 'home-mobile' })">
                    <v-list-item-title class="text-h6">{{ `${authUser.prenom} ${authUser.nom}`}}</v-list-item-title>
                    <v-list-item-subtitle>{{ authUser.email }}</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list nav>
            <v-list-item
                v-for="menu in menuComputed"
                :key="menu.routeName"
                :to="{ name: menu.routeName }"
                link
            >
                <v-list-item-icon>
                    <v-icon v-text="menu.icon"></v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title v-text="menu.title"></v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </div>
</template>

<script>
import useAuth from "@/hooks/auth"
const { whoami } = useAuth()

export default {
    name: 'NavigationVertical',
    computed: {
        authUser() {
            return this.$store.state.auth.user
        },
        appName() {
            return this.$store.getters['app/name']
        },
        menuComputed() {
            return this.authUser
                ? this.$store.getters['app/menu'](this.authUser.profile)
                : []
        }
    },
    created() {
        whoami().then(response => {
            this.$store.commit('auth/SET_USER', response);
        })
    }
}
</script>
