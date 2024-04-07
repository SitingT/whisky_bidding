import React, { useState, useEffect } from "react";

import BourbonDrink from "../Components/Assets/product_1.png";
import ScotchDrink from "../Components/Assets/product_2.png";
import JapaneseDrink from "../Components/Assets/product_3.png";
import IrishDrink from "../Components/Assets/product_4.png";
// Import your image button asset
import WhiskyCard from "../Components/Cards/Cards";

const ShopCategory = ({ category }) => {
  const [whiskies, setWhiskies] = useState([]);
  const [error, setError] = useState(null);
  const baseUrl = "http://localhost:8000/whisky/active/";
  const url = category === "All" ? baseUrl : `${baseUrl}?category=${category}`;
  console.log("aaaa", url);
  useEffect(() => {
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setWhiskies(data);
        console.log("Data fetched successfully:", data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(error.toString());
      });
  }, [category]);

  const categoryImages = {
    bourbon: BourbonDrink,
    scotch: ScotchDrink,
    japanese: JapaneseDrink,
    irish: IrishDrink,
  };

  const getImageForWhisky = (whisky) => {
    console.log("whisky data:", whisky);
    let whiskyCategory =
      category !== "All" && category ? category.toLowerCase() : undefined;
    if (!whiskyCategory && whisky.Category) {
      whiskyCategory = whisky.Category.toLowerCase();
    }
    console.log("Selected category:", whiskyCategory);
    return categoryImages[whiskyCategory] || BourbonDrink;
  };

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "20px",
        padding: "20px",
        minWidth: "100vh",
        marginLeft: "100px",
      }}
    >
      {whiskies.map((whisky) => (
        <WhiskyCard
          key={whisky.ItemID}
          whisky={whisky}
          image={getImageForWhisky(whisky)}
        />
      ))}
    </div>
  );
};

export default ShopCategory;
