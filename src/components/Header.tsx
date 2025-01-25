import "../styles/Header.css"
import { Link } from 'react-router-dom';


export const Header = () => {
    const handleDragStart = (event: React.DragEvent<HTMLAnchorElement>) => {
        event.preventDefault();
    };
    return (
        <header className="header">
            <nav className="navigation">
                <Link to="/" className="nav-link" onDragStart={handleDragStart}>HOME</Link>
                <Link to="/about" className="nav-link" onDragStart={handleDragStart}>ABOUT ANONA</Link>
                <Link to="/skills" className="nav-link" onDragStart={handleDragStart}>ANONAS SKILLS</Link>
                <Link to="/projects" className="nav-link" onDragStart={handleDragStart}>ANONAS PROJECTS</Link>
                <Link to="/contact" className="nav-link" onDragStart={handleDragStart}>CONTACT ANONA</Link>
            </nav>
        </header>
    );
};