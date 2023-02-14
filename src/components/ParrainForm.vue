<template>
    <v-form @submit.prevent="update ? updateParrain() : storeParrain()">
        <v-row dense :no-gutters="mobile">
            <!-- nom -->
            <v-col cols="12" md="6">
                <v-text-field
                    :outlined="!mobile"
                    :filled="mobile"
                    :rounded="mobile"
                    clearable
                    label="Nom"
                    prepend-inner-icon="mdi-face-man"
                    v-model="formData.fields.nom"
                    :error-messages="formData.errors.nom"
                />
            </v-col>

            <!-- prenom -->
            <v-col cols="12" md="6">
                <v-text-field
                    :outlined="!mobile"
                    :filled="mobile"
                    :rounded="mobile"
                    clearable
                    label="Prenom"
                    prepend-inner-icon="mdi-face-man"
                    v-model="formData.fields.prenom"
                    :error-messages="formData.errors.prenom"
                />
            </v-col>

            <!-- date_naissance -->
            <v-col cols="12" md="6">
                <v-menu
                    v-model="menus.menu1"
                    :close-on-content-click="false"
                    max-width="290"
                >
                    <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                            :outlined="!mobile"
                            :filled="mobile"
                            :rounded="mobile"
                            clearable
                            readonly
                            label="Date naissance"
                            prepend-inner-icon="mdi-calendar-month-outline"
                            :value="dateNaissanceComputed"
                            v-bind="attrs"
                            v-on="on"
                            @click:clear="formData.fields.date_naissance = null"
                            :error-messages="formData.errors.date_naissance"
                        />
                    </template>
                    <v-date-picker v-model="formData.fields.date_naissance" @change="menus.menu1 = false" />
                </v-menu>
            </v-col>

            <!-- lieu_naissance -->
            <v-col cols="12" md="6">
                <v-text-field
                    :outlined="!mobile"
                    :filled="mobile"
                    :rounded="mobile"
                    clearable
                    label="Lieu naissance"
                    prepend-inner-icon="mdi-map-marker"
                    v-model="formData.fields.lieu_naissance"
                    :error-messages="formData.errors.lieu_naissance"
                />
            </v-col>

            <!-- sexe -->
            <v-col cols="12" md="6">
                <v-select
                    :items="['M', 'F']"
                    label="Sexe"
                    :outlined="!mobile"
                    :filled="mobile"
                    :rounded="mobile"
                    prepend-inner-icon="mdi-gender-male-female"
                    v-model="formData.fields.sexe"
                    :error-messages="formData.errors.sexe"
                />
            </v-col>

            <!-- taille -->
            <v-col cols="12" md="6">
                <v-text-field
                    :outlined="!mobile"
                    :filled="mobile"
                    :rounded="mobile"
                    clearable
                    label="Taille (en cm)"
                    prepend-inner-icon="mdi-code-array"
                    v-model="formData.fields.taille"
                    :error-messages="formData.errors.taille"
                />
            </v-col>

            <!-- date_delivrance_carte -->
            <v-col cols="12" md="6">
                <v-menu
                    v-model="menus.menu2"
                    :close-on-content-click="false"
                    max-width="290"
                >
                    <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                            :outlined="!mobile"
                            :filled="mobile"
                            :rounded="mobile"
                            clearable
                            readonly
                            label="Date delivrance"
                            prepend-inner-icon="mdi-calendar-month-outline"
                            :value="dateDelivranceComputed"
                            v-bind="attrs"
                            v-on="on"
                            @click:clear="formData.fields.date_delivrance_carte = null"
                            :error-messages="formData.errors.date_delivrance_carte"
                        />
                    </template>
                    <v-date-picker v-model="formData.fields.date_delivrance_carte" @change="menus.menu2 = false" />
                </v-menu>
            </v-col>

            <!-- date_expiration_carte -->
            <v-col cols="12" md="6">
                <v-menu
                    v-model="menus.menu3"
                    :close-on-content-click="false"
                    max-width="290"
                >
                    <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                            :outlined="!mobile"
                            :filled="mobile"
                            :rounded="mobile"
                            clearable
                            readonly
                            label="Date expiration"
                            prepend-inner-icon="mdi-calendar-month-outline"
                            :value="dateExpirationComputed"
                            v-bind="attrs"
                            v-on="on"
                            @click:clear="formData.fields.date_expiration_carte = null"
                            :error-messages="formData.errors.date_expiration_carte"
                        />
                    </template>
                    <v-date-picker v-model="formData.fields.date_expiration_carte" @change="menus.menu3 = false" />
                </v-menu>
            </v-col>

            <!-- numero_cin -->
            <v-col cols="12" md="6">
                <v-text-field
                    :outlined="!mobile"
                    :filled="mobile"
                    :rounded="mobile"
                    clearable
                    label="Numero CIN"
                    prepend-inner-icon="mdi-ticket-confirmation-outline"
                    v-model="formData.fields.numero_cin"
                    :error-messages="formData.errors.numero_cin"
                />
            </v-col>

            <!-- numero_electeur -->
            <v-col cols="12" md="6">
                <v-text-field
                    :outlined="!mobile"
                    :filled="mobile"
                    :rounded="mobile"
                    clearable
                    label="Numero electeur"
                    prepend-inner-icon="mdi-ticket-confirmation-outline"
                    v-model="formData.fields.numero_electeur"
                    :error-messages="formData.errors.numero_electeur"
                />
            </v-col>
        </v-row>
        <v-btn
            type="submit"
            dark
            large
            color="indigo"
            :loading="loading"
        >Soumettre</v-btn>
    </v-form>
</template>

<script>
import { bus } from '@/main';
import useParrain from "@/hooks/parrain";
const { parrainFormData, _resetParrainFormData, store, edit, update } = useParrain()

export default {
    name: 'ParrainForm',
    props: {
        parrainId: {
            type: String,
            default: '' 
        },
        update: {
            type: Boolean,
            default: false
        },
        mobile: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            loading: false,
            error: {
                occured: false,
                code: '',
                message: '',
            },
            formData: parrainFormData,
            menus: {
                menu1: false,
                menu2: false,
                menu3: false
            }
        }
    },
    computed: {
        dateNaissanceComputed () {
            return this.formData.fields.date_naissance
                ? this.$options.filters.longDate(this.formData.fields.date_naissance)
                : ''
        },
        dateDelivranceComputed () {
            return this.formData.fields.date_delivrance_carte
                ? this.$options.filters.longDate(this.formData.fields.date_delivrance_carte)
                : ''
        },
        dateExpirationComputed () {
            return this.formData.fields.date_expiration_carte
                ? this.$options.filters.longDate(this.formData.fields.date_expiration_carte)
                : ''
        }
    },
    created() {
        _resetParrainFormData()
        if (this.update) this.fetchParrain()
    },
    methods: {
        storeParrain() {
            this.loading = true;
            store()
                .then(response => {
                    if (response.success == true) {
                        bus.$emit('reload-parrains-data');
                        this.$emit("actionSuccess", this.formData.fields);
                        this.$swal({
                            icon: 'success',
                            title: 'Good Job',
                            text: response.message
                        })
                    } else {
                        this.$swal({
                            icon: 'warning',
                            title: 'Oops...',
                            text: response.message
                        })
                    }
                })
                .catch(error => {
                    this.$swal({
                        icon: 'error',
                        title: 'Oops...',
                        text: error.serverMessage
                    })
                })
                .finally(() => {
                    this.loading = false
                })
        },
        fetchParrain() {
            this.loading = true;
            edit(this.parrainId)
                .catch(error => {
                    this.$swal({
                        icon: 'error',
                        title: 'Oops...',
                        text: `${error.message} || ${error.serverMessage}`
                    })
                })
                .finally(() => {
                    this.loading = false
                })
        },
        updateParrain() {
            this.loading = true;
            update()
                .then(response => {
                    if (response.success == true) {
                        bus.$emit('reload-parrains-data');
                        this.$emit("actionSuccess", this.formData.fields);
                        this.$swal({
                            icon: 'success',
                            title: 'Good Job',
                            text: response.message
                        })
                    } else {
                        this.$swal({
                            icon: 'warning',
                            title: 'Oops...',
                            text: response.message
                        })
                    }
                })
                .catch(error => {
                    this.$swal({
                        icon: 'error',
                        title: 'Oops...',
                        text: error.serverMessage
                    })
                })
                .finally(() => {
                    this.loading = false
                })
        },
    }
}
</script>
