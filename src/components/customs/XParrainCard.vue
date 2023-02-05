<template>
    <v-card class="pa-5">
        <!-- <v-card-title>Parrain Information</v-card-title> -->
        <v-sheet outlined class="display-flex flex-column">
            <!-- top -->
            <v-sheet outlined>
                <v-list-item>
                    <v-list-item-avatar size="60">
                        <v-img :src="require('@/assets/img/logo-cedeao.png')" alt="cedeao"></v-img>
                    </v-list-item-avatar>
                    <v-list-item-content class="text-center">
                        <v-list-item-title>REPUBLIQUE DU SENEGAL</v-list-item-title>
                        <v-list-item-subtitle>Carte de la CEDEAO</v-list-item-subtitle>
                    </v-list-item-content>
                    <v-list-item-avatar size="60">
                        <v-img :src="require('@/assets/img/logo-senegal.png')" alt="senegal"></v-img>
                    </v-list-item-avatar>
                </v-list-item>
            </v-sheet>

            <v-sheet height="280" class="d-flex">
                <!-- center left -->
                <v-sheet width="25%" class="d-flex justify-center align-center">
                    <v-avatar rounded size="120">
                        <v-img :src="require('@/assets/img/anonym.png')" alt="avatar"></v-img>
                    </v-avatar>
                </v-sheet>

                <!-- center right -->
                <v-sheet width="75%">
                    <v-list dense>
                        <v-row dense no-gutters>
                            <v-col
                                cols="12" xl="6" lg="6" md="6"
                                v-for="(item, i) in dataComputed"
                                :key="i"
                            >
                                <v-list-item>
                                    <v-list-item-content>
                                        <v-list-item-subtitle>{{ item.title }}</v-list-item-subtitle>
                                        <v-list-item-title>{{ item.value }}</v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-col>
                        </v-row>
                    </v-list>
                </v-sheet>
            </v-sheet>
        </v-sheet>
    </v-card>
</template>

<script>
export default {
    name: 'XParrainCard',
    props: {
        parrain: {
            type: Object,
            required: true
        }
    },
    computed: {
        dataComputed() {
            return [
                {
                    title: "Prénom",
                    value: this.parrain.prenom
                },
                {
                    title: "Nom",
                    value: this.parrain.nom
                },
                {
                    title: "Date de naissance",
                    value: this.$options.filters.longDate(this.parrain.date_naissance)
                },
                {
                    title: "Lieu de naissance",
                    value: this.parrain.lieu_naissance
                },
                {
                    title: "Sexe",
                    value: this.parrain.sexe
                },
                {
                    title: "Taille",
                    value: `${this.parrain.taille} cm`
                },
                {
                    title: "Date délivrance carte",
                    value: this.$options.filters.longDate(this.parrain.date_delivrance_carte)
                },
                {
                    title: "Date expiration carte",
                    value: this.$options.filters.longDate(this.parrain.date_expiration_carte)
                },
                {
                    title: "Numéro CIN",
                    value: this.parrain.numero_cin
                },
                {
                    title: "Numéro électeur",
                    value: this.parrain.numero_electeur
                },
            ]
        }
    }
}
</script>
