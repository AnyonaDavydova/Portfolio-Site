import React from 'react';
import '../styles/Contact.css';

const Contact: React.FC = () => {
    return (
        <div className="contact">
            <div className="grid-container">
                <div className="contact-item github">
                    <a href="https://github.com/AnyonaDavydova">
                        GitHub
                    </a>
                </div>
                <div className="contact-item telegram">
                    <a href="https://t.me/aaaanyonaaaa">
                        Telegram
                    </a>
                </div>
                <div className="contact-item email">
                    <a href="mailto:echpochmak78@gmail.com">
                        Email
                    </a>
                </div>
                <div className="contact-item vk">
                    <a href="https://vk.com/lifeisnotsoyahoooo">
                        ВКонтакте
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Contact;
