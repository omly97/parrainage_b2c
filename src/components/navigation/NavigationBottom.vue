<template>
    <v-bottom-navigation
        :value="bottom"
        app
        grow
        dark
    >
        <v-btn
            v-for="(item, i) in menuComputed"
            :key="i"
            :to="{ name: item.routeName }"
        >
            <span>{{ item.title }}</span>
            <v-icon>{{ item.icon }}</v-icon>
        </v-btn>
    </v-bottom-navigation>
</template>

<script>
export default {
    name: 'NavigationBottom',
    data: () => ({
        bottom: 0,
    }),
    computed: {
        userComputed() {
            return this.$store.state.auth.user
        },
        appName() {
            return this.$store.getters['app/name']
        },
        menuComputed() {
            return this.$store.getters['app/menu']("*")
            // return this.$store.getters['app/menu'](this.userComputed.profile)
        }
    }
}
</script>
