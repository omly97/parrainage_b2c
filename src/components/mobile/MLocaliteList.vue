<template>
    <v-list>
        <v-list-item
            v-for="item in localites"
            :key="item.id"
            link
            :to="{ name: 'localite-show', params: {localiteId: item.id} }"
        >
            <v-list-item-avatar color="indigo">
                <v-icon dark>mdi-map-marker-outline</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
                <v-list-item-title>{{ item.nom }}</v-list-item-title>
                <v-list-item-subtitle>{{ item.region }}</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action-text>
                <v-icon size="15">mdi-arrow-right</v-icon>
            </v-list-item-action-text>
        </v-list-item>
    </v-list>
</template>

<script>
export default {
    name: 'MLocaliteList',
    props: {
        localites: {
            type: Array,
            required: true
        }
    }
}
</script>
