<template>
    <div>
        <v-simple-table>
            <template v-slot:default>
                <thead>
                    <tr>
                        <th class="text-left">Nom</th>
                        <th class="text-left">Naissance</th>
                        <th class="text-left">Sexe</th>
                        <th class="text-left">Taille</th>
                        <th class="text-left">CIN</th>
                        <th class="text-left">N.Electeur</th>
                        <th class="text-left">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="item in parrains"
                        :key="item.id"
                        style="cursor: pointer"
                    >
                        <td>{{ `${item.nom} ${item.prenom}` }}</td>
                        <td>{{ item.date_naissance | shortDate }} à {{ item.lieu_naissance }}</td>
                        <td>{{ item.sexe }}</td>
                        <td>{{ item.taille }} cm</td>
                        <td>{{ item.numero_cin }}</td>
                        <td>{{ item.numero_electeur }}</td>
                        <td>
                            <v-menu :close-on-click="true">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn
                                        v-bind="attrs"
                                        v-on="on"
                                        icon
                                    >
                                        <v-icon>mdi-dots-vertical</v-icon>
                                    </v-btn>
                                </template>
                                <v-list dense :min-width="200">
                                    <v-list-item @click="handleShowParrain(item)">
                                        <v-list-item-icon>
                                            <v-icon>mdi-eye</v-icon>
                                        </v-list-item-icon>
                                        <v-list-item-title>Afficher</v-list-item-title>
                                    </v-list-item>
                                    <ParrainFormModal
                                        list-item
                                        icon
                                        update
                                        :parrainId="item.id"
                                    ></ParrainFormModal>
                                </v-list>
                            </v-menu>
                        </td>
                    </tr>
                </tbody>
            </template>
        </v-simple-table>

        <v-dialog v-if="dialog" v-model="dialog" width="600">
            <x-parrain-card :parrain="parrainItem"></x-parrain-card>
        </v-dialog>
    </div>
</template>

<script>
import ParrainFormModal from '../ParrainFormModal.vue'
import XParrainCard from './XParrainCard.vue'

export default {
    components: { ParrainFormModal, XParrainCard },
    name: 'XParrainTable',
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

<style scoped>
td {
    -webkit-user-select: none; /* Safari */        
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* IE10+/Edge */
    user-select: none; /* Standard */
}
</style>
