import axios from "../plugins/axios";

export default function usePassword() {

    const passswordFormData = {
        fields: {
            current_password: '',
            password: '',
            password_confirmation: ''
        },
        errors: {
            current_password: '',
            password: '',
            password_confirmation: ''
        },
    }


    const _createFormData = () => {
        const form = new FormData();
        Object.keys(passswordFormData.fields).forEach((key) => {
            if (passswordFormData.fields[key] != null)
                form.append(key, passswordFormData.fields[key]);
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
            Object.keys(passswordFormData.errors).forEach((key) => {
                passswordFormData.errors[key] = ""
            })

            // Add new errors
            Object.keys(error.responseData.errors).forEach((key) => {
                passswordFormData.errors[key] = error.responseData.errors[key][0];
            });
        }
    }

    const _resetPasswordFormData = () => {
        passswordFormData.fields = {};
        passswordFormData.errors = {};
    }

    /**
     * [ CRUD ] Update resource
     */
    const update = (userId, resetPassword) => {
        let form = _createFormData();
        form.append("_method", 'PATCH');
        const url = resetPassword == true
            ? `users/${userId}/password/reset`
            : `users/${userId}/password/update`;
        return new Promise((resolve, reject) => {
            axios.post(url, form)
                .then(response => {
                    _resetPasswordFormData();
                    resolve(response);
                })
                .catch(error => {
                    _handleFormErrors(error);
                    reject(_handleResponseError(error));
                })
        })
    }

    return {
        passswordFormData,
        _resetPasswordFormData,
        update
    }
}
