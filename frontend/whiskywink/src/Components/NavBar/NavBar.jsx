import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
import logo from "../Assets/logo.png";
import cart_icon from "../Assets/cart_icon.png";

const NavBar = () => {
  const [menu, setMenu] = useState("shop");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("accessToken");
    alert("Log out successfully!");
    setIsLoggedIn(false);
  };

  return (
    <div className="navbar">
      <div className="nav_logo">
        <img src={logo} alt="Shop logo" />
        <p>WhiskyWink</p>
      </div>
      <ul className="nav-menu">
        <li
          onClick={() => {
            setMenu("shop");
          }}
        >
          <Link style={{ textDecoration: "none" }} to="/">
            Shop
          </Link>
          {menu === "shop" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("bourbon");
          }}
        >
          <Link style={{ textDecoration: "none" }} to="/bourbon">
            bourbon
          </Link>
          {menu === "bourbon" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("scotch");
          }}
        >
          <Link style={{ textDecoration: "none" }} to="/scotch">
            Scotch
          </Link>
          {menu === "scotch" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("japanese");
          }}
        >
          <Link style={{ textDecoration: "none" }} to="/japanese">
            Japanese
          </Link>
          {menu === "japanese" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("irish");
          }}
        >
          <Link style={{ textDecoration: "none" }} to="/irish">
            Irish
          </Link>
          {menu === "irish" ? <hr /> : <></>}
        </li>
      </ul>
      <div className="nav-login-cart">
        {isLoggedIn ? (
          <button onClick={handleLogout}>Log Out</button>
        ) : (
          <Link to="/login">
            <button>Signup/Login</button>
          </Link>
        )}
        <Link to="/MyBid">
          <button> Bid History </button>
        </Link>
        <Link to="/Sell">
          <button> Sell </button>
        </Link>
        <Link to="/cart">
          <img src={cart_icon} alt="" />
        </Link>

        <div className="nav-cart-count">0</div>
      </div>
    </div>
  );
};

export default NavBar;
