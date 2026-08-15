import React, { useContext } from 'react'
import { BsCart4 } from 'react-icons/bs'
import { FaCheck, FaStar, FaStarHalfAlt } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { CartContext } from '../../components/context/CartContext'
import toast from 'react-hot-toast'
import { IoHeartOutline, IoHeart, IoHeartDislikeOutline, IoShareSocialOutline } from 'react-icons/io5'


function ProductInfo({ product }) {
    const { cartItems, addToCart, favorites, addToFavorites, removeFromFavorites } = useContext(CartContext);

    const isInCart = cartItems.some(item => item.id === product.id);
    const isInFavorites = favorites.some(item => item.id === product.id);

    const navigate = useNavigate();

    const handleAddToCart = () => {
        if (isInCart) return;

        const success = addToCart(product);

        if (!success) {
            toast.error("Please login to add products to your cart.");
            return;
        }

        toast.success(
            <div className='toast-message'>
                <img src={product.images[0]} alt={product.title} className='toast-image' />

                <div className="toast-content">
                    <strong>{product.title}</strong>
                    added to cart successfully!

                    <div>
                        <button className='btn' onClick={() => navigate('/cart')}>View Cart</button>
                    </div>
                </div>
            </div>,
            {
                duration: 3500,
                className: 'cart-toast'
            }
        );
    }

    const handleAddToFavorites = () => {
        if (isInFavorites) {
            removeFromFavorites(product.id);

            toast.success(
                <div>
                    <strong>{product.title}</strong>
                    <p>Removed from favorites.</p>
                </div>,
                {
                    duration: 2000,
                    icon: <IoHeartDislikeOutline size={20} color="#e63946" />,
                }
            );

            return;
        }

        const success = addToFavorites(product);

        if (!success) {
            toast.error("Please login to add products to your favorites.");
            return;
        }

        toast.success(
            <div>
                <strong>{product.title}</strong>
                <p>Added to favorites.</p>
            </div>,
            {
                duration: 2000,
                icon: <IoHeart size={20} color="#e63946" />,
            }
        );
    };

    //handle share
    const handleShare = async () => {
        const productUrl = `${window.location.origin}/products/${product.id}`;

        try {
            if (navigator.share) {
                await navigator.share({
                    title: product.title,
                    text: "Check out this product!",
                    url: productUrl,
                });
            } else {
                await navigator.clipboard.writeText(productUrl);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="details_item">
            <h1 className='name'>{product.title}</h1>
            <div className="stars">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStarHalfAlt />
            </div>
            <p className='price'>$ {product.price}</p>
            <h5>Availability: <span>{product.availabilityStatus}</span></h5>
            <h5>Brand: <span>{product.brand}</span></h5>
            <p className='description'> {product.description}</p>
            <h5 className='stock'><span>Hurry Up! Only <span>{product.stock}</span> products left in stock</span> </h5>
            <button className={`btn ${isInCart ? 'in-cart' : ''}`} onClick={handleAddToCart} disabled={isInCart}>
                {isInCart ? (<>In Cart <FaCheck /></>) : (<>Add To Cart <BsCart4 /></>)}
            </button>

            <div className="icons">
                <span
                    className={`favorite-btn ${isInFavorites ? "active" : ""}`} onClick={handleAddToFavorites}>
                    {isInFavorites ? <IoHeart /> : <IoHeartOutline />}
                </span>

                <span onClick={handleShare}><IoShareSocialOutline /></span>
            </div>
        </div>
    )
}

export default ProductInfo;
