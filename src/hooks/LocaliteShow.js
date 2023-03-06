import axios from "@/plugins/axios"
import { _handleResponseError } from '@/helpers'
const resource = 'localites'

export default function useLocaliteShow() {

    const localiteObject = {
        attributes: {
            id: '',
            nom: '',
            region: '',
            departement: '',
            arrondissement: '',
            commune: ''
        }
    }

    const find = (id) => {
        localiteObject.attributes = {}
        return new Promise((resolve, reject) => {
            axios.get(`${resource}/${id}`)
                .then(response => {
                    localiteObject.attributes = response.data;
                    resolve(response.data)
                })
                .catch(error => {
                    reject(_handleResponseError(error));
                })
        })
    }
    
    return {
        localiteObject,
        find
    }
}
