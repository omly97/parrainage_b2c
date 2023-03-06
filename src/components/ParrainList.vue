<template>
    <div>
        <x-network-error
            v-if="error.occured"
            :title="error.code"
            :subtitle="error.message"
        ></x-network-error>

        <template v-else>
            <!-- mobile view -->
            <template v-if="$vuetify.breakpoint.mobile">
                <x-empty-data
                    v-if="!loading && !parrainData.data.length"
                ></x-empty-data>
                <m-parrain-list
                    v-if="parrainData.data.length"
                    :parrains="parrainData.data"
                ></m-parrain-list>
                <v-progress-circular
                    v-if="loading"
                    indeterminate
                    color="primary"
                    class="d-flex mx-auto"
                ></v-progress-circular>
                <m-btn-loading-more
                    v-if="parrainData.meta.totalPage != parrainData.meta.pagination.page"
                    @action="handleInfinite"
                ></m-btn-loading-more>
            </template>

            <!-- web view -->
            <template v-else>
                <v-sheet color="transparent" :max-width="300">
                    <v-text-field
                        v-model="parrainData.meta.pagination.search"
                        v-on:keyup.enter="fetchParrains"
                        outlined
                        dense
                        prepend-inner-icon="mdi-magnify"
                        label="Rechercher"
                        placeholder="ex: REF000"
                    >
                    </v-text-field>
                </v-sheet>
                <x-loader-list
                    v-if="loading"
                ></x-loader-list>
                <x-empty-data
                    v-if="!loading && !parrainData.data.length"
                ></x-empty-data>
                <w-parrain-table
                    v-if="!loading && parrainData.data.length"
                    :parrains="parrainData.data"
                ></w-parrain-table>
                <v-pagination
                    v-if="!loading && parrainData.meta.totalPage > 1"
                    v-model="parrainData.meta.pagination.page"
                    :length="parrainData.meta.totalPage"
                    :total-visible="6"
                    @input="handlePagination"
                    color="indigo"
                ></v-pagination>
            </template>
        </template>
    </div>
</template>

<script>
import { bus } from '@/main';
import useParrainIndex from "../hooks/ParrainIndex";
import XEmptyData from "./customs/XEmptyData.vue";
import XNetworkError from "./customs/XNetworkError.vue";
import XLoaderList from './customs/XLoaderList.vue';
import WParrainTable from './web/WParrainTable.vue';
import MParrainList from './mobile/MParrainList.vue';
import MBtnLoadingMore from './mobile/MBtnLoadingMore.vue';
const { parrainArray, index } = useParrainIndex()

export default {
    name: 'ParrainList',
    components: {
        XEmptyData,
        XNetworkError,
        XLoaderList,
        WParrainTable,
        MParrainList,
        MBtnLoadingMore,
    },
    data() {
        return {
            loading: false,
            pushData: false,
            error: {
                occured: false,
                code: '',
                message: '',
            },
            selectedId: null,
        }
    },
    created() {
        this.fetchParrains();
        bus.$on('reload-parrains-data', () => {
            this.fetchParrains();
        })
    },
    computed: {
        parrainData() {
            return parrainArray;
        },
    },
    methods: {
        fetchParrains() {
            this.loading = true;
            index(this.pushData).then(() => {
                this.error = {
                    occured: false,
                    code: "",
                    message: ""
                }
            }).catch(error => {
                this.error = {
                    occured: true,
                    code: error.code,
                    message: error.message
                }
            }).finally(() => {
                this.loading = false
            });
        },
        handlePagination() {
            this.pushData = false;
            this.fetchParrains()
        },
        handleInfinite() {
            this.pushData = true;
            this.parrainData.meta.pagination.page += 1;
            this.fetchParrains();
        }
    }
}
</script>
