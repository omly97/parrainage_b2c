<template>
    <v-app :class="{ 'bg-light': !$vuetify.theme.dark }">
        <v-sheet class="d-flex justify-center" color="transparent" height="100%">
            <v-sheet class="align-self-center" color="transparent" width="100%">
                <div class="text-center text-h4 mb-10">Parrainage B2C</div>
                <v-container>
                    <v-row justify="center" align="center">
                        <v-col cols="12" xl="6" lg="6" md="8">
                            <router-view></router-view>
                        </v-col>
                    </v-row>
                </v-container>
            </v-sheet>
        </v-sheet>
    </v-app>
</template>

<script>
export default {
    name: 'AppGuest'
}
</script>

<style scoped>
.bg-light {
    background-color: #F2F6F8;
}
</style>
