<template>
    <v-container>
        <v-row>
            <v-col
                v-for="i in number"
                :key="i"
                cols="12" xl="3" lg="3" md="3" sm="6"
            >
                <v-skeleton-loader type="image" height="100"></v-skeleton-loader>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    name: 'XLoaderGrid',
    props: {
        number: {
            type: Number,
            default: 12
        }
    }
}
</script>
