<template>
<div>
    <!-- mobile view -->
    <template v-if="$vuetify.breakpoint.mobile">
        <LocaliteList></LocaliteList>
    </template>

    <!-- web view -->
    <template v-else>
        <v-sheet flat class="py-5" height="100%">
            <v-container>
                <v-toolbar flat outlined color="transparent">
                    <v-app-bar-nav-icon>
                        <v-icon>mdi-map-marker-outline</v-icon>
                    </v-app-bar-nav-icon>
                    <v-toolbar-title>Liste des localités</v-toolbar-title>
                    <v-spacer></v-spacer>
                </v-toolbar>

                <LocaliteList></LocaliteList>
            </v-container>
        </v-sheet>
    </template>
</div>
</template>

<script>
import LocaliteList from '@/components/LocaliteList.vue'

export default {
    name: 'LocaliteIndex',
    components: {
        LocaliteList,
    },
    created() {
        this.$store.commit('app/setCurrentPageTitle', "Localités")
    }
}
</script>
