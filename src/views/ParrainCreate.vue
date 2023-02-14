<template>
<div>
    <!-- mobile view -->
    <template v-if="$vuetify.breakpoint.mobile">
        <v-card flat class="py-5 px-8">
            <ParrainForm
                mobile
                @actionSuccess="$router.push({ name: 'parrain-index' })"
            ></ParrainForm>
        </v-card>
    </template>

    <!-- web view -->
    <template v-else>
        <div>This page is only available for mobile devices</div>
    </template>
</div>
</template>

<script>
import ParrainForm from "@/components/ParrainForm.vue";

export default {
    name: 'ParrainCreate',
    components: { ParrainForm },
    created() {
        this.$store.commit('app/setCurrentPageTitle', "Ajouter parrain")
    }
}
</script>
