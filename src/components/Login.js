import React from "react";
import { Modal } from "react-bootstrap";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignupForm";

const Login = ({
  show,
  closeModal,
  openModal,
  loggedIn,
  setLoggedIn,
  showLogin,
  setShowLogin
}) => {
  const toggleForm = () => setShowLogin(!showLogin);
  return (
    <>
      <Modal show={show} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>{showLogin ? "Login Page" : "Signup Page"}</Modal.Title>
        </Modal.Header>
        {showLogin ? (
          <LoginForm
            toggleForm={toggleForm}
            closeModal={closeModal}
            setLoggedIn={setLoggedIn}
          />
        ) : (
          <SignUpForm
            closeModal={closeModal}
            loggedIn={loggedIn}
            setLoggedIn={setLoggedIn}
          />
        )}
      </Modal>
    </>
  );
};

export default Login;
