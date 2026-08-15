import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Product from '../../components/slideProducts/Product'
import '../../components/slideProducts/slideProduct.css'
import SlideProductLoading from '../../components/slideProducts/SlideProductLoading'
import PageTransition from '../../components/PageTransition'


function CategoryPage() {

    const { category } = useParams()

    const [categoryProducts, setCategoryProducts] = useState({
        products: [],
        total: 0
    })

    const [loading, setLoading] = useState(true)

    useEffect(() => {

        setLoading(true)

        fetch(`https://dummyjson.com/products/category/${category}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Failed to fetch products')
                }

                return res.json()
            })
            .then((data) => {
                setCategoryProducts(data)
            })
            .catch((error) => {
                console.error(error)

                setCategoryProducts({
                    products: [],
                    total: 0
                })
            })
            .finally(() => {
                setLoading(false)
            })

    }, [category])


    const categoryName = category
        ?.replace(/-/g, ' ')
        ?.replace(/\b\w/g, (letter) => letter.toUpperCase())

    const description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    
    return (
        <PageTransition key={category}>
            <div className="category_page">
                {loading ? (
                    <SlideProductLoading />
                ) : (
                    <div className="container">
                        <div className="top_slide">
                            <div className="category_title">
                                <span className="category_eyebrow">OUR COLLECTION</span>
                                <h2>{categoryName} </h2>
                                <p>{description}</p>
                                <span className="category_count">{categoryProducts.total} Products </span>
                            </div>
                        </div>

                        {categoryProducts.products.length > 0 ? (
                            <div className="products">
                                {categoryProducts.products.map((item) => (
                                    <Product
                                        item={item}
                                        key={item.id}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="empty_category">
                                <h3> No products found</h3>
                                <p>We couldn't find any products in this category.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </PageTransition>
    )
}

export default CategoryPage