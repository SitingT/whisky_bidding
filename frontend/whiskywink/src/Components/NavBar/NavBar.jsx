import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
import logo from "../Assets/logo.png";
import cart_icon from "../Assets/cart_icon.png";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const [menu, setMenu] = useState("shop");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");
    setIsLoggedIn(!!token);
  }, []);

  const navigate = useNavigate();
  const handleLogout = () => {
    sessionStorage.removeItem("accessToken");
    alert("Log out successfully!");
    navigate("/");
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
        <Link to="/MyBid">
          <button> Bid </button>
        </Link>
        <Link to="/Sell">
          <button> Sell </button>
        </Link>
        <Link to="/Report">
          <button> Report for Admin </button>
        </Link>
        <Link to="/UserProfile">
          <button> My Profile </button>
        </Link>
        {isLoggedIn ? (
          <button onClick={handleLogout}>Log Out</button>
        ) : (
          <Link to="/login">
            <button>Signup/Login</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default NavBar;
