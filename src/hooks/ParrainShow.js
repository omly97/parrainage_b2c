import axios from "@/plugins/axios"
import { _handleResponseError } from '@/helpers'
const resource = 'parrains'

export default function useParrainShow() {

    const parrainObject = {
        attributes: {
            id: '',
            localite_id: '',
            prenom: '',
            nom: '',
            date_naissance: '',
            lieu_naissance: '',
            sexe: '',
            taille: '',
            date_delivrance_carte: '',
            date_expiration_carte: '',
            numero_cin: '',
            numero_electeur: ''
        }
    }

    const find = (id) => {
        // parrainObject.attributes = {}
        return new Promise((resolve, reject) => {
            axios.get(`${resource}/${id}`)
                .then(response => {
                    parrainObject.attributes = response.data;
                    resolve(response.data);
                })
                .catch(error => {
                    reject(_handleResponseError(error));
                })
        })
    }

    return {
        parrainObject,
        find
    }
}
