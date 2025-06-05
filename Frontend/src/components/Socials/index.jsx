import '../../Styles/components/socials.css';

export default function Socials({ link, label, socialMedia, logo }){

    return (
        <li className="icon-content">
            <a href={link} target="_blank" rel="noopener noreferrer" aria-label={label} data-social={socialMedia}>
                <div className="filled"></div>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className={`bi bi-${socialMedia}`}
                    viewBox="0 0 16 16"
                    xmlSpace="preserve"
                >
                    <path
                        d={logo}
                        fill="currentColor"
                    ></path>
                </svg>
            </a>
            <div className="tooltip">{label}</div>
        </li>
    )
};