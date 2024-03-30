import React from 'react';
import { PRODUCTS } from "./products";
import Product from "./Product";
import "./shop.css";


const Shop = () => {
    return (
        <div className="shop">
            <div className="shopTitle">
                <h1>WhiskyAAAA</h1>
            </div>
            <div className="products">
                {PRODUCTS.map((product) => (
                    <Product key={product.id} data={product} />
                ))}
            </div>x
        </div>
    );
}

export default Shop;
