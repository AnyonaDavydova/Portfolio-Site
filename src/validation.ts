import { IValidationError } from "./types/ValidationError";
import { IFormData } from "./types/FormData";

export const validateForm = (formData: IFormData): IValidationError => {
    const errors: IValidationError = {};

    if (!formData.name?.trim()) errors.name = "Имя обязательно";
    if (!formData.email?.trim()) {
        errors.email = "Email обязателен";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        errors.email = "Неверный формат email";
    }
    if (!formData.message?.trim()) errors.message = "Сообщение обязательно";

    return errors;
};
