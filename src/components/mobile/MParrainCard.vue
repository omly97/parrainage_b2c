<template>
    <v-card>
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
        <v-divider></v-divider>
        <v-list>
            <v-list-item
                v-for="(item, i) in dataComputed"
                :key="i"
            >
                <v-list-item-avatar>
                    <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                    <v-list-item-subtitle>{{ item.title }}</v-list-item-subtitle>
                    <v-list-item-title>{{ item.value }}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </v-card>
</template>

<script>
export default {
    name: 'MParrainCard',
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
                    icon: 'mdi-face-man',
                    value: this.parrain.prenom
                },
                {
                    title: "Nom",
                    icon: 'mdi-face-man',
                    value: this.parrain.nom
                },
                {
                    title: "Date de naissance",
                    icon: 'mdi-calendar-month-outline',
                    value: this.$options.filters.longDate(this.parrain.date_naissance)
                },
                {
                    title: "Lieu de naissance",
                    icon: 'mdi-map-marker',
                    value: this.parrain.lieu_naissance
                },
                {
                    title: "Sexe",
                    icon: 'mdi-gender-male-female',
                    value: this.parrain.sexe
                },
                {
                    title: "Taille",
                    icon: 'mdi-code-array',
                    value: `${this.parrain.taille} cm`
                },
                {
                    title: "Date délivrance carte",
                    icon: 'mdi-calendar-month-outline',
                    value: this.$options.filters.longDate(this.parrain.date_delivrance_carte)
                },
                {
                    title: "Date expiration carte",
                    icon: 'mdi-calendar-month-outline',
                    value: this.$options.filters.longDate(this.parrain.date_expiration_carte)
                },
                {
                    title: "Numéro CIN",
                    icon: 'mdi-ticket-confirmation-outline',
                    value: this.parrain.numero_cin
                },
                {
                    title: "Numéro électeur",
                    icon: 'mdi-ticket-confirmation-outline',
                    value: this.parrain.numero_electeur
                },
            ]
        }
    }
}
</script>
