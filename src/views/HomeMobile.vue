<template>
<div>
    <!-- mobile view -->
    <template v-if="$vuetify.breakpoint.mobile">
        <v-list>
            <v-list-item>
                <v-list-item-avatar size="60">
                    <v-img :src="require('@/assets/img/user.png')" alt="moi"></v-img>
                </v-list-item-avatar>
                <v-list-item-content v-if="authUser">
                    <v-list-item-title>{{ `${authUser.prenom} ${authUser.nom}`}}</v-list-item-title>
                    <v-list-item-subtitle>{{ authUser.email }}</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>

            <v-divider class="my-4"></v-divider>

            <v-list-item
                v-for="(menu, i) in menuItems"
                :key="i"
                @click="menu.dialog = true"
            >
                <v-list-item-icon>
                    <v-icon v-text="menu.icon"></v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title v-text="menu.title"></v-list-item-title>
                    <v-list-item-subtitle v-text="menu.subtitle"></v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
        </v-list>

        <!-- Modal Security -->
        <v-dialog
            v-if="menuItems[0].dialog"
            v-model="menuItems[0].dialog"
            transition="dialog-bottom-transition"
            fullscreen
        >
            <v-toolbar dark>
                <v-btn
                    icon
                    dark
                    small
                    @click="menuItems[0].dialog = false"
                >
                    <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title>My Infos</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                    <v-btn
                        dark
                        text
                        small
                        @click="menuItems[0].dialog = false"
                    >
                        Fermer
                    </v-btn>
                </v-toolbar-items>
            </v-toolbar>
            <v-card flat>
                <auth-user-card></auth-user-card>
            </v-card>
        </v-dialog>

        <!-- Modal Password Form -->
        <v-dialog
            v-if="menuItems[1].dialog"
            v-model="menuItems[1].dialog"
            transition="dialog-bottom-transition"
            fullscreen
        >
            <v-toolbar dark>
                <v-btn
                    icon
                    dark
                    small
                    @click="menuItems[1].dialog = false"
                >
                    <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title>Securite</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                    <v-btn
                        dark
                        text
                        small
                        @click="menuItems[1].dialog = false"
                    >
                        Fermer
                    </v-btn>
                </v-toolbar-items>
            </v-toolbar>
            <v-container>
                <auth-user-password
                    @actionSuccess="menuItems[1].dialog = false"
                ></auth-user-password>
            </v-container>
        </v-dialog>
    </template>

    <!-- web view -->
    <template v-else>
        <div>This page is only available for mobile devices</div>
    </template>
</div>
</template>

<script>
import AuthUserPassword from '@/components/AuthUserPassword.vue'
import AuthUserCard from '@/components/AuthUserCard.vue'

export default {
    name: 'HomeMobile',
    components: { AuthUserPassword, AuthUserCard },
    data: () => ({
        menuItems: [
            {
                title: 'My infos',
                subtitle: 'Infos personnelles',
                dialog: false,
                icon: 'mdi-account'
            },
            {
                title: 'Securite',
                subtitle: 'Changer mot de passe',
                dialog: false,
                icon: 'mdi-security'
            },
        ]
    }),
    computed: {
        authUser() {
            return this.$store.state.auth.user
        }
    },
    created() {
        this.$store.commit('app/setCurrentPageTitle', "Mon compte")
    }
}
</script>
