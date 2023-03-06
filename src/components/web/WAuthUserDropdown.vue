<template>
    <div class="text-center">
        <v-menu
            v-if="user"
            v-model="menu"
            close-on-content-click
            :nudge-width="200"
            offset-y
            bottom
            left
            transition="slide-x-transition"
        >
            <template v-slot:activator="{ on, attrs }">
                <v-list-item
                    v-bind="attrs"
                    v-on="on"
                >
                    <v-list-item-avatar color="indigo">
                        {{ user.prenom == null ? 'O' : user.prenom[0] }}
                    </v-list-item-avatar>
                    <v-list-item-title>{{ `${user.prenom} ${user.nom}` }}</v-list-item-title>
                </v-list-item>
            </template>

            <v-card>
                <v-list>
                    <v-list-item>
                        <v-list-item-avatar>
                            <img :src="require('@/assets/img/user.png')" alt="moi">
                        </v-list-item-avatar>

                        <v-list-item-content>
                            <v-list-item-title>{{ `${user.prenom} ${user.nom}` }}</v-list-item-title>
                            <v-list-item-subtitle>{{ user.email }}</v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>

                <v-divider></v-divider>

                <v-list>
                    <v-list-item link :to="{ name: 'home-web' }">
                        <v-list-item-icon>
                            <v-icon>mdi-home</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title>Mon compte</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>

                    <v-list-item @click="$vuetify.theme.dark = !$vuetify.theme.dark">
                        <v-list-item-icon>
                            <v-icon>mdi-weather-night</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title>Mode sombre</v-list-item-title>
                        </v-list-item-content>
                        <v-list-item-action>
                            <v-switch v-model="$vuetify.theme.dark" inset></v-switch>
                        </v-list-item-action>
                    </v-list-item>

                    <v-list-item link @click="handleLogout">
                        <v-list-item-icon>
                            <v-icon>mdi-logout</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title>Déconnexion</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-card>
        </v-menu>

        <!-- Deconnexion Loader -->
        <v-dialog
            v-model="dialog"
            hide-overlay
            persistent
            width="350"
        >
            <v-card class="pa-3">
                <div class="text-center">
                    <div class="font-weight-medium">Déconnexion en cours. Veuillez patienter</div>
                    <v-progress-circular
                        :size="50"
                        color="primary"
                        indeterminate
                        class="mt-5"
                    ></v-progress-circular>
                </div>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import useAuth from "@/hooks/auth";
const { whoami, logout } = useAuth()

export default {
    name: 'AuthUserDropdown',
    data() {
        return {
            menu: false,
            dialog: false
        }
    },
    computed: {
        user() {
            return this.$store.state.auth.user
        }
    },
    created() {
        whoami().then(response => {
            this.$store.commit('auth/SET_USER', response.user);
            this.$store.commit('auth/SET_LOCALITES', response.localites);
        })
    },
    methods: {
        handleLogout() {
            this.dialog = true;
            logout().then(() => {
                console.log("logout successfully")
            }).catch(error => {
                this.dialog = false;
                this.$swal({
                    icon: 'error',
                    title: 'Oops...',
                    text: error.message
                })
            })
        }
    },
}
</script>
