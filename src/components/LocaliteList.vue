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
                    v-if="!loading && !localiteData.data.length"
                ></x-empty-data>
                <m-localite-list
                    v-if="localiteData.data.length"
                    :localites="localiteData.data"
                ></m-localite-list>
                <v-progress-circular
                    v-if="loading"
                    indeterminate
                    color="primary"
                    class="d-flex mx-auto"
                ></v-progress-circular>
                <m-btn-loading-more
                    v-if="localiteData.meta.totalPage != localiteData.meta.pagination.page"
                    @action="handleInfinite"
                ></m-btn-loading-more>
            </template>

            <!-- web view -->
            <template v-else>
                <v-sheet color="transparent" :max-width="300">
                    <v-text-field
                        v-model="localiteData.meta.pagination.search"
                        v-on:keyup.enter="fetchLocalites"
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
                    v-if="!loading && !localiteData.data.length"
                ></x-empty-data>
                <w-localite-table
                    v-if="!loading && localiteData.data.length"
                    :localites="localiteData.data"
                ></w-localite-table>
                <v-pagination
                    v-if="!loading && localiteData.meta.totalPage > 1"
                    v-model="localiteData.meta.pagination.page"
                    :length="localiteData.meta.totalPage"
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
import useLocalite from "../hooks/localite";
import XEmptyData from "./customs/XEmptyData.vue";
import XNetworkError from "./customs/XNetworkError.vue";
import XLoaderList from './customs/XLoaderList.vue';
import WLocaliteTable from './web/WLocaliteTable.vue';
import MLocaliteList from './mobile/MLocaliteList.vue';
import MBtnLoadingMore from './mobile/MBtnLoadingMore.vue';
const { localiteArray, index } = useLocalite()

export default {
    name: 'LocaliteIndex',
    components: {
        XEmptyData,
        XNetworkError,
        XLoaderList,
        WLocaliteTable,
        MLocaliteList,
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
        this.fetchLocalites();
        bus.$on('reload-localites-data', () => {
            this.fetchLocalites();
        })
    },
    computed: {
        localiteData() {
            return localiteArray;
        },
    },
    methods: {
        fetchLocalites() {
            this.loading = true;
            index().then(() => {
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
            this.fetchLocalites()
        },
        handleInfinite() {
            this.pushData = true;
            this.localiteData.meta.pagination.page += 1;
            this.fetchLocalites();
        }
    }
}
</script>
