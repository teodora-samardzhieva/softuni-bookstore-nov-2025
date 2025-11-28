import { useState } from "react";

export default function useForm(callback, initialValues) {
    const [values, setValues] = useState(initialValues);

    const changeHandler = (e) => {
        setValues(state => ({
            ...state,
            [e.target.name]: e.target.value
        }))
    };

    const formAction = async (formData) => {
        await callback(values, formData);
    }

    const register = (fieldName) => {
        return {
            name: fieldName,
            onChange: changeHandler,
            value: values[fieldName] 
        }

        // Instead of saying:  name="email" onChange={changeHandler} value={values.email} in the form
    }

    return {
        values,
        changeHandler,
        formAction,
        register
    }
}