import { IoHeartOutline } from "react-icons/io5";
import "../../components/emptyState.css";
import EmptyState from "../../components/EmptyState";

function EmptyFavorites() {
    return (
        <EmptyState
            icon={<IoHeartOutline />}
            title="Your Favorites are Empty"
            description="Save your favorite products to quickly find and shop them later."
            buttonText="Continue Shopping"
            buttonLink="/"
        />
    );
}

export default EmptyFavorites;