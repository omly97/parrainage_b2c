<template>
<div>
    <!-- mobile view -->
    <template v-if="$vuetify.breakpoint.mobile">
        <ParrainList></ParrainList>
    </template>

    <!-- web view -->
    <template v-else>
        <v-sheet flat class="py-5" height="100%">
            <v-container>
                <v-toolbar flat outlined color="transparent">
                    <v-app-bar-nav-icon>
                        <v-icon>mdi-card-account-details-outline</v-icon>
                    </v-app-bar-nav-icon>
                    <v-toolbar-title>Liste des parrains</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <ParrainFormModal
                        icon
                        outlined
                    ></ParrainFormModal>
                </v-toolbar>
                <ParrainList></ParrainList>
            </v-container>
        </v-sheet>
    </template>
</div>
</template>

<script>
import ParrainFormModal from '@/components/ParrainFormModal.vue'
import ParrainList from '@/components/ParrainList.vue'

export default {
    name: 'ParrainIndex',
    components: {
        ParrainList,
        ParrainFormModal
    },
    created() {
        this.$store.commit('app/setCurrentPageTitle', "Parrains")
    }
}
</script>
