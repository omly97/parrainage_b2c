<template>
    <v-card class="pa-14">
        <div class="text-center text-h5 font-weight-bold mb-8">Connexion</div>
        <v-form @submit.prevent="submit">
            <v-text-field
                outlined
                clearable
                label="Email"
                prepend-inner-icon="mdi-email-outline"
                v-model="formData.fields.email"
                :error-messages="formData.errors.email"
            />
            <v-text-field
                outlined
                clearable
                label="Mot de passe"
                prepend-inner-icon="mdi-lock-outline"
                :type="show1 ? 'text' : 'password'"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="show1 = !show1"
                v-model="formData.fields.password"
                :error-messages="formData.errors.password"
            />
            <v-btn
                large
                dark
                block
                type="submit"
                color="indigo"
                :loading="loading"
            >
                Se connecter
            </v-btn>
        </v-form>
    </v-card>
</template>

<script>
import useAuth from "@/hooks/auth";
const { loginFormData, login } = useAuth()

export default {
    name: 'LoginView',
    data() {
        return {
            loading: false,
            error: {
                occured: false,
                code: '',
                message: '',
            },
            formData: loginFormData,
            show1: false
        }
    },
    methods: {
        submit() {
            this.loading = true;
            login()
                .then(response => {
                    if (response.success == false) {
                        this.$swal({
                            icon: 'warning',
                            title: 'Oops...',
                            text: response.message
                        })
                    } else {
                        this.$store.commit('auth/setUser', response.user)
                        this.$store.commit('auth/setToken', response.token)
                        this.$router.push({ name: 'dashboard' })
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
