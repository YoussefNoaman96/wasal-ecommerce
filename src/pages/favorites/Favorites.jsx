import React, { useContext } from 'react'
import { CartContext } from '../../components/context/CartContext'
import PageTransition from '../../components/PageTransition'
import Product from '../../components/slideProducts/Product'
import '../../components/slideProducts/slideProduct.css'
import EmptyFavorites from './EmptyFavorites'

function Favorites() {
    const { favorites } = useContext(CartContext) 

  return (
    <PageTransition>
        <div className="category_products favoritesPage">
            <div className="container">
                <div className="top_slide">
                    <h2>Your Favorites : </h2>
                </div>
                {favorites.length === 0 ? (<EmptyFavorites />) : (
                    <div className="products">
                        {favorites.map((item) => (
                            <Product item={item} key={item.id}/>
                        ))}
                    </div>
                )}
            </div>
        </div>
    </PageTransition>
  )
}

export default Favorites
