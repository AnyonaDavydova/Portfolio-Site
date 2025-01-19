import React from 'react';
import '../styles/Contact.css';


const Contact: React.FC = () => {
    return (
        <div className="contact">
            <h2>Связь со мной</h2>
            <div className="social-links">
                <a href="https://github.com/AnyonaDavydova" target="_blank" rel="noopener noreferrer">GitHub</a>
                <a href="https://t.me/aaaanyonaaaa" target="_blank" rel="noopener noreferrer">Telegram</a>
            </div>
        </div>
    );
};

export default Contact;
