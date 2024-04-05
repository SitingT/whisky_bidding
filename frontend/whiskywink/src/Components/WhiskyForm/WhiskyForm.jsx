import React, { useState } from "react";

function WhiskyForm() {
  const [formState, setFormState] = useState({
    SellerID: "3",
    StartPrice: "",
    BuyNowPrice: "",
    Description: "",
    StartTime: "",
    EndTime: "2024-04-15T12:00:00Z",
    Category: "",
    Availability: true,
    Condition: "Unopened",
    TastingNotes: "",
    Region: "Islay",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Clone formState to modify StartTime without affecting state directly
    const dataToSend = { ...formState };

    // Check if StartTime doesn't end with 'Z', then append ':00Z' to match the ISO format
    if (!dataToSend.StartTime.endsWith("Z")) {
      dataToSend.StartTime += ":00Z";
    }

    console.log("Data preparation timestamp:", new Date().toISOString());
    console.log("Data being sent:", JSON.stringify(dataToSend, null, 2));

    fetch("http://localhost:8000/whisky/create/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        alert("Whisky submitted successfully!");
      })
      .catch((error) => {
        console.error("Error:", error);
      })
      .finally(() => {
        console.log("Operation completed timestamp:", new Date().toISOString());
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h2>Submit Whisky</h2>
        <form onSubmit={handleSubmit}>
          <label>
            StartTime:
            <input
              name="StartTime"
              type="datetime-local"
              value={formState.StartTime}
              onChange={handleChange}
            />
          </label>
          <label>
            BuyNowPrice:
            <input
              name="BuyNowPrice"
              type="text"
              value={formState.BuyNowPrice}
              onChange={handleChange}
            />
          </label>
          <label>
            StartPrice:
            <input
              name="StartPrice"
              type="text"
              value={formState.StartPrice}
              onChange={handleChange}
            />
          </label>
          <label>
            TastingNotes:
            <input
              name="TastingNotes"
              type="text"
              value={formState.TastingNotes}
              onChange={handleChange}
            />
          </label>
          <label>
            Description:
            <input
              name="Description"
              type="text"
              value={formState.Description}
              onChange={handleChange}
            />
          </label>
          <label>
            Category:
            <input
              name="Category"
              type="text"
              value={formState.Category}
              onChange={handleChange}
            />
          </label>
          <button type="submit">Submit</button>
        </form>
      </header>
    </div>
  );
}

export default WhiskyForm;
