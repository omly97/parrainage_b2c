import axios from "@/plugins/axios"
import { _handleResponseError } from '@/helpers'
const resource = 'localites'

export default function useLocaliteIndex() {

    const localiteArray = {
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
            axios.get(resource, { params: localiteArray.meta.pagination })
                .then(response => {
                    localiteArray.data = response.data;
                    localiteArray.meta.totalPage = response.meta.last_page;
                    resolve();
                })
                .catch(error => {
                    reject(_handleResponseError(error));
                })
        })
    }

    return {
        localiteArray,
        index,
    }
}
