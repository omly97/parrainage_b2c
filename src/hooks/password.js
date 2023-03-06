import axios from "@/plugins/axios"
import {
    _createFormData,
    _handleResponseError,
    _handleFormErrors
} from '@/helpers'

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

    const _resetPasswordFormData = () => {
        passswordFormData.fields = {};
        passswordFormData.errors = {};
    }

    const update = (userId, resetPassword) => {
        let form = _createFormData(passswordFormData.fields);
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
                    _handleFormErrors(passswordFormData, error);
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
