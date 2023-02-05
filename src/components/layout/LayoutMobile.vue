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
            <span class="hidden-lg-and-up">
                <v-app-bar-nav-icon
                    @click="sidebar = !sidebar"
                ></v-app-bar-nav-icon>
            </span>
        </v-app-bar>

        <v-main>
            <router-view></router-view>
        </v-main>

        <navigation-bottom></navigation-bottom>        
    </v-app>
</template>

<script>
import NavigationBottom from '../navigation/NavigationBottom.vue'
import NavigationVertical from '../navigation/NavigationVertical.vue'

export default {
    name: 'MobileLayout',
    components: { NavigationBottom, NavigationVertical },
    data: () => ({
        sidebar: false
    })
}
</script>
