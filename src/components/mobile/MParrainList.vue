<template>
    <div>
        <v-list>
            <v-list-item
                v-for="item in parrains"
                :key="item.id"
                @click="handleShowParrain(item)"
            >
                <v-list-item-avatar color="indigo">
                    <v-icon dark>mdi-card-account-details-outline</v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                    <v-list-item-title>{{ `${item.nom} ${item.prenom}` }}</v-list-item-title>
                    <v-list-item-subtitle>{{ item.numero_cin }}</v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action-text>
                    <v-icon size="15">mdi-arrow-right</v-icon>
                </v-list-item-action-text>
            </v-list-item>
        </v-list>

        <v-dialog
            v-if="dialog"
            v-model="dialog"
            transition="dialog-bottom-transition"
            fullscreen
        >
            <v-toolbar dark>
                <v-btn
                    icon
                    dark
                    small
                    @click="dialog = false"
                >
                    <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title>Parrain</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                    <v-btn
                        dark
                        text
                        small
                        @click="dialog = false"
                    >
                        Fermer
                    </v-btn>
                </v-toolbar-items>
            </v-toolbar>
            <m-parrain-card :parrain="parrainItem"></m-parrain-card>
        </v-dialog>
    </div>
</template>

<script>
import MParrainCard from './MParrainCard.vue'

export default {
    name: 'MParrainList',
    components: { MParrainCard },
    props: {
        parrains: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            dialog: false,
            parrainItem: {}
        }
    },
    methods: {
        handleShowParrain(parrainItem) {
            this.parrainItem = parrainItem;
            this.dialog = true;
        }
    }
}
</script>
