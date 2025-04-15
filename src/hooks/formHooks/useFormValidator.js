import { useState, useEffect } from "react";

export function useFormValidator(formData, rules) {
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [isValid, setIsValid] = useState(false);

    const validateField = (name, value) => {
        const rule = rules[name];
        if (!rule) return;

        const error = rule(value, formData);
        setErrors((prev) => ({ ...prev, [name]: error }));
        setTouched((prev) => ({ ...prev, [name]: true }));
    };

    const validateAll = () => {
        const newErrors = {};
        const newTouched = {};

        Object.entries(rules).forEach(([field, rule]) => {
            const error = rule(formData[field], formData);
            if (error) newErrors[field] = error;
            newTouched[field] = true;
        });

        setErrors(newErrors);
        setTouched(newTouched);

        return newErrors;
    };

    useEffect(() => {
        const hasErrors = Object.values(errors).some(Boolean);
        setIsValid(!hasErrors);
    }, [errors]);

    const shouldDisable =
        Object.values(formData).some((value) => value === "") ||
        Object.values(errors).some(Boolean);

    return {
        errors,
        isValid,
        validateField,
        validateAll,
        touched,
        setErrors,
        shouldDisable,
    };
}
