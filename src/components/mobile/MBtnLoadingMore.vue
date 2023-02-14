<template>
    <div class="d-flex justify-center align-center mx-5">
        <v-divider></v-divider>
        <v-btn
            small
            text
            color="indigo"
            @click="$emit('action')"
        >Charger plus</v-btn>
        <v-divider></v-divider>
    </div>
</template>

<script>
export default {
    name: 'MBtnLoadingMore'
}
</script>
