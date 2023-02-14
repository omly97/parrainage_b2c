<template>
    <span class="d-flex">
        <v-btn
            v-for="menu in menuComputed"
            :key="menu.routeName"
            link
            :to="{ name: menu.routeName }"
            text
            large
        >
            <v-icon v-text="menu.icon" left></v-icon>
            <span class="text-capitalize">{{ menu.title }}</span>
        </v-btn>
    </span>
</template>

<script>
export default {
    name: 'NavigationHorizontal',
    computed: {
        authUser() {
            return this.$store.state.auth.user
        },
        menuComputed() {
            return this.authUser
                ? this.$store.getters['app/menu'](this.authUser.profile)
                : []
        }
    }
}
</script>
