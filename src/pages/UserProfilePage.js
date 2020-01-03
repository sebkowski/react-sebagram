import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";

import UserImages from "../containers/UserImages";
import LoadingIndicator from "../components/Loader";

const UserProfilePage = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [userinfo, setuserinfo] = useState();
  useEffect(() => {
    // performing a GET request
    axios
      .get(`https://insta.nextacademy.com/api/v1/users/${id}`)
      .then(result => {
        // setUsers(result.data);
        setuserinfo(result.data);
        // after data is loaded isloading const set to false
        setIsLoading(false);
      })
      .catch(error => {
        // If unsuccessful, we notify users what went wrong
        console.log("ERROR: ", error);
      });
  }, [id]);

  // display loader when isloading is true

  if (isLoading) {
    return <LoadingIndicator height={"150px"} divheight={"100vh"} />;
  }

  return (
    <div style={{ height: "100vh", backgroundColor: "lightblue" }}>
      <div
        key={userinfo.id}
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
          {userinfo.username}
        </div>
        <div
          style={{
            display: "flex",

            textAlign: "center"
          }}
        >
          {userinfo.statusText}
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
            src={userinfo.profileImage}
            alt="user images"
          ></img>
        </div>

        <div>
          <UserImages userID={id} userimgheight={"160px"} />
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
