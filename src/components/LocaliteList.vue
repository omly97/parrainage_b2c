<template>
    <div>
        <x-network-error
            v-if="error.occured"
            :title="error.code"
            :subtitle="error.message"
        ></x-network-error>

        <template v-else>
            <v-sheet color="transparent" :max-width="300" :class="{'pa-2' : !table}">
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

            <template v-if="!loading && localiteData.data.length">
                <x-localite-table
                    v-if="table"
                    :localites="localiteData.data"
                ></x-localite-table>

                <x-localite-list
                    v-else
                    :localites="localiteData.data"
                ></x-localite-list>
            </template>

            <v-pagination
                v-if="!loading && localiteData.meta.totalPage > 1"
                v-model="localiteData.meta.pagination.page"
                :length="localiteData.meta.totalPage"
                :total-visible="6"
                @input="fetchLocalites"
                color="indigo"
            ></v-pagination>
        </template>
    </div>
</template>

<script>
import { bus } from '@/main';
import useLocalite from "../hooks/localite";
import XEmptyData from "./customs/XEmptyData.vue";
import XNetworkError from "./customs/XNetworkError.vue";
import XLocaliteList from "./customs/XLocaliteList.vue"
import XLoaderList from './customs/XLoaderList.vue';
import XLocaliteTable from './customs/XLocaliteTable.vue';
const { localiteArray, index } = useLocalite()

export default {
    name: 'LocaliteIndex',
    props: {
        table: {
            type: Boolean,
            default: false
        }
    },
    components: { XEmptyData, XNetworkError, XLocaliteList, XLoaderList, XLocaliteTable },
    data() {
        return {
            loading: false,
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
        }
    }
}
</script>
