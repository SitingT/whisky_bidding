// import React from 'react';
// import { PRODUCTS } from "./products";
// import Product from "./Product";
// import "./shop.css";


// const Shop = () => {
//     return (
//         <div className="shop">
//             <div className="shopTitle">
//                 <h1>WhiskyAAAA</h1>
//             </div>
//             <div className="products">
//                 {PRODUCTS.map((product) => (
//                     <Product key={product.id} data={product} />
//                 ))}
//             </div>x
//         </div>
//     );
// }

// export default Shop;

import React from 'react';
import Popular from '../Components/Popular/Popular';
import NewsLetter from '../Components/NewsLetter/NewsLetter';

const Shop = () => {
    return (
        <div>
            <Popular/>
            <NewsLetter/>
        </div>
    )
}

export default Shop
