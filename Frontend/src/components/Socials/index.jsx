import PropTypes from 'prop-types';
import '../../Styles/components/socials.css';

export default function Socials({ link, label, socialMedia, logo }){

    return (
        <li className="icon-content">
            <a href={link} target="_blank" rel="noopener noreferrer" aria-label={label}>
                <div className="filled"></div>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`bi bi-${socialMedia}`}
                    viewBox="0 0 16 16"
                    xmlSpace="preserve"
                >
                    <path
                        d={logo}
                    ></path>
                </svg>
            </a>
            <div className="tooltip">{label}</div>
        </li>
    );
};

Socials.propTypes = {
    link: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    socialMedia: PropTypes.string.isRequired,
    logo: PropTypes.string.isRequired
}; 