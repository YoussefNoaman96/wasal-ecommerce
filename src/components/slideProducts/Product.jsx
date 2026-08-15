import React, { useContext } from 'react'
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from "../context/CartContext";
import { FaCheck } from "react-icons/fa";
import toast from 'react-hot-toast';
import { IoHeartDislikeOutline, IoShareSocialOutline, IoHeartOutline, IoHeart } from "react-icons/io5";


function Product({ item }) {
  const { cartItems, addToCart, favorites, addToFavorites, removeFromFavorites } = useContext(CartContext)
  const isInCart = cartItems.some(i => i.id === item.id);
  const isInFavorites = favorites.some(i => i.id === item.id);

  const navigate = useNavigate();

  const handleAddToCart = () => {
    if (isInCart) return;

    const success = addToCart(item);

    if (!success) {
      toast.error("Please login to add products to your cart.");
      return;
    }

    toast.success(
      <div className='toast-message'>
        <img src={item.images?.[0]} alt={item.title} className='toast-image'
          width="60" height="60" decoding="async" />

        <div className="toast-content">
          <strong>{item.title}</strong>
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

  // Handle adding to favorites
  const handleAddToFavorites = () => {
    if (isInFavorites) {
      removeFromFavorites(item.id);

      toast.success(
        <div>
          <strong>{item.title}</strong>
          <p>Removed from favorites.</p>
        </div>,
        {
          duration: 2000,
          icon: <IoHeartDislikeOutline size={20} color="#e63946" />,
        }
      );

      return;
    }

    const success = addToFavorites(item);

    if (!success) {
      toast.error("Please login to add products to your favorites.");
      return;
    }

    toast.success(
      <div>
        <strong>{item.title}</strong>
        <p>Added to favorites.</p>
      </div>,
      {
        duration: 2000,
        icon: <IoHeart size={20} color="#e63946" />,
      }
    );
  }

  //handle share
  const handleShare = async () => {
    const productUrl = `${window.location.origin}/products/${item.id}`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: item.title,
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
    <div className={`product ${isInCart ? 'in-cart' : ''}`}>
      <Link to={`/products/${item.id}`}>

        <span className='status_cart'><FaCheck /> in cart </span>
        <div className="img_product">
          <img src={item.images?.[0]} alt={item.title} width="300" height="300"
            loading="lazy" decoding="async" />
        </div>
        <p className="name_product">{item.title}</p>
        <div className="stars">
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStarHalfAlt />
        </div>
        <p className="price"><span>$ {item.price}</span></p>
      </Link>
      <div className="icons">
        <span className='btn_addtocart' onClick={handleAddToCart}>{isInCart ? <FaCheck /> : <HiOutlineShoppingBag />}</span>
        <span className={`favorite-btn ${isInFavorites ? "active" : ""}`} onClick={handleAddToFavorites}>{isInFavorites ? <IoHeart /> : <IoHeartOutline />}</span>
        <span onClick={handleShare}><IoShareSocialOutline /></span>
      </div>
    </div>
  )
}

export default Product
