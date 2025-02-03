import { ValidationError } from "./types/ValidationError";
import { FormData } from "./types/FormData";

export const validateForm = (formData: FormData): ValidationError => {
    const errors: ValidationError = {};

    if (!formData.name?.trim()) errors.name = "Имя обязательно";
    if (!formData.email?.trim()) {
        errors.email = "Email обязателен";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        errors.email = "Неверный формат email";
    }
    if (!formData.message?.trim()) errors.message = "Сообщение обязательно";

    return errors;
};
