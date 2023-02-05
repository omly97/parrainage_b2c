import axios from "../plugins/axios"
const resource = 'localites'

export default function useLocalite() {

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
    };

    const localiteObject = {
        attributes: {
            id: '',
            nom: '',
            region: '',
            departement: '',
            arrondissement: '',
            commune: ''
        }
    };

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
    };

    const _handleResponseError = (error) => {
        return {
            code: error.code,
            message: error.message,
            serverMessage: error.serverResponse ? error.responseData.message : "Something went wrong!",
        }
    }


    /**
     * [ CRUD ] List des localites
     */
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

    /**
     * [ CRUD ] Find resource
     * @param {String} id 
     */
    const find = (id) => {
        // localiteObject.attributes = {}
        return new Promise((resolve, reject) => {
            axios.get(`${resource}/${id}`)
                .then(response => {
                    localiteObject.attributes = response.data;
                    resolve(response.data);
                })
                .catch(error => {
                    reject(_handleResponseError(error));
                })
        })
    }


    /**
     * [ Relation Ship ] parrains
     */
    const parrains = (id) => {
        return new Promise((resolve, reject) => {
            axios.get(`${resource}/${id}/parrains`, { params: parrainArray.meta.pagination })
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


    /**
     * [ Relation Ship ] users
     */
    const users = (id) => {
        return new Promise((resolve, reject) => {
            axios.get(`${resource}/${id}/users`, { params: parrainArray.meta.pagination })
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
        localiteArray,
        localiteObject,
        parrainArray,
        userArray,
        index,
        find,
        parrains,
        users
    }
}
