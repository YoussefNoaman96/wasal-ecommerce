import React from 'react'
import ProductLoading from './ProductLoading'

function SlideProductLoading() {

  return (
    <div className="slide_products slide">
      <div className="container">

        <div className="top_slide">
          <div className="skeleton title"></div>
          <div className="skeleton description"></div>
        </div>

        <div className="products_loading">
          {Array.from({ length: 5 }).map((_, index) => (
            <div className="products_loading_item" key={index}>
              <ProductLoading />
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default SlideProductLoading