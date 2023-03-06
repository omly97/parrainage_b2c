import axios from "@/plugins/axios"
import { _handleResponseError } from '@/helpers'
const resource = 'localites'

export default function useLocaliteUser() {

    const userArray = {
        data: [],
        meta: {
            pagination: {
                page: 1,
                perPage: 24,
                search: ''
            },
            totalPage: 1
        }
    }

    const users = (id) => {
        return new Promise((resolve, reject) => {
            axios.get(`${resource}/${id}/users`, { params: userArray.meta.pagination })
                .then(response => {
                    userArray.data = response.data;
                    userArray.meta.totalPage = response.meta.last_page;
                    resolve();
                })
                .catch(error => {
                    reject(_handleResponseError(error));
                })
        })
    }

    return {
        userArray,
        users
    }
}
