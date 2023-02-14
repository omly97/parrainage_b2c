<template>
    <v-card flat>
        <v-card-title>Changement mot de passe</v-card-title>
        <v-form @submit.prevent="submit">
            <v-text-field
                outlined
                clearable
                label="Mot de passe actuel"
                :type="show1 ? 'text' : 'password'"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="show1 = !show1"
                v-model="formData.fields.current_password"
                :error-messages="formData.errors.current_password"
            />

            <v-text-field
                outlined
                clearable
                label="Mot de passe"
                :type="show2 ? 'text' : 'password'"
                :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="show2 = !show2"
                v-model="formData.fields.password"
                :error-messages="formData.errors.password"
            />

            <v-text-field
                outlined
                clearable
                label="Confirmation"
                :type="show3 ? 'text' : 'password'"
                :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="show3 = !show3"
                v-model="formData.fields.password_confirmation"
                :error-messages="formData.errors.password_confirmation"
            />

            <v-btn
                large
                dark
                type="submit"
                color="indigo"
                :loading="loading"
            >
                Soumettre
            </v-btn>
        </v-form>
    </v-card>
</template>

<script>
import usePassword from "@/hooks/password";
const { passswordFormData, _resetPasswordFormData, update } = usePassword()

export default {
    name: 'AuthUserPassword',
    data() {
        return {
            loading: false,
            error: {
                occured: false,
                code: '',
                message: '',
            },
            formData: passswordFormData,
            show1: false,
            show2: false,
            show3: false
        }
    },
    computed: {
        authUser() {
            return this.$store.state.auth.user
        }
    },
    created() {
        _resetPasswordFormData()
    },
    methods: {
        submit() {
            this.loading = true;
            update(this.authUser.id, false)
                .then(response => {
                    if (response.success == true) {
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
        }
    },
}
</script>
