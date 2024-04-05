import React, { useState } from "react";

function WhiskyForm() {
  const [formState, setFormState] = useState({
    SellerID: "3",
    StartPrice: "55",
    BuyNowPrice: "30",
    Description: "Rich and smooth, with a complex character.",
    StartTime: "2024-04-10T12:00:00Z",
    EndTime: "2024-04-20T12:00:00Z",
    Category: "Single Malt",
    Availability: true,
    Condition: "Unopened",
    TastingNotes: "Notes of vanilla, oak, and fruit.",
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

    fetch("http://localhost:8000/whisky/create/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formState),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        alert("Whisky submitted successfully!");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h2>Submit Whisky</h2>
        <form onSubmit={handleSubmit}>
          {/* For simplicity, only showing a few fields. Add others as needed. */}
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
          {/* Add other fields here */}
          <button type="submit">Submit</button>
        </form>
      </header>
    </div>
  );
}

export default WhiskyForm;
