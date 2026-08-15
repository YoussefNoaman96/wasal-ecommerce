import React from 'react'
import { Link } from 'react-router-dom'
import { useCategory } from '../../components/context/CategoryContext'
import './Categories.css'
import CategoryLoading from '../CategoryPage/CategoryLoading'
import '../productDetails/productDetails.css'

const categoryImages = {
    beauty: "/categories/web/beauty.webp",
    fragrances: "/categories/web/fragrances.webp",
    furniture: "/categories/web/furniture.webp",
    groceries: "/categories/web/groceries.webp",
    "home-decoration": "/categories/web/home-decoration.webp",
    "kitchen-accessories": "/categories/web/kitchen-accessories.webp",
    laptops: "/categories/web/laptops.webp",
    "mens-shirts": "/categories/web/mens-shirts.webp",
    "mens-shoes": "/categories/web/mens-shoes.webp",
    "mens-watches": "/categories/web/mens-watches.webp",
    "mobile-accessories": "/categories/web/mobile-accessories.webp",
    motorcycle: "/categories/web/motorcycle.webp",
    "skin-care": "/categories/web/skin-care.webp",
    smartphones: "/categories/web/smartphones.webp",
    "sports-accessories": "/categories/web/sports-accessories.webp",
    sunglasses: "/categories/web/sunglasses.webp",
    tablets: "/categories/web/tablets.webp",
    tops: "/categories/web/tops.webp",
    vehicle: "/categories/web/vehicle.webp",
    "womens-bags": "/categories/web/womens-bags.webp",
    "womens-dresses": "/categories/web/womens-dresses.webp",
    "womens-jewellery": "/categories/web/womens-jewellery.webp",
    "womens-shoes": "/categories/web/womens-shoes.webp",
    "womens-watches": "/categories/web/womens-watches.webp"
};

function Categories() {
    const { categories, loading } = useCategory();

    return (
        <section className="categories_page">
            <div className="categories_hero">
                <div className="categories_hero_content">
                    <span className="categories_eyebrow">EXPLORE OUR COLLECTION</span>
                    <h1>Find What <br /><span>Defines You.</span> </h1>
                    <p>Explore our carefully selected collections and discover something made for you.</p>
                </div>

                <div className="categories_hero_number">
                    <span>01</span>
                    <div></div>
                    <span>Categories</span>
                </div>
            </div>

            <div className="categories_container">
                <div className="categories_heading">
                    <div>
                        <span>OUR COLLECTION</span>
                        <h2>Shop by Category</h2>
                    </div>
                    <p>Discover our carefully curated categories</p>
                </div>

                <div className="categories_grid">
                    {loading ? Array.from({ length: 8 }).map((_, index) => (
                            <CategoryLoading key={index} /> ))
                        : categories.map((category) => (
                            <Link to={`/category/${category.slug}`} key={category.slug} className="category_card">
                                <img src={categoryImages[category.slug]} alt={category.name} loading="lazy" decoding="async"/>

                                <div className="category_card_overlay"></div>

                                <div className="category_card_content">
                                    <div className="category_info">
                                        <h3>{category.name}</h3>
                                        <span className="explore_category">{category.count} products</span>
                                    </div>
                                </div>
                            </Link>
                        ))
                    }
                </div>
            </div>
        </section>
    )
}

export default Categories