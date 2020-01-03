import React, { useState } from "react";
import { Button, Form, Card, FormGroup } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";

const UploadPage = () => {
  const [imageFile, setImageFile] = useState(null);
  // const [HandleFile, setHandleFile] = useState();

  const [message, setMessage] = useState("");
  const [previewImage, setPreviewImage] = useState(null);

  const SubmitImage = e => {
    e.preventDefault();
    let JWT = localStorage.getItem("jwt");
    let formData = new FormData();

    formData.append("image", imageFile);

    console.log(formData);

    axios
      .post("https://insta.nextacademy.com/api/v1/images/", formData, {
        headers: { Authorization: `Bearer ${JWT}` }
      })
      .then(response => {
        if (response.data.success) {
          toast.info("Image uploaded!", {
            position: "bottom-center",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true
          });
          setImageFile(null);
          setPreviewImage(null);
          setMessage("Image Uploaded Successfully!");
        }
      })
      .catch(error => {
        console.log(error.response);
      });
  };
  return (
    <div
      style={{
        backgroundColor: "lightblue",
        height: "100vh",
        paddingTop: "30px",

        display: "flex"
      }}
    >
      <Card
        style={{
          width: "50%",
          maxHeight: "50%",
          marginLeft: "27%"
        }}
      >
        <Form onSubmit={SubmitImage}>
          <FormGroup>
            {/* <CustomInput
              type="file"
              id="exampleCustomFileBrowser"
              name="image-file"
              label="choose an image file"
              onChange={e => {
                setImageFile(e.target.files[0]);
                setPreviewImage(URL.createObjectURL(e.target.files[0]));
              }}
            /> */}

            <input
              style={{ width: "0%" }}
              type="file"
              className="custom-file-input"
              name="image-file"
              multiple={false}
              onChange={e => {
                setImageFile(e.target.files[0]);
                setPreviewImage(URL.createObjectURL(e.target.files[0]));
              }}
            />
          </FormGroup>
        </Form>
        <div className="card">
          {previewImage ? (
            <img src={previewImage} alt="previewimg" width="50%" height="50%" />
          ) : (
            <h3 className="text-center">
              {message ? message : "Live Preview"}
            </h3>
          )}
        </div>
        <Button type="submit" color="primary" style={{ marginTop: "auto" }}>
          Upload
        </Button>
      </Card>
    </div>
  );
};
export default UploadPage;
