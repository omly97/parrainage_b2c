import axios from "@/plugins/axios"
import { _handleResponseError } from '@/helpers'
const resource = 'parrains'

export default function useParrainIndex() {

    const parrainArray = {
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

    const index = () => {
        return new Promise((resolve, reject) => {
            axios.get(resource, { params: parrainArray.meta.pagination })
                .then(response => {
                    parrainArray.data = response.data;
                    parrainArray.meta.totalPage = response.meta.last_page;
                    resolve();
                })
                .catch(error => {
                    reject(_handleResponseError(error));
                })
        })
    }

    return {
        parrainArray,
        index
    }
}
