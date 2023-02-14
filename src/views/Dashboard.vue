<template>
<div>
    <!-- mobile view -->
    <template v-if="$vuetify.breakpoint.mobile">
        <v-card-title>Dashboard Page</v-card-title>
    </template>

    <!-- web view -->
    <template v-else>
        <v-sheet flat class="py-5" height="100%">
            <v-container>
                <v-card-title>Dashboard</v-card-title>
            </v-container>
        </v-sheet>
    </template>
</div>
</template>

<script>
export default {
    name: 'DashboardView',
    created() {
        this.$store.commit('app/setCurrentPageTitle', "Dashboard")
    }
}
</script>
