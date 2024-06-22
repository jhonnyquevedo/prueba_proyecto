import './Footer.css';
import { FaSquareFacebook } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

function Footer() {
    return (
        <footer className="footer">
            <div className='textoFooter'>
                <p>Mi Empresa. Todos los derechos reservados</p>
            </div>
            <div className='iconosFooter'>
                <FaSquareFacebook />
                <FaInstagram />
                <FaYoutube />
                <FaLinkedin />
            </div>
        </footer>
    );
}

export default Footer;