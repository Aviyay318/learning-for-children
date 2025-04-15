
import { useState } from "react";

export function useForm(initialValues) {
    const [formData, setFormData] = useState(initialValues);

    const setField = (name, value) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setField(name, value);
    };

    const resetForm = () => {
        setFormData(initialValues);
    };

    return {
        formData,
        setField,
        handleChange,
        resetForm,
        setFormData
    };
}
