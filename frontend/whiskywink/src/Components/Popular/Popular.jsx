import React from 'react';
import './Popular.css';
import data_product from '../Assets/data';
import Item from '../Items/Item';

const Popular = () => {
  return (
    <div className='popular'>
      <h1> POPULAR WHISKY</h1>
      <hr />
      <div className='popular-items'>
        {data_product.map((item,i) => {
                return <Item key={i} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>;

        //   return <Item key={i} id={id.item} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>;
        })}
      </div>
    </div>
  );
}

export default Popular;
