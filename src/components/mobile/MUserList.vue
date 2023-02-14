<template>
    <v-list>
        <v-list-item
            v-for="item in users"
            :key="item.id"
        >
            <v-list-item-avatar color="indigo">
                <v-icon dark>mdi-account-outline</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
                <v-list-item-title>{{ `${item.nom} ${item.prenom}` }}</v-list-item-title>
                <v-list-item-subtitle>{{ item.email }}</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action-text>
                <v-icon size="15">mdi-arrow-right</v-icon>
            </v-list-item-action-text>
        </v-list-item>
    </v-list>
</template>

<script>
export default {
    name: 'MUserList',
    props: {
        users: {
            type: Array,
            required: true
        }
    }
}
</script>
