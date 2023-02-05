<template>
    <v-app>
        <!-- <v-navigation-drawer
            v-model="sidebar"
            app
            dark
        >
            <navigation-vertical></navigation-vertical>
        </v-navigation-drawer> -->

        <v-app-bar
            app
            dark
            flat
            class="app-bar"
        >
            <span class="hidden-lg-and-up">
                <v-app-bar-nav-icon
                    @click="sidebar = !sidebar"
                ></v-app-bar-nav-icon>
            </span>
            <div>
                <div class="text-h6">{{ appName.title }}</div>
                <div>{{ appName.subtitle }}</div>
            </div>
            <v-spacer></v-spacer>
            <navigation-horizontal></navigation-horizontal>
            <v-spacer></v-spacer>
            <auth-user-dropdown></auth-user-dropdown>
        </v-app-bar>

        <v-main>
            <v-container>
                <router-view></router-view>
            </v-container>
        </v-main>

        <v-footer app dark padless>
            <v-card flat tile color="transparent" class="flex">
                <v-card-text class="py-2 white--text text-center">
                    {{ new Date().getFullYear() }} — <strong>omly97</strong>
                </v-card-text>
            </v-card>
        </v-footer>
    </v-app>
</template>

<script>
import AuthUserDropdown from "../AuthUserDropdown.vue"
import NavigationHorizontal from "../navigation/NavigationHorizontal.vue"
// import NavigationVertical from '../navigation/NavigationVertical.vue'

export default {
    name: 'LayoutWeb',
    components: {
        AuthUserDropdown,
        NavigationHorizontal,
        // NavigationVertical
    },
    data: () => ({
        sidebar: true
    }),
    computed: {
        appName() {
            return this.$store.getters['app/name']
        }
    }
}
</script>

<style scoped>
.app-bar {
    padding-left: 15%;
    padding-right: 15%;
}
</style>
