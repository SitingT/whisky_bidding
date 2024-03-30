import React from 'react';
import './Footer.css';
import footer_logo from '../Assets/logo_big.png';
import instagram_icon from '../Assets/instagram.png';
import pinterest_icon from '../Assets/pinterest.png';
import whatsapp_icon from '../Assets/whatsapp.png';
import facebook_icon from '../Assets/facebook.png'; // Corrected import for Facebook icon

const Footer = () => {
    return (
        <div className='footer'>
            <div className="footer-logo">
                <img src={footer_logo} alt="WhiskyWink Logo" />
                <p>WhiskyWink</p>
            </div>
            <ul className="footer-links">
                <li>Company</li>
                <li>Products</li>
                <li>Offices</li>
                <li>About</li>
                <li>Contact</li>
            </ul>
            <div className="footer-socials-icon">
                <div className="footer-icons-container">
                    <img src={instagram_icon} alt="Instagram" />
                </div>
                <div className="footer-icons-container">
                    <img src={pinterest_icon} alt="Pinterest" />
                </div>
                <div className="footer-icons-container">
                    <img src={whatsapp_icon} alt="WhatsApp" />
                </div>  
                <div className="footer-icons-container">
                    <img src={facebook_icon} alt="Facebook" />  
                </div>          
            </div>  
            <div className="footer-copyright">
                <hr />
                <p>Copyright @ 2024 - All Right Reserve</p>
            </div>
        </div>
    );
}

export default Footer;
