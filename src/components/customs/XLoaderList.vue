<template>
    <v-list nav dense>
        <v-list-item v-for="i in number" :key="i">
            <v-list-item-content>
                <v-skeleton-loader type="image" :height="40"></v-skeleton-loader>
            </v-list-item-content>
        </v-list-item>
    </v-list>
</template>

<script>
export default {
    name: 'XLoaderList',
    props: {
        number: {
            type: Number,
            default: 8
        }
    }
}
</script>
