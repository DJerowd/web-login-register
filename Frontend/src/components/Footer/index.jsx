import { FaLinkedin, FaSquareGithub, FaSquareYoutube  } from "react-icons/fa6";

import '../../Styles/components/footer.css';

function Footer(){
    return (
        <footer className='footer'>

            <div className="contacts">
                <a href="https://www.linkedin.com/in/djerowd-moreschi/" title='Meu perfil no Linkedin' target="_blank" rel="noopener noreferrer">
                    <FaLinkedin alt='Linkedin'/>
                    <span>Linkedin</span>
                </a>
                <a href="https://github.com/DJerowd/my-garage" title='Meu perfil no Github' target="_blank" rel="noopener noreferrer">
                    <FaSquareGithub alt='Github'/>
                    <span>Github</span>
                </a>
                <a href="https://www.youtube.com/@DJ_Moreschi" title='Meu canal no Youtube' target="_blank" rel="noopener noreferrer">
                    <FaSquareYoutube alt='Youtube'/>
                    <span>Youtube</span>
                </a>
            </div>

            <div>
                <p>All Rights Reserved to DJerowd</p>
                <p>Copyright ©2025</p>
            </div>
            
        </footer>
    )
}

export default Footer;