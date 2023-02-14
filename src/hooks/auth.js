import axios from "../plugins/axios";
import store from "@/store/index";
import router from "@/router/index";

export default function usePassword() {

    const loginFormData = {
        fields: {
            email: '',
            password: ''
        },
        errors: {
            email: '',
            password: ''
        },
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
            Object.keys(loginFormData.errors).forEach((key) => {
                loginFormData.errors[key] = ""
            })
            Object.keys(error.responseData.errors).forEach((key) => {
                loginFormData.errors[key] = error.responseData.errors[key][0];
            });
        }
    }

    const _axios_remove_api = () => {
        let baseURL = axios.defaults.baseURL;
        if (baseURL.includes('/api')) {
            axios.defaults.baseURL = baseURL.replace('/api', '')
        }
    }

    const _axios_add_api = () => {
        let baseURL = axios.defaults.baseURL;
        if (!baseURL.includes('/api')) {
            axios.defaults.baseURL = baseURL + '/api';
        }
    }

    /**
     * [ Auth ] login
     */
    const login = () => {
        return new Promise((resolve, reject) => {
            _axios_remove_api()
            axios.get("/sanctum/csrf-cookie").then(() => {
                _axios_add_api()
                axios.post('/login', loginFormData.fields)
                    .then(response => {
                        resolve(response);
                    })
                    .catch(error => {
                        _handleFormErrors(error);
                        reject(_handleResponseError(error));
                    })
            })
        })
    }

    /**
     * [ Auth ] Get current user
     */
    const whoami = () => {
        return new Promise((resolve, reject) => {
            axios.get('auth/whoami')
                .then(response => {
                    resolve(response)
                })
                .catch(error => {
                    reject(error)
                })
        })
    }

    /**
     * [ Auth ] logout
     */
    const logout = () => {
        return new Promise((resolve, reject) => {
            axios.post('auth/logout')
                .then(() => {
                    store.dispatch("auth/logout")
                    router.push({ name: 'auth-login' })
                    resolve()
                })
                .catch(error => {
                    reject(error)
                })
        })
    }

    return {
        loginFormData,
        login,
        whoami,
        logout
    }
}
