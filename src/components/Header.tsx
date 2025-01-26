import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';

export const Header: React.FC = () => {
    return (
        <header className="header">
            <nav>
                <Link to="/">HOME</Link>
                <Link to="/about">ABOUT ANONA</Link>
                <Link to="/skills">ANONAS SKILLS</Link>
                <Link to="/projects">ANONAS PROJECTS</Link>
                <Link to="/contact">CONTACT ANONA</Link>
            </nav>
        </header>
    );
};
