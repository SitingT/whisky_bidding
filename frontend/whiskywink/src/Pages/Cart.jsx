// import React from 'react'


// const Cart = () => {
//     return (
//         <div>

//         </div>
//     )
// }

// export default Cart

import React, { useState } from 'react';

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'bourbon', price: 50, quantity: 1 },
    { id: 2, name: 'Scotch', price: 75, quantity: 2 },
    { id: 3, name: 'Japanese', price: 100, quantity: 1 },
  ]);

  const handleQuantityChange = (itemId, quantity) => {
    const updatedCartItems = cartItems.map((item) =>
      item.id === itemId ? { ...item, quantity } : item
    );
    setCartItems(updatedCartItems);
  };

  const handleRemoveItem = (itemId) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCartItems);
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div>
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>${item.price}</td>
                  <td>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                    />
                  </td>
                  <td>${item.price * item.quantity}</td>
                  <td>
                    <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p>Total: ${calculateTotal()}</p>
          <button>Proceed to Checkout</button>
        </>
      )}
    </div>
  );
};

export default Cart;