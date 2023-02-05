<template>
    <v-row justify="center" align="center" class="d-flex flex-column">
        <v-img :src="require('@/assets/img/error.png')" max-width="450"></v-img>
        <div class="text-h5">{{ title }}</div>
        <div class="text-body-1">{{ subtitle }}</div>
    </v-row>
</template>

<script>
export default {
    name: 'XNetworkError',
    props: {
        title: {
            type: String,
            default: "Il s'est produit une Erreur"
        },
        subtitle: {
            type: String,
            default: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facere, architecto."
        }
    }
}
</script>
