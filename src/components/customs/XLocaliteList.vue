<template>
    <v-list nav dense>
        <v-list-item
            v-for="item in localites"
            :key="item.id"
            link
            :to="{ name: 'LocaliteShow', params: {localiteId: item.id} }"
        >
            <v-list-item-icon>
                <v-icon>mdi-map-marker-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
                <v-list-item-title>{{ item.nom }}</v-list-item-title>
            </v-list-item-content>
        </v-list-item>
    </v-list>
</template>

<script>
export default {
    name: 'XLocaliteList',
    props: {
        localites: {
            type: Array,
            required: true
        }
    }
}
</script>
