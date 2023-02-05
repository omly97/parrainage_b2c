<template>
    <div>
        <x-network-error
            v-if="error.occured"
            :title="error.code"
            :subtitle="error.message"
        ></x-network-error>

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

            <template v-if="!loading && parrainData.data.length">
                <x-parrain-table
                    :parrains="parrainData.data"
                ></x-parrain-table>
            </template>

            <v-pagination
                v-if="!loading && parrainData.meta.totalPage > 1"
                v-model="parrainData.meta.pagination.page"
                :length="parrainData.meta.totalPage"
                :total-visible="6"
                @input="fetchParrains"
                color="indigo"
            ></v-pagination>
        </template>
    </div>
</template>

<script>
import { bus } from '@/main';
import useParrain from "../hooks/parrain";
import XEmptyData from "./customs/XEmptyData.vue";
import XNetworkError from "./customs/XNetworkError.vue";
import XLoaderList from './customs/XLoaderList.vue';
import XParrainTable from './customs/XParrainTable.vue';
const { parrainArray, index } = useParrain()

export default {
    name: 'ParrainList',
    components: { XEmptyData, XNetworkError, XLoaderList, XParrainTable, },
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
