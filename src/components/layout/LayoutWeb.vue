<template>
    <v-app>
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
            <w-auth-user-dropdown></w-auth-user-dropdown>
        </v-app-bar>

        <v-main>
            <router-view></router-view>
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
import WAuthUserDropdown from "../web/WAuthUserDropdown.vue"
import NavigationHorizontal from "../navigation/NavigationHorizontal.vue"

export default {
    name: 'LayoutWeb',
    components: {
        WAuthUserDropdown,
        NavigationHorizontal,
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
