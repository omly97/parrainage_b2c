<template>
    <v-sheet flat class="py-5" height="100%">
        <v-container>
            <v-toolbar flat outlined color="transparent">
                <v-app-bar-nav-icon>
                    <v-icon>mdi-map-marker-outline</v-icon>
                </v-app-bar-nav-icon>
                <v-toolbar-title>Liste des localites</v-toolbar-title>
                <v-spacer></v-spacer>
            </v-toolbar>

            <LocaliteList table></LocaliteList>
        </v-container>
    </v-sheet>
</template>

<script>
import LocaliteList from '@/components/LocaliteList.vue'

export default {
    name: 'LocaliteIndex',
    components: {
        LocaliteList,
    }
}
</script>
