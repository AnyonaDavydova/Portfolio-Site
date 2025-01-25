import { Routes, Route } from "react-router-dom"
import {Header} from "./components/Header"
import {Home} from "./pages/Home"
import {About} from "./pages/About"
import {Contact} from "./pages/Contact"
import {Projects} from "./pages/Projects"
import {Skills} from "./pages/Skills"
import { Footer } from "./components/Footer"
import { socialLinks } from "./data/SocialLinks"
export function App() {


    return (
        <div>
            <Header/>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/about" element={<About/>} />
                <Route path="/skills" element={<Skills/>} />
                <Route path="/projects" element={<Projects/>} />
                <Route path="/contact" element={<Contact/>} />
            </Routes>
            <Footer socialLinks={socialLinks} email ="echpochmak78@gmail.com"/>
        </div>

    )
}