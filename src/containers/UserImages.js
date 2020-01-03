import React, { useState, useEffect } from "react";
import axios from "axios";

import LoadingIndicator from "../components/Loader";

import Image from "react-graceful-image";

const UserImages = ({ userID, userimgheight, userimgalign }) => {
  const [isLoadingimg, setIsLoadingimg] = useState(true);
  const [images, setimages] = useState([]);
  useEffect(() => {
    // performing a GET request
    axios
      .get(`https://insta.nextacademy.com/api/v1/images?userId=${userID}`)
      .then(result => {
        setimages(result.data);
        setIsLoadingimg(false);
      })
      .catch(error => {
        console.log("ERROR: ", error);
      });
  }, [userID]);
  if (isLoadingimg) {
    return <LoadingIndicator height={"100px"} />;
  }

  return (
    <>
      {images.map((url, idx) => (
        <Image
          key={`${url}${idx}`}
          height={userimgheight}
          width={userimgheight}
          placeholderColor="	#87CEEB"
          src={url}
          style={{ padding: "5px", objectFit: "cover", borderRadius: "10px" }}
          retry={{
            count: 8,
            delay: 4,
            accumulate: "multiply"
          }}
        />
      ))}
    </>
  );
};

export default UserImages;
