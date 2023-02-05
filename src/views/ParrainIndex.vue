<template>
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

<script>
import ParrainFormModal from '@/components/ParrainFormModal.vue'
import ParrainList from '@/components/ParrainList.vue'

export default {
    name: 'ParrainIndex',
    components: {
        ParrainList,
        ParrainFormModal
    }
}
</script>
