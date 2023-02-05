<template>
    <div>
        <v-list>
            <v-list-item>
                <v-list-item-avatar>
                    <v-img
                        :src="require('@/assets/img/user.png')"
                        alt="moi"
                        height="40px"
                    />
                </v-list-item-avatar>
            </v-list-item>
            <v-list-item>
                <v-list-item-content>
                    <v-list-item-title class="text-h6">{{ appName.title }}</v-list-item-title>
                    <v-list-item-subtitle>{{ appName.subtitle }}</v-list-item-subtitle>
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
            return this.$store.getters['app/menu'](this.authUser.profile)
        }
    }
}
</script>
