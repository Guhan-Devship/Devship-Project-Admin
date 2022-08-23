import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../Component/Navbar";
import { ToastContainer, toast } from "react-toastify";
import { useObjectUrl } from "../../useObjectUrl";
import axios from "axios";

function CreateContact() {
  // const {
  //   objectURL: imagePreviewUrl,
  //   setObject: setImage,
  //   object: image,
  // } = useObjectUrl();

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const [contactDetail, setContactDetail] = useState({
    name: "",
    organisation: "",
    gender: "",
    mobile: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setContactDetail((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  // const handleFileChange = (e) => {
  //   const [file] = e.target.files;

  //   if (!file || !file.type.startsWith("image/")) {
  //     alert("Invalid file format");
  //     return;
  //   }

  //   setContactDetail({ ...contactDetail, image: file });
  //   setImage(file);
  // };

  const handleValidation = () => {
    const { name, organisation, gender, mobile, email, message } =
      contactDetail;
    if (name.length < 3) {
      toast.error(
        "Username should be greater than 3 characters.",
        toastOptions
      );
      return false;
    } else if (organisation.length > 20) {
      toast.error("Should be 20 character", toastOptions);
      return false;
    } else if (gender === "") {
      toast.error("gender is required.", toastOptions);
      return false;
    } else if (mobile === "") {
      toast.error("mobile is required.", toastOptions);
      return false;
    } else if (mobile.length > 10) {
      toast.error("Mobile Number 10 digit only", toastOptions);
      return false;
    } else if (email === "") {
      toast.error("email is required.", toastOptions);
      return false;
    } else if (message === "") {
      toast.error("message is required.", toastOptions);
      return false;
    }
    return true;
  };

  const handleClick = async (e) => {
    e.preventDefault();

    if (handleValidation()) {
      const data = await axios.post(
        "http://localhost:2022/newContact",
        contactDetail,
        {
          headers: {
            Authorization: window.localStorage.getItem("myapptoken"),
          },
        }
      );
      if (data.data.message !== "Contact Created") {
        toast.error(data.data.message, toastOptions);
      }
      if (data.data.message === "Contact Created") {
        toast.success("SuccessFully Created", toastOptions);
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-5">
        <div class="card-header py-3 mb-2 d-flex justify-content-between">
          <h6 class="m-0 font-weight-bold text-primary">New Contact Details</h6>
        </div>
        <div className="card-body">
          <form>
            <div className="row user-row">
              <div className="form-group col-sm-12 col-md-4 col-lg-6 col-xl-6 col-xxl-6 mb-5">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Name"
                  name="name"
                  id="name"
                  onChange={handleChange}
                />
                <input
                  type="text"
                  className="form-control mt-2"
                  placeholder="Organisation"
                  name="organisation"
                  id="organisation"
                  onChange={handleChange}
                />
                <select
                  className="form-control mt-2 col-4"
                  name="Active"
                  placeholder="Gender"
                  id="gender"
                  onChange={handleChange}
                >
                  <option>Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
                <input
                  type="text"
                  className="form-control mt-2"
                  placeholder="mobile"
                  name="mobile"
                  id="mobile"
                  onChange={handleChange}
                />
                <input
                  type="text"
                  className="form-control mt-2"
                  placeholder="Email"
                  name="email"
                  id="email"
                  onChange={handleChange}
                />
                <input
                  type="text"
                  className="form-control mt-2"
                  placeholder="Message"
                  name="message"
                  id="message"
                  onChange={handleChange}
                />
              </div>
              {/* <div className="form-group col-sm-12 col-md-4 col-lg-6 col-xl-6 col-xxl-6 ">
                {imagePreviewUrl && (
                  <img
                    src={imagePreviewUrl}
                    className="img-fluid preview-img"
                  />
                )}
                <input
                  type="file"
                  className="form-control col-6"
                  name="myImage"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </div> */}
            </div>
            <div className="col-4">
              <Link to={"/contact"}>
                <button className="btn btn-danger btn-sm me-2 mt-4">
                  cancel
                </button>
              </Link>
              <button
                className="btn btn-primary btn-sm mt-4"
                onClick={handleClick}
              >
                Create
              </button>
            </div>
          </form>
        </div>

        <ToastContainer />
      </div>
    </>
  );
}

export default CreateContact;
