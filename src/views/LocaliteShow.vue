<template>
<div>
    <!-- mobile view -->
    <template v-if="$vuetify.breakpoint.mobile">
        <m-localite-tabs>
            <template v-slot:tab1>
                <localite-parrain-list :localiteId="localiteId"></localite-parrain-list>
            </template>
            <template v-slot:tab2>
                <localite-user-list :localiteId="localiteId"></localite-user-list>
            </template>
        </m-localite-tabs>
    </template>

    <!-- web view -->
    <template v-else>
        <v-sheet flat class="py-5" height="100%">
            <v-container>
                <w-localite-tabs>
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
                </w-localite-tabs>
            </v-container>
        </v-sheet>
    </template>
</div>
</template>

<script>
import WLocaliteTabs from '@/components/web/WLocaliteTabs.vue'
import LocaliteParrainList from '@/components/LocaliteParrainList.vue'
import LocaliteUserList from '@/components/LocaliteUserList.vue';
import useLocaliteShow from "@/hooks/LocaliteShow";
import MLocaliteTabs from '@/components/mobile/MLocaliteTabs.vue';
const { find } = useLocaliteShow()

export default {
    name: 'LocaliteShow',
    components: {
        WLocaliteTabs,
        LocaliteParrainList,
        LocaliteUserList,
        MLocaliteTabs
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
                    this.$store.commit('app/setCurrentPageTitle', data.nom)
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
