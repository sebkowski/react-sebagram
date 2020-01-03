import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { Modal, Button, Form, ModalBody } from "react-bootstrap";

const SignupForm = ({ closeModal, setLoggedIn, loggedIn }) => {
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [delay, setDelay] = useState(null);
  const [usernameValid, setUsernameValid] = useState(true);
  let history = useHistory();

  function submitsignup() {
    setIsLoading(true);
    axios({
      method: "POST",
      url: "https://insta.nextacademy.com/api/v1/users/",
      data: {
        username: `${username}`,
        email: `${email}`,
        password: `${password}`
      }
    })
      .then(response => {
        setLoggedIn(true);
        localStorage.setItem("jwt", response.data.auth_token);
        localStorage.setItem("id", response.data.user.id);
        localStorage.setItem("username", response.data.user.username);
        localStorage.setItem(
          "profile_picture",
          response.data.user.profile_picture
        );
        setIsLoading(false);
        closeModal(true);
        history.push("/Homepage");
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
        setIsLoading(false);
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

  const checkUsername = newUsername => {
    const newDelay = setTimeout(() => {
      if (newUsername.length >= 6) {
        console.log("calling api!!!");
        axios
          // make axios api call to check_name endpoint
          .get(
            // pass 'name' variable into endpoint
            `https://insta.nextacademy.com/api/v1/users/check_name?username=${newUsername}`
          )
          .then(response => {
            if (response.data.valid) {
              setUsernameValid(true);
            } else {
              setUsernameValid(false);
            }
          });
      }
    }, 300);
    setDelay(newDelay);
  };

  return (
    <>
      <ModalBody>
        <Form id="signup-form" onSubmit={submitsignup}>
          <Form.Group controlId="formBasicUserName">
            <Form.Label>
              UserName{" "}
              {username.length < 6 ? null : usernameValid ? (
                <span className="text-success">is available</span>
              ) : (
                <span className="text-danger">is not available</span>
              )}
            </Form.Label>
            <Form.Control
              value={username}
              onChange={e => {
                //   cleartimout
                clearTimeout(delay);

                checkUsername(e.target.value);
                setusername(e.target.value);
              }}
              type="UserName"
              placeholder="Enter UserName"
            />
            <Form.Text className="text-muted"></Form.Text>
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              value={email}
              onChange={e => {
                setemail(e.target.value);
              }}
              type="email"
              placeholder="Enter email"
            />
            <Form.Text className="text-muted"></Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>
              Password{" "}
              {password.length < 6 && password !== "" ? (
                <span className="text-danger">
                  must be 6 charatcers minimum
                </span>
              ) : null}
            </Form.Label>
            <Form.Control
              value={password}
              onChange={e => {
                setpassword(e.target.value);
              }}
              type="Password"
              placeholder="Password"
            />
          </Form.Group>
          <Form.Group controlId="formBasicConfirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              value={confirmpassword}
              onChange={e => {
                setconfirmpassword(e.target.value);
              }}
              type="Password"
              placeholder="Confirm Password"
            />
          </Form.Group>
        </Form>
      </ModalBody>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          Close
        </Button>
        <input
          form="signup-form"
          className="btn btn-primary"
          type="submit"
          variant="primary"
          value={isLoading ? "Signin up..." : "Signup"}
          //   onClick={submitsignup}
          //   conditional disable submit
          disabled={
            username === "" ||
            email === "" ||
            password === "" ||
            confirmpassword === "" ||
            (password !== "" && password !== confirmpassword) ||
            email.includes("@") === false ||
            password.length < 8 ||
            isLoading === true
          }
        />
      </Modal.Footer>
    </>
  );
};

export default SignupForm;
