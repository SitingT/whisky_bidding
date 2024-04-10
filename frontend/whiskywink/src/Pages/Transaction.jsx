// import React from 'react'


// const Transaction = () => {
//     return (
//         <div>

//         </div>
//     )
// }

// export default Transaction
import React, { useState } from 'react';
import axios from 'axios';

const PurchaseTransactionPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [creditCard, setCreditCard] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make an API call to process the payment
      const response = await axios.post('/api/purchase', {
        name,
        email,
        address,
        creditCard,
      });

      // Handle the response from the server
      if (response.data.success) {
        // Payment successful, redirect to a confirmation page or show a success message
        alert('Payment successful!');
      } else {
        // Payment failed, display an error message
        alert('Payment failed. Please try again.');
      }
    } catch (error) {
      console.error('Error processing payment:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <div>
      <h2>Purchase Transaction</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
          <label htmlFor="creditCard">Credit Card Number:</label>
          <input
            type="text"
            id="creditCard"
            value={creditCard}
            onChange={(e) => setCreditCard(e.target.value)}
            required
          />
        </div>
        <button type="submit">Complete Purchase</button>
      </form>
    </div>
  );
};

export default PurchaseTransactionPage;