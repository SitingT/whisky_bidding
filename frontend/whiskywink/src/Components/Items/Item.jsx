import React from 'react';
import './Item.css';

const Item = (props) => { // Added props parameter
    return (
        <div className='item'>
            <img src={props.image} alt={props.name} /> {/* Added alt text */}
            <p>{props.name}</p> {/* Corrected from props.image to props.name */}
            <div className="item-prices">
                <div className="item-price-new"> {/* Corrected ClassName to className */}
                    ${props.new_price.toFixed(2)} {/* Added $ sign and toFixed for formatting */}
                </div>
                <div className="item-price-old">
                    ${props.old_price.toFixed(2)} {/* Added $ sign and toFixed for formatting */}
                </div>
            </div>
        </div>
    );
}

export default Item;
