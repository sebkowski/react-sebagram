import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

const LoginForm = ({ toggleForm, closeModal, setLoggedIn }) => {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");

  let history = useHistory();
  function submitsignin(e) {
    e.preventDefault();

    console.log(username, password);
    axios({
      method: "post",
      url: "https://insta.nextacademy.com/api/v1/login",
      data: {
        username: username,

        password: password
      }
    })
      .then(response => {
        setLoggedIn(true);
        console.log(response.data);
        localStorage.setItem("username", response.data.user.username);
        localStorage.setItem("jwt", response.data.auth_token);
        localStorage.setItem("id", response.data.user.id);
        localStorage.setItem(
          "profile_picture",
          response.data.user.profile_picture
        );
        history.push("/Homepage");

        closeModal(true);

        toast.info("Logged in successfully!", {
          position: "bottom-center",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true
        });
      })

      .catch(error => {
        console.error(error.response);

        const errorMessage = error.response.data.message.join(". ");
        toast.error(errorMessage, {
          position: "bottom-center",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true
        });
      });
  }

  return (
    <>
      <Modal.Body>
        <Form id="login-form" onSubmit={submitsignin}>
          <Form.Group controlId="formBasicUserName">
            <Form.Label>UserName</Form.Label>
            <Form.Control
              value={username}
              onChange={e => {
                setusername(e.target.value);
              }}
              type="UserName"
              placeholder="Enter UserName"
            />
            <Form.Text className="text-muted"></Form.Text>
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              value={password}
              onChange={e => {
                setpassword(e.target.value);
              }}
              type="Password"
              placeholder="Password"
            />
          </Form.Group>
        </Form>
        <div>Need an account?</div>
        <Button onClick={toggleForm}>Click here to signup</Button>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          Close
        </Button>
        <input
          form="login-form"
          className="btn btn-primary"
          type="submit"
          variant="primary"
          value="Log In"
          disabled={username === "" || password === "" || password.length < 8}
        />
      </Modal.Footer>
    </>
  );
};

export default LoginForm;
