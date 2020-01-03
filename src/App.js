import React, { useState } from "react";
import "./App.css";
import Homepage from "./pages/Homepage.js";
import "bootstrap/dist/css/bootstrap.min.css";
import { Switch, Route } from "react-router-dom";
import UserProfilePage from "./pages/UserProfilePage";
import Navbar from "./components/Navbar.js";
import { ToastContainer } from "react-toastify";
import MyProfilePage from "./components/MyProfilePage";
import UploadPage from "./pages/UploadPage";

function App() {
  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem("jwt") !== null
  );
  console.log(loggedIn);
  return (
    <>
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnVisibilityChange
        draggable
        pauseOnHover
      />
      <Navbar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />

      <Switch>
        <Route exact path="/Homepage">
          <Homepage />
        </Route>
        <Route exact path="/user/:id">
          <UserProfilePage />
        </Route>
        <Route exact path="/profile" component={MyProfilePage}>
          <MyProfilePage />
        </Route>
        <Route exact path="/uploadPage">
          <UploadPage />
        </Route>
      </Switch>
    </>
  );
}

export default App;
