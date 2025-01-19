import React from 'react';
import '../styles/Home.css';
import HomeImage from "../assets/Images/Home.jpg";


const Home: React.FC = () => {
    return (
        <div className="home">
            <img src={HomeImage} alt="EtoAnona" className="profile-photo"/>
            <h1>Добро пожаловать, вы на сайте ANYONы</h1>
            <p>Потыкайте разные кнопочки для знакомства со мной</p>
        </div>
    );
};

export default Home;
