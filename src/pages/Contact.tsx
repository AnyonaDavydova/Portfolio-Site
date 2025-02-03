import { useState, useCallback } from "react";
import { Layout } from "../components/Layout";
import { ValidationError } from "../types/ValidationError";
import { ThankYouMessage } from "../components/Message";
import { validateForm } from "../validation";
import { FormData } from "../types/FormData";
import "../styles/Contact.css";

export const Contact = () => {
    const [formData, setFormData] = useState<FormData>({ name: "", email: "", message: "" });
    const [errors, setErrors] = useState<ValidationError>({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    const resetForm = () => {
        setFormData({ name: "", email: "", message: "" });
        setErrors({});
    };

    const handleNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setFormData((prev) => ({ ...prev, name: value }));
    }, []);

    const handleEmailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setFormData((prev) => ({ ...prev, email: value }));
    }, []);

    const handleMessageChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { value } = e.target;
        setFormData((prev) => ({ ...prev, message: value }));
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const isValid = validateForm(formData);
        if (isValid) {
            setIsSubmitted(true);
            resetForm();
        } else {
            setErrors({
                name: formData.name ? "" : "Имя обязательно",
                email: formData.email ? "" : "Email обязателен",
                message: formData.message ? "" : "Сообщение обязательно",
            });
        }
    };

    return (
        <Layout>
            <div className="contacts-container">
                <h2>Есть что сказать?</h2>
                {isSubmitted ? (
                    <ThankYouMessage onReset={() => setIsSubmitted(false)} />
                ) : (
                    <form className="contact-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Имя:</label>
                            <input
                                type="text"
                                id="name"
                                value={formData.name}
                                onChange={handleNameChange}
                            />
                            {errors.name && <p className="error-text">{errors.name}</p>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                id="email"
                                value={formData.email}
                                onChange={handleEmailChange}
                            />
                            {errors.email && <p className="error-text">{errors.email}</p>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="message">Сообщение:</label>
                            <textarea
                                className="message"
                                id="message"
                                value={formData.message}
                                onChange={handleMessageChange}
                            />
                            {errors.message && <p className="error-text">{errors.message}</p>}
                        </div>
                        <button className="sendButton" type="submit">Отправить</button>
                    </form>
                )}
            </div>
        </Layout>
    );
};
