import { useState } from "react"

export const useForm = (initialValues = {}) => {
    const [formData, setFormData] = useState(initialValues)

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }))
    }

    const setFormDataDirect = (newData) => {
        setFormData(newData)
    }

    const resetForm = () => {
        setFormData(initialValues)
    }

    return {
        formData,
        handleChange,
        setFormData: setFormDataDirect,
        resetForm
    }
}