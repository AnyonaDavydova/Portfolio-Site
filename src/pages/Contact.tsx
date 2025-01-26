import React from 'react';
import '../styles/Contact.css';

export const Contact: React.FC = () => {
    const contactLinks = [
        { href: "https://github.com/AnyonaDavydova", label: "GitHub", className: "github" },
        { href: "https://t.me/aaaanyonaaaa", label: "Telegram", className: "telegram" },
        { href: "mailto:echpochmak78@gmail.com", label: "Email", className: "email" },
        { href: "https://vk.com/lifeisnotsoyahoooo", label: "ВКонтакте", className: "vk" },
    ];

    return (
        <div className="contact">
            <div className="grid-container">
                {contactLinks.map(({ href, label, className }) => (
                    <div className={`contact-item ${className}`} key={href}>
                        <a href={href}>{label}</a>
                    </div>
                ))}
            </div>
        </div>
    );
};
