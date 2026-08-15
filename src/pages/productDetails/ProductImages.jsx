import React from 'react'

function ProductImages({ product, bigImage, setBigImage }) {
    return (
        <div className="imgs_item">
            <div className="big_img">
                <img id='big_img' src={bigImage} alt={product.title} width="450" height="450"
                    decoding="async"
                />
            </div>
            <div className="sm_img">
                {product.images.slice(0, 3).map((img, index) => (
                    <div className="sm_div_img" key={img}>
                        <img src={img} alt={`${product.title} view ${index + 1}`} 
                        width="90" height="90" decoding="async" fetchPriority="high" loading="lazy"
                        onClick={() => setBigImage(img)} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ProductImages
