import React from 'react'

function ProductLoading() {
  return (
    <div className="product">
        <div className="skeleton skeleton-product-img"></div>
        <div className="skeleton skeleton-product-title"></div>
        <div className="skeleton skeleton-product-stars"></div>
        <div className="skeleton skeleton-product-price"></div>
    </div>
  )
}

export default ProductLoading
