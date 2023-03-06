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
                    v-if="!loading && !userData.data.length"
                ></x-empty-data>
                <m-user-list
                    v-if="userData.data.length"
                    :users="userData.data"
                ></m-user-list>
                <v-progress-circular
                    v-if="loading"
                    indeterminate
                    color="primary"
                    class="d-flex mx-auto"
                ></v-progress-circular>
                <m-btn-loading-more
                    v-if="userData.meta.totalPage != userData.meta.pagination.page"
                    @action="handleInfinite"
                ></m-btn-loading-more>
            </template>

            <!-- web view -->
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
                <w-user-table
                    v-if="!loading && userData.data.length"
                    :users="userData.data"
                ></w-user-table>
                <v-pagination
                    v-if="!loading && userData.meta.totalPage > 1"
                    v-model="userData.meta.pagination.page"
                    :length="userData.meta.totalPage"
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
import useLocaliteUser from "../hooks/LocaliteUser";
import XEmptyData from "./customs/XEmptyData.vue";
import XNetworkError from "./customs/XNetworkError.vue";
import WUserTable from './web/WUserTable.vue';
import MUserList from './mobile/MUserList.vue';
import MBtnLoadingMore from './mobile/MBtnLoadingMore.vue';
const { userArray, users } = useLocaliteUser()

export default {
    name: 'LocaliteUserList',
    props: {
        localiteId: {
            type: String,
            required: true
        }
    },
    components: {
        XEmptyData,
        XNetworkError,
        WUserTable,
        MUserList,
        MBtnLoadingMore
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
        },
        handlePagination() {
            this.pushData = false;
            this.fetchUsers()
        },
        handleInfinite() {
            this.pushData = true;
            this.userData.meta.pagination.page += 1;
            this.fetchUsers();
        }
    }
}
</script>
