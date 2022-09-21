import axios from "axios";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "./Imageupload.css";

function MultiImageUpload() {
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const [selectedImages, setSelectedImages] = useState([]);
  const [finalFiles, setFinalFiles] = useState({ image: [null] });

  const onSelectFile = (event) => {
    const selectedFiles = event.target.files;
    const selectedFilesArray = Array.from(selectedFiles);
    console.log(selectedFilesArray);
    setFinalFiles({ image: selectedFilesArray });

    const imagesArray = selectedFilesArray.map((file) => {
      return URL.createObjectURL(file);
    });

    setSelectedImages((previousImages) => previousImages.concat(imagesArray));

    // FOR BUG IN CHROME
    event.target.value = "";
  };

  function deleteHandler(image, index) {
    finalFiles.image.splice(index, 1);
    setSelectedImages(selectedImages.filter((e) => e !== image));
    URL.revokeObjectURL(image);
  }

  const handleClick = async (e) => {
    e.preventDefault();
    console.log(finalFiles);
    const formData = new FormData();
    Object.entries(finalFiles).forEach(([key, value]) => {
      value.map((e) => {
        formData.append(key, e);
      });
    });
    const data = await axios.post("http://localhost:2022/upload", formData, {
      headers: {
        Authorization: window.localStorage.getItem("myapptoken"),
      },
    });
    if (data.data.message !== "Category Created") {
      toast.error(data.data.message, toastOptions);
    }
    if (data.data.message === "Category Created") {
      toast.success("SuccessFully Uploaded", toastOptions);
      window.location.reload();
    }
  };
  return (
    <section>
      <label className="label-style">
        + Add Images
        <br />
        <span className="lable-span">up to 5 images</span>
        <input
          className="upload-input"
          type="file"
          name="image"
          onChange={onSelectFile}
          multiple
          accept="image/png , image/jpeg, image/webp"
        />
      </label>
      <br />
      {selectedImages.length > 0 &&
        (selectedImages.length > 5 ? (
          <p className="error">
            You can't upload more than 5 images! <br />
            <span>
              please delete <b> {selectedImages.length - 5} </b> of them{" "}
            </span>
          </p>
        ) : (
          <button className="upload-btn" onClick={handleClick}>
            UPLOAD {selectedImages.length} IMAGE
            {selectedImages.length === 1 ? "" : "S"}
          </button>
        ))}
      <div className="images">
        {selectedImages &&
          selectedImages.map((image, index) => {
            return (
              <div key={image} className="image">
                <img
                  className="preview-style"
                  src={image}
                  height="200"
                  alt="upload"
                />
                <button
                  className="rounded-pill"
                  onClick={() => deleteHandler(image, index)}
                >
                  X
                </button>
                <p>{index + 1}</p>
              </div>
            );
          })}
      </div>
      <ToastContainer />
    </section>
  );
}

export default MultiImageUpload;
