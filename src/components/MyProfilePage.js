import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import axios from "axios";
import Image from "react-graceful-image";

import LoadingIndicator from "./Loader";
import { toast } from "react-toastify";

const MyProfilePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [images, setImages] = useState([]);

  let history = useHistory();
  if (localStorage.jwt == null) {
    history.push("/Homepage");

    toast.info("Logged in successfully!", {
      position: "bottom-center",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true
    });
  }

  useEffect(() => {
    // performing a GET request

    axios
      .get(`https://insta.nextacademy.com/api/v1/images/me`, {
        headers: {
          Authorization: `Bearer ${localStorage.jwt}`
        }
      })
      .then(result => {
        console.log(result.data);
        setImages(result.data);
        // after data is loaded isloading const set to false
        setIsLoading(false);
      })
      .catch(error => {
        // If unsuccessful, we notify users what went wrong
        console.log("ERROR: ", error);
      });
  }, []);

  // display loader when isloading is true

  if (isLoading) {
    return <LoadingIndicator height={"150px"} divheight={"100vh"} />;
  }

  return (
    <div style={{ height: "100vh", backgroundColor: "lightblue" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "lightblue",
          padding: "20px",
          color: "white",
          fontWeight: "600"
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginBottom: "1vh",
            paddingBottom: "3vh",
            backgroundColor: "lightblue",
            padding: "10px",
            color: "white",
            fontSize: "50px",
            textAlign: "center",
            fontWeight: "700"
          }}
        >
          {localStorage.username}
        </div>
        <div
          style={{
            display: "flex",

            textAlign: "center"
          }}
        >
          <img
            style={{
              maxHeight: "200px",
              alignSelf: "self",
              width: "200px",
              backgroundColor: "lightblue",
              borderRadius: "50%",
              border: "3px solid",
              borderColor: "#D5F3FE",
              margin: "5px",
              paddingRight: "0px !important"
            }}
            src={localStorage.profile_picture}
            alt="user images"
          ></img>
        </div>
        <div>
          {images.map((url, idx) => (
            <Image
              key={idx}
              height="150px"
              width="150px"
              placeholderColor="	#87CEEB"
              src={url}
              style={{
                padding: "5px",
                objectFit: "cover",
                borderRadius: "10px"
              }}
              retry={{
                count: 8,
                delay: 4,
                accumulate: "multiply"
              }}
            />
          ))}
        </div>

        <div></div>
      </div>
    </div>
  );
};

export default MyProfilePage;
