import React from "react";
import "./productDetails.css";

function ProductDetailsLoading() {
    return (
        <div className="item_details">
            <div className="container">
                <div className="imgs_item">
                    <div className="skeleton skeleton-big-img"></div>

                    <div className="sm_img">
                        <div className="skeleton skeleton-small-img"></div>
                        <div className="skeleton skeleton-small-img"></div>
                        <div className="skeleton skeleton-small-img"></div>
                        <div className="skeleton skeleton-small-img"></div>
                    </div>
                </div>

                <div className="details_item">
                    <div className="skeleton skeleton-title"></div>
                    <div className="skeleton skeleton-stars"></div>
                    <div className="skeleton skeleton-price"></div>
                    <div className="skeleton skeleton-line"></div>
                    <div className="skeleton skeleton-line"></div>
                    <div className="skeleton skeleton-description"></div>
                    <div className="skeleton skeleton-description"></div>
                    <div className="skeleton skeleton-description short"></div>
                    <div className="skeleton skeleton-stock"></div>
                    <div className="skeleton skeleton-btn"></div>
                    
                    <div className="icons icons skeleton-icons">
                        <div className="skeleton skeleton-icon"></div>
                        <div className="skeleton skeleton-icon"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetailsLoading;