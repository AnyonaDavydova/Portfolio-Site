import { Layout } from "../components/Layout";
import  "../styles/Home.css";
import HomeImage from "../assets/Images/Home.jpg";

export const Home = () =>{
    return (
        <Layout>
            <div className="home">
                <img src={HomeImage} alt="EtoAnona" className="profile-photo"/>
                <h1>Добро пожаловать, вы на сайте ANYONы</h1>
                <p>Потыкайте разные кнопочки для знакомства со мной</p>
            </div>
        </Layout>
    );
};