<template>
    <v-sheet flat class="py-5" height="100%">
        <v-container>
            <x-localite-tabs>
                <template v-slot:toolbar>
                    <v-app-bar-nav-icon>
                        <v-icon>mdi-map-marker-multiple-outline</v-icon>
                    </v-app-bar-nav-icon>
                    <v-toolbar-title>{{ localite.nom }}</v-toolbar-title>
                </template>

                <template v-slot:tab1>
                    <localite-parrain-list :localiteId="localiteId"></localite-parrain-list>
                </template>

                <template v-slot:tab2>
                    <localite-user-list :localiteId="localiteId"></localite-user-list>
                </template>

                <template v-slot:tab3>
                    <span>Here might be a page tab3</span>
                </template>
            </x-localite-tabs>
        </v-container>
    </v-sheet>
</template>

<script>
import XLocaliteTabs from '@/components/customs/XLocaliteTabs.vue'
import LocaliteParrainList from '@/components/LocaliteParrainList.vue'
import LocaliteUserList from '@/components/LocaliteUserList.vue';
import useLocalite from "@/hooks/localite";
const { find } = useLocalite()

export default {
    name: 'LocaliteShow',
    components: {
        XLocaliteTabs,
        LocaliteParrainList,
        LocaliteUserList
    },
    data() {
        return {
            localite: {}
        }
    },
    computed: {
        localiteId() {
            return this.$route.params.localiteId
        }
    },
    created() {
        this.fetchLocalite()
    },
    // watch: { 
    //   	localiteId() {
    //         this.fetchLocalite();
    //     }
    // },
    methods: {
        fetchLocalite() {
            this.loading = true;
            find(this.localiteId)
                .then(data => {
                    this.localite = data
                })
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
    }
}
</script>
