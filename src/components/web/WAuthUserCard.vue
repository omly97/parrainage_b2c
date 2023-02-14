<template>
    <v-card class="pa-5">
        <v-list-item>
            <v-list-item-avatar>
                <v-img
                    :src="require('@/assets/img/user.png')"
                    max-width="150"
                ></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
                <v-list-item-title class="font-weight-bold">{{ `${user.prenom} ${user.nom}` }}</v-list-item-title>
                <v-list-item-subtitle class="font-weight-medium text--secondary mt-1">{{ user.email }}</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
                <v-btn
                    dark
                    small
                    color="teal"
                    class="mx-auto mt-3"
                    @click="$emit('logout')"
                >
                    <v-icon left>mdi-logout</v-icon>
                    Deconnexion
                </v-btn>
            </v-list-item-action>
        </v-list-item>

        <v-divider></v-divider>

        <v-list flat>
            <v-subheader>Informations</v-subheader>
            <v-list-item v-for="(item, i) in infos" :key="i">
                <v-list-item-icon>
                    <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                    <!-- <v-list-item-subtitle v-text="item.title"></v-list-item-subtitle> -->
                    <v-list-item-title v-text="item.value"></v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </v-card>
</template>

<script>
export default {
    name: 'WAuthUserCard',
    props: {
        infos: {
            type: Array,
            required: true
        }
    },
    computed: {
        user() {
            return this.$store.state.auth.user
        }
    }
}
</script>
