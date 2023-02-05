<template>
    <div>
        <v-dialog v-model="dialog" width="650">
            <template v-slot:activator="{ on, attrs }">
                <v-list-item
                    v-if="listItem"
                    v-bind="attrs"
                    v-on="on"
                >
                    <v-list-item-icon v-if="icon">
                        <v-icon>{{ btnIcom }}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>{{ btnText }}</v-list-item-title>
                </v-list-item>
                <v-btn
                    v-else
                    :color="btnColor"
                    dark
                    v-bind="attrs"
                    v-on="on"
                    :block="block"
                    :outlined="outlined"
                >
                    <v-icon v-if="icon" left>{{ btnIcom }}</v-icon>
                    {{ btnText }}
                </v-btn>
            </template>

            <v-card v-if="dialog" flat class="px-10 py-8">
                <div class="text-h5 font-weight-bold text-center pa-0 mb-">{{ title }}</div>
                <v-divider class="mt-2 mb-10 mx-14" ></v-divider>
                <ParrainForm
                    :update="update"
                    :parrainId="parrainId"
                    @actionSuccess="handleActionSucces"
                ></ParrainForm>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import ParrainForm from "./ParrainForm.vue";

export default {
    name: 'ParrainFormModal',
    components: { ParrainForm },
    props: {
        parrainId: {
            type: String,
            default: ''
        },
        update: {
            type: Boolean,
            default: false
        },
        listItem: {
            type: Boolean,
            default: false
        },
        block: {
            type: Boolean,
            default: false
        },
        outlined: {
            type: Boolean,
            default: false
        },
        icon: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            dialog: false,
        }
    },
    computed: {
        title() {
            return this.update == true
                ? "Editer parrain"
                : "Ajouter un parrain"
        },
        btnText() {
            return this.update == true
                ? "Editer"
                : "Ajouter parrain"
        },
        btnIcom() {
            return this.update == true
                ? "mdi-pencil"
                : "mdi-account-multiple-plus-outline"
        },
        btnColor() {
            return this.update == true
                ? "grey"
                : "primary"
        }
    },
    methods: {
        handleActionSucces(newData) {
            this.dialog = false;
            this.$emit("actionSuccess", newData);
        }
    }
}
</script>
