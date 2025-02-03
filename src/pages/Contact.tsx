import { useState } from "react";
import { Layout } from "../components/Layout";
import { ValidationError } from "../types/ValidationError";
import { ThankYouMessage } from "../components/Message";
import { validateForm } from "../validation";
import { FormData } from "../types/FormData";
import "../styles/Contact.css";

export const Contact = () => {
    const [formData, setFormData] = useState<FormData>({ name: "", email: "", message: "" });
    const [errors, setErrors] = useState<ValidationError>({});
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

    const resetForm = () => {
        setFormData({ name: "", email: "", message: "" });
        setErrors({});
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const newErrors = validateForm(formData);

        if (Object.keys(newErrors).length === 0) {
            setIsSubmitted(true);
            resetForm();
        } else {
            setErrors(newErrors);
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
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                            {errors.name && <p className="error-text">{errors.name}</p>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <input
                                type="text"
                                id="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                            {errors.email && <p className="error-text">{errors.email}</p>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="message">Сообщение:</label>
                            <textarea
                                className="message"
                                id="message"
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
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
