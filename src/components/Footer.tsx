import "../styles/Footer.css";
import { ISocialLink } from "../types/SocialLink";

export interface FooterProps {
    readonly socialLinks: readonly ISocialLink[];
    readonly email: string;
}

export const Footer = ({ socialLinks, email }: FooterProps) =>{
    return (
        <footer className="footer">
            <div className="social-links">
                {socialLinks.map((link) => (
                    <a
                        key={link.url}
                        href={link.url}
                        aria-label={link.label}
                        className="social-link"
                    >
                        <img src={link.iconSrc} alt={link.label} className="social-icon"/>
                    </a>
                ))}
            </div>
            <p>© 2025 Anona. Все права защищены)</p>
            <p className="footer-email">Email: {email}</p>
        </footer>
    );
};