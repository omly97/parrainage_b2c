<template>
    <div class="d-flex flex-column justify-space-between align-center py-5">
        <v-img
            max-width="250"
            max-height="300"
            :src="require('@/assets/img/database.png')"
        />
        <div class="font-weight-bold text--secondary">{{ text }}</div>
    </div>
</template>

<script>
export default {
    name: 'EmptyData',
    props: {
        text: {
            type: String,
            default: "Pase de données"
        }
    }
}
</script>
