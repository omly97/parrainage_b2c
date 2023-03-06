export const _createFormData = (fieldsObj) => {
    const form = new FormData();
    Object.keys(fieldsObj).forEach((key) => {
        if (fieldsObj[key] != null)
            form.append(key, fieldsObj[key]);
    });
    return form;
}


export const _handleResponseError = (error) => {
    return {
        code: error.code,
        message: error.message,
        serverMessage: error.serverResponse ? error.responseData.message : "Something went wrong!",
    }
}


export const _handleFormErrors = (dataObject, error) => {
    if (error.serverResponse == true && error.responseData.errors != undefined) {
        // Clean old errors
        Object.keys(dataObject.errors).forEach((key) => {
            dataObject.errors[key] = ""
        })
        // Add new errors
        Object.keys(error.responseData.errors).forEach((key) => {
            dataObject.errors[key] = error.responseData.errors[key][0];
        });
    }
}
