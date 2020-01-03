import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import axios from "axios";

import UserImages from "../containers/UserImages";
import LoadingIndicator from "../components/Loader";
const Homepage = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // performing a GET request
    axios
      .get("https://insta.nextacademy.com/api/v1/users")
      .then(result => {
        setUsers(result.data);
        // after data is loaded isloading const set to false
        setIsLoading(false);
      })
      .catch(error => {
        // If unsuccessful, we notify users what went wrong
        console.log("ERROR: ", error);
      });
  }, []);

  if (isLoading) {
    return <LoadingIndicator height={"150px"} />;
  }

  return (
    <div>
      {users.map(user => (
        <div
          key={user.id}
          style={{
            display: "flex",
            flexDirection: "row",
            marginBottom: "2vh",
            paddingBottom: "3vh",
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
              textAlign: "center",
              paddingRight: "1.5em"
            }}
          >
            <Link to={`/user/${user.id}`}>{user.username}</Link>
            {user.statusText}
            <img
              style={{
                alignItems: "center",
                maxHeight: "100px",

                width: "100px",
                backgroundColor: "lightblue",
                borderRadius: "50%",
                border: "3px solid",
                borderColor: "#D5F3FE",
                margin: "5px"
              }}
              src={user.profileImage}
              alt="user images"
            ></img>
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              flexDirection: "row",
              padding: "1px"
            }}
          >
            <UserImages userID={user.id} userimgheight={"100px"} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Homepage;
