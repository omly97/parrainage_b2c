<template>
    <v-app>
        <v-navigation-drawer
            v-model="sidebar"
            app
            dark
        >
            <navigation-vertical></navigation-vertical>
        </v-navigation-drawer>

        <v-app-bar
            app
            dark
            flat
        >
            <v-app-bar-nav-icon
                class="hidden-lg-and-up"
                @click="sidebar = !sidebar"
            ></v-app-bar-nav-icon>
            <v-toolbar-title v-if="pageTitle">{{ pageTitle }}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon>
                <v-icon>mdi-magnify</v-icon>
            </v-btn>
            <m-parrain-menu></m-parrain-menu>
        </v-app-bar>

        <v-main>
            <router-view></router-view>
        </v-main>

        <navigation-bottom></navigation-bottom>        
    </v-app>
</template>

<script>
import MParrainMenu from '../mobile/MParrainMenu.vue'
import NavigationBottom from '../navigation/NavigationBottom.vue'
import NavigationVertical from '../navigation/NavigationVertical.vue'

export default {
    name: 'MobileLayout',
    components: { NavigationBottom, NavigationVertical, MParrainMenu },
    data: () => ({
        sidebar: false
    }),
    computed: {
        pageTitle() {
            return this.$store.getters['app/pageTitle']
        },
    }
}
</script>
