<template>
<div>
    <!-- mobile view -->
    <template v-if="$vuetify.breakpoint.mobile">
        <m-auth-user-card
            :infos="infosComputed"
            @logout="handleLogout"
        ></m-auth-user-card>
    </template>

    <!-- web view -->
    <template v-else>
        <w-auth-user-card
            :infos="infosComputed"
            @logout="handleLogout"
        ></w-auth-user-card>
    </template>
</div>
</template>

<script>
import useAuth from "@/hooks/auth";
import MAuthUserCard from './mobile/MAuthUserCard.vue';
import WAuthUserCard from './web/WAuthUserCard.vue';
const { logout } = useAuth()

export default {
    name: 'AuthUserCard',
    components: { MAuthUserCard, WAuthUserCard },
    computed: {
        authUser() {
            return this.$store.state.auth.user
        },
        infosComputed() {
            return [
                {
                    title: 'telephone',
                    value: this.authUser.telephone,
                    icon: 'mdi-phone'
                },
                {
                    title: 'Profile',
                    value: this.authUser.profile,
                    icon: 'mdi-poll'
                }
            ];
        }
    },
    methods: {
        handleLogout() {
            logout().then(() => {
                console.log("logout successfully");
            })
        }
    }
}
</script>
