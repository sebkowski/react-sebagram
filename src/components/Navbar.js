import React, { useState } from "react";
import { toast } from "react-toastify";
import instagramlogo from "./instagram.png";
import { Link, useHistory } from "react-router-dom";
import Login from "./Login";
import uploadlogo from "./uploadlogo.png";

const Navbar = ({ loggedIn, setLoggedIn }) => {
  let history = useHistory();
  console.log(localStorage.getItem("username"));
  const [login, setlogin] = useState(false);
  const [showLogin, setShowLogin] = useState(true);

  // const [signup, setsignup] = useState(false);

  const closeModal = () => {
    setlogin(false);
  };

  const openModal = () => {
    setlogin(true);
  };

  return (
    <>
      {login && (
        <Login
          loggedIn={loggedIn}
          setLoggedIn={setLoggedIn}
          show={login}
          closeModal={closeModal}
          openModal={openModal}
          showLogin={showLogin}
          setShowLogin={setShowLogin}
        />
      )}
      <nav
        style={{
          backgroundColor: "	#87CEEB",

          color: "black",
          fontWeight: "400",
          margin: "0",
          justifyContent: "spacebetween"
        }}
      >
        <span style={{ display: "inlineBlock", verticalAlign: "middle" }}>
          <Link to="/Homepage">
            <img
              src={instagramlogo}
              style={{ height: "35px", margin: "5px", filter: "invert(100%)" }}
              alt="instagramlogo"
            />
          </Link>
        </span>
        <Link to="/Homepage">
          <span style={{ color: "white" }}>Nextragram</span>
        </Link>
        <input
          type="search"
          placeholder="Type username"
          style={{
            display: "inlineBlock",
            marginLeft: "20px",
            borderRadius: "7px",
            padding: "0",
            border: "2px solid lightblue",
            height: "35px",
            textAlign: "center",
            justifyContent: "spacebetween"
          }}
        ></input>
        <button
          type="submit"
          className="searchButton"
          style={{
            display: "inlineBlock",
            borderRadius: "7px",
            padding: "5",
            border: "2px solid lightblue",
            height: "35px",
            backgroundColor: "white",
            marginLeft: "15"
          }}
        >
          Search
        </button>
        <span
          style={{
            display: "inlineBlock",
            marginLeft: "15px",
            cursor: "pointer",
            textAlign: "center",
            verticalAlign: "center",

            color: "white"
          }}
        >
          Users
        </span>

        {loggedIn ? null : (
          <span
            onClick={() => {
              setlogin(true);
              setShowLogin(false);
            }}
            style={{
              display: "inlineBlock",
              cursor: "pointer",
              textAlign: "center",
              verticalAlign: "center",
              marginLeft: "15px",
              marginRight: "auto !important",
              color: "white"
            }}
          >
            Sign Up
          </span>
        )}
        {loggedIn ? null : (
          <span
            onClick={() => {
              setlogin(true);
              setShowLogin(true);
            }}
            style={{
              display: "inlineBlock",
              cursor: "pointer",
              textAlign: "center",
              verticalAlign: "center",
              marginLeft: "15px",
              marginRight: "auto !important",
              color: "white"
            }}
          >
            Log In
          </span>
        )}
        {loggedIn ? (
          <span
            onClick={() => {
              toast.info("Successfully logged out!", {
                position: "bottom-center",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
              });
              localStorage.removeItem("jwt");
              setLoggedIn(false);
              history.push("/Homepage");
            }}
            style={{
              display: "inlineBlock",
              cursor: "pointer",
              textAlign: "center",
              verticalAlign: "center",
              marginLeft: "15px",
              marginRight: "auto !important",
              color: "white"
            }}
          >
            Log Out
          </span>
        ) : null}
        {loggedIn ? (
          <span
            onClick={() => {
              history.push("/Profile");
              console.log("clicked");
            }}
            style={{
              display: "inlineBlock",
              cursor: "pointer",
              textAlign: "center",
              verticalAlign: "center",
              marginLeft: "15px",
              marginRight: "auto !important",
              color: "white"
            }}
          >
            {localStorage.getItem("username")}
            <img
              alt="Profilepicture"
              onClick={() => {
                history.push("/Profile");
                console.log("clicked");
              }}
              src={localStorage.getItem("profile_picture")}
              style={{
                width: "30px",
                height: "30px",
                borderRadius: "50%",
                marginLeft: "8px",
                border: "2px solid",
                borderColor: "#D5F3FE"
              }}
            ></img>
          </span>
        ) : null}
        {loggedIn ? (
          <span>
            <img
              alt="uploadlogo"
              onClick={() => {
                history.push("/UploadPage");
                console.log("clicked");
              }}
              src={uploadlogo}
              style={{
                cursor: "pointer",
                width: "28px",
                height: "22px",
                borderRadius: "0%",
                marginLeft: "4px"
              }}
            ></img>
          </span>
        ) : null}
      </nav>
    </>
  );
};

export default Navbar;
