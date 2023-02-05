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
                    v-model="userData.meta.pagination.search"
                    v-on:keyup.enter="fetchUsers"
                    outlined
                    dense
                    prepend-inner-icon="mdi-magnify"
                    label="Rechercher"
                    placeholder="ex: REF000"
                >
                </v-text-field>
            </v-sheet>

            <v-skeleton-loader
                v-if="loading"
                type="table"
            ></v-skeleton-loader>

            <x-empty-data
                v-if="!loading && !userData.data.length"
            ></x-empty-data>

            <x-user-table
                v-if="!loading && userData.data.length"
                :users="userData.data"
            ></x-user-table>

            <v-pagination
                v-if="!loading && userData.meta.totalPage > 1"
                v-model="userData.meta.pagination.page"
                :length="userData.meta.totalPage"
                :total-visible="6"
                @input="fetchUsers"
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
import XUserTable from './customs/XUserTable.vue';
const { userArray, users } = useLocalite()

export default {
    name: 'LocaliteUserList',
    props: {
        localiteId: {
            type: String,
            required: true
        }
    },
    components: { XEmptyData, XNetworkError, XUserTable },
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
        this.fetchUsers();
        bus.$on('reload-users-data', () => {
            this.fetchUsers();
        })
    },
    watch: { 
        localiteId() {
            this.userData.meta.pagination.search = "";
            this.fetchUsers();
        }
    },
    computed: {
        userData() {
            return userArray;
        },
    },
    methods: {
        fetchUsers() {
            this.loading = true;
            users(this.localiteId).then(() => {
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
