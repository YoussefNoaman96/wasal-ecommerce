import { Link } from "react-router-dom";
import "./emptyState.css";

function EmptyState({
    icon,
    title,
    description,
    buttonText,
    buttonLink = "/",
}) {
    return (
        <div className="empty_state">
            <div className="empty_icon">
                {icon}
            </div>

            <h2>{title}</h2>

            <p>{description}</p>

            <Link to={buttonLink} className="btn_shop">
                {buttonText}
            </Link>
        </div>
    );
}

export default EmptyState;