// import React from 'react'


// const BuyNow = () => {
//     return (
//         <div>

//         </div>
//     )
// }

// export default BuyNow

import React, { useState } from 'react';

const Checkout = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [cvv, setCvv] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform checkout logic, such as sending data to server or processing payment
    console.log('Checkout submitted');
  };

  return (
    <div>
      <h2>Checkout</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="city">City:</label>
          <input
            type="text"
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="state">State:</label>
          <input
            type="text"
            id="state"
            value={state}
            onChange={(e) => setState(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="zipCode">Zip Code:</label>
          <input
            type="text"
            id="zipCode"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="cardNumber">Card Number:</label>
          <input
            type="text"
            id="cardNumber"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="expirationDate">Expiration Date:</label>
          <input
            type="text"
            id="expirationDate"
            value={expirationDate}
            onChange={(e) => setExpirationDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="cvv">CVV:</label>
          <input
            type="text"
            id="cvv"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            required
          />
        </div>
        <button type="submit">Place Order</button>
      </form>
    </div>
  );
};

export default Checkout;