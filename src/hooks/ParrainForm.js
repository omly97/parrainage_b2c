import axios from "@/plugins/axios"
import {
    _createFormData,
    _handleResponseError,
    _handleFormErrors
} from '@/helpers'
const resource = 'parrains'

export default function useParrainForm() {

    const parrainFormData = {
        id: '',
        fields: {
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
        },
        errors: {
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

    const _resetParrainFormData = () => {
        parrainFormData.fields = {};
        parrainFormData.errors = {};
    }


    /**
     * [ CRUD ] Store resource
     */
    const store = () => {
        return new Promise((resolve, reject) => {
            let form = _createFormData(parrainFormData.fields)
            axios.post(resource, form)
                .then(response => {
                    _resetParrainFormData();
                    resolve(response);
                })
                .catch(error => {
                    _handleFormErrors(parrainFormData, error);
                    reject(_handleResponseError(error));
                })
        })
    }


    /**
     * [ CRUD ] Edit resource
     * @param {String} id 
     */
    const edit = (id) => {
        _resetParrainFormData();
        return new Promise((resolve, reject) => {
            axios.get(`${resource}/${id}`)
                .then(response => {
                    parrainFormData.id = id;
                    parrainFormData.fields = response.data;
                    resolve();
                })
                .catch(error => {
                    reject(_handleResponseError(error));
                })
        })
    }

    /**
     * [ CRUD ] Update resource
     */
    const update = () => {
        let form = _createFormData(parrainFormData.fields);
        form.append("_method", 'PATCH');
        return new Promise((resolve, reject) => {
            axios.post(`${resource}/${parrainFormData.id}`, form)
                .then(response => {
                    // _resetParrainFormData();
                    resolve(response);
                })
                .catch(error => {
                    _handleFormErrors(parrainFormData, error);
                    reject(_handleResponseError(error));
                })
        })
    }

    return {
        parrainFormData,
        _resetParrainFormData,
        store,
        edit,
        update
    }
}
