import { PiShoppingCartSimpleBold } from "react-icons/pi";
import "../../components/emptyState.css";
import EmptyState from "../../components/EmptyState";

function EmptyCart() {
    return (
        <EmptyState
            icon={<PiShoppingCartSimpleBold />}
            title="Your Cart is Empty"
            description="Looks like you haven't added anything yet. Find something you'll love."
            buttonText="Start Shopping"
            buttonLink="/"
        />
    );
}

export default EmptyCart;