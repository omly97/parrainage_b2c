import axios from "../plugins/axios"
const resource = 'parrains'

export default function useParrain() {

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
    };

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
    };

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
        },
    }


    const _createFormData = () => {
        const form = new FormData();
        Object.keys(parrainFormData.fields).forEach((key) => {
            if (parrainFormData.fields[key] != null)
                form.append(key, parrainFormData.fields[key]);
        });
        return form;
    }

    const _handleResponseError = (error) => {
        return {
            code: error.code,
            message: error.message,
            serverMessage: error.serverResponse ? error.responseData.message : "Something went wrong!",
        }
    }

    const _handleFormErrors = (error) => {
        if (error.serverResponse == true && error.responseData.errors != undefined) {
            // Clean old errors
            Object.keys(parrainFormData.errors).forEach((key) => {
                parrainFormData.errors[key] = ""
            })

            // Add new errors
            Object.keys(error.responseData.errors).forEach((key) => {
                parrainFormData.errors[key] = error.responseData.errors[key][0];
            });
        }
    }

    const _resetParrainFormData = () => {
        parrainFormData.fields = {};
        parrainFormData.errors = {};
    }


    /**
     * [ CRUD ] List des parrains
     */
    const index = (pushData=false) => {
        return new Promise((resolve, reject) => {
            axios.get(resource, { params: parrainArray.meta.pagination })
                .then(response => {
                    if (pushData) parrainArray.data = parrainArray.data.concat(response.data)
                    else parrainArray.data = response.data;
                    parrainArray.meta.totalPage = response.meta.last_page;
                    resolve();
                })
                .catch(error => {
                    reject(_handleResponseError(error));
                })
        })
    }

    /**
     * [ CRUD ] Store resource
     */
    const store = () => {
        return new Promise((resolve, reject) => {
            axios.post(resource, _createFormData())
                .then(response => {
                    _resetParrainFormData();
                    resolve(response);
                })
                .catch(error => {
                    _handleFormErrors(error);
                    reject(_handleResponseError(error));
                })
        })
    }

    /**
     * [ CRUD ] Find resource
     * @param {String} id 
     */
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
        let form = _createFormData();
        form.append("_method", 'PATCH');
        return new Promise((resolve, reject) => {
            axios.post(`${resource}/${parrainFormData.id}`, form)
                .then(response => {
                    // _resetParrainFormData();
                    resolve(response);
                })
                .catch(error => {
                    _handleFormErrors(error);
                    reject(_handleResponseError(error));
                })
        })
    }

    /**
     * [ CRUD ] Delete resource
     * @param {String} id
     */
    const destroy = (id) => {
        return new Promise((resolve, reject) => {
            axios.delete(`${resource}/${id}`)
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    reject(_handleResponseError(error));
                })
        })
    }

    return {
        parrainArray,
        parrainObject,
        parrainFormData,
        _resetParrainFormData,
        index,
        store,
        find,
        edit,
        update,
        destroy
    }
}
