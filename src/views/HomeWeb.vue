<template>
<div>
    <!-- mobile view -->
    <template v-if="$vuetify.breakpoint.mobile">
        <div>This page is not available for mobile devices</div>
    </template>

    <!-- web view -->
    <template v-else>
        <v-sheet height="100%">
            <v-container>
                <h5 class="text-h5 font-weight-bold mb-5">Mon compte</h5>
                <v-row justify="center">
                    <v-col cols="12" xl="3" lg="5" md="3">
                        <auth-user-card></auth-user-card>
                    </v-col>
                    <v-col cols="12" xl="6" lg="6" md="9">
                        <v-card class="pa-10">
                            <auth-user-password></auth-user-password>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </v-sheet>
    </template>
</div>
</template>

<script>
import AuthUserPassword from '@/components/AuthUserPassword.vue';
import AuthUserCard from '@/components/AuthUserCard.vue';

export default {
    name: 'HomeWeb',
    components: { AuthUserPassword, AuthUserCard },
    computed: {
        authUser() {
            return this.$store.state.auth.user
        }
    }
}
</script>
