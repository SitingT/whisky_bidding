import React from 'react';

const Product = (props) => {
    const { productname, price, productImage } = props.data;
    return (
        <div className="product">
            <img src={productImage} alt={productname} />
            <div className="description">
                <p><b>{productname}</b></p>
                <p>${price}</p>
            </div>
            <button className="addToCartBttn"> Add To Cart</button>
        </div>
    );
}

export default Product;


