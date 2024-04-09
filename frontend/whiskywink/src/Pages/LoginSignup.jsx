import React, { useState } from "react";
import "./LoginSignup.css";

const LoginSignup = () => {
  // States for signup
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // States for login
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  // Error message state
  const [errorMessage, setErrorMessage] = useState("");
  // Toggle state between login and signup view
  const [isLoginView, setIsLoginView] = useState(false);

  const handleSignup = (event) => {
    event.preventDefault();

    const userData = {
      name: name,
      email: email,
      password: password,
    };

    fetch("http://localhost:8000/auth/users/", {
      // Adjust this URL to your Django user creation endpoint
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.email) {
          // console.log("Signup successful", data);
          setErrorMessage("Signup successful");
          setIsLoginView(true); // Switch to login view on successful signup
        } else {
          setErrorMessage("Failed to sign up");
        }
      })
      .catch((error) => {
        console.error("Signup Error:", error);
        setErrorMessage("An error occurred during sign up.");
      });
  };

  const handleLogin = (event) => {
    event.preventDefault();

    const loginData = {
      email: loginEmail,
      password: loginPassword,
    };

    fetch("http://localhost:8000/auth/jwt/create/", {
      // Adjust this URL to your login endpoint
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.access) {
          // Assuming JWT returns an "access" token; adjust as necessary
          sessionStorage.setItem("accessToken", data.access);
          console.log("Login successful");
          // Redirect or manage state as necessary
        } else {
          setErrorMessage("Failed to log in");
        }
      })
      .catch((error) => {
        console.error("Login Error:", error);
        setErrorMessage("An error occurred during login.");
      });
  };

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>{isLoginView ? "Login" : "Sign Up"}</h1>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <form
          className="loginsignup-fields"
          onSubmit={isLoginView ? handleLogin : handleSignup}
        >
          {!isLoginView && (
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}
          <input
            type="email"
            placeholder="Email Address"
            value={isLoginView ? loginEmail : email}
            onChange={(e) =>
              isLoginView
                ? setLoginEmail(e.target.value)
                : setEmail(e.target.value)
            }
          />
          <input
            type="password"
            placeholder="Password"
            value={isLoginView ? loginPassword : password}
            onChange={(e) =>
              isLoginView
                ? setLoginPassword(e.target.value)
                : setPassword(e.target.value)
            }
          />
          <button type="submit">{isLoginView ? "Login" : "Continue"}</button>
        </form>
        {isLoginView ? (
          <p className="loginsignup-switch">
            Don't have an account?{" "}
            <button type="button" onClick={() => setIsLoginView(false)}>
              Sign up here
            </button>
          </p>
        ) : (
          <p className="loginsignup-switch">
            Already have an account?{" "}
            <button type="button" onClick={() => setIsLoginView(true)}>
              Login here
            </button>
          </p>
        )}
      </div>
    </div>
  );
};

export default LoginSignup;
