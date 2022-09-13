import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Component/Navbar";

function Profile() {
  let navigate = useNavigate();
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  let userId = localStorage.getItem("id");
  const [user, setUserData] = useState([]);
  async function fetchData() {
    let user = await axios.get(`http://localhost:2022/getUser/${userId}`, {
      headers: {
        Authorization: window.localStorage.getItem("myapptoken"),
      },
    });
    setUserData({
      id: user.data._id,
      first_name: user.data.first_name,
      email: user.data.email,
      phone: user.data.phone,
    });
  }
  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    const id = e.target.id;
    const value = e.target.value;
    setUserData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleUpdate = async () => {
    const updateData = await axios
      .put(`http://localhost:2022/updateUser/${userId}`, user, {
        headers: {
          Authorization: window.localStorage.getItem("myapptoken"),
        },
      })
      .then((res) => {
        alert("Updated");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="container">
        <div className="row mt-5">
          <div class="row gutters">
            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
              <h6 class="mb-2 text-primary">Admin Details</h6>
            </div>
            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
              <div class="form-group">
                <label for="fullName">Full Name</label>
                <input
                  type="text"
                  class="form-control"
                  id="name"
                  placeholder="Enter full name"
                  value={user.first_name}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
              <div class="form-group">
                <label for="eMail">Email</label>
                <input
                  type="email"
                  class="form-control"
                  id="email"
                  placeholder="Enter email ID"
                  value={user.email}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
              <div class="form-group">
                <label for="phone">Phone</label>
                <input
                  type="text"
                  class="form-control"
                  id="phone"
                  placeholder="Enter phone number"
                  value={user.phone}
                  onChange={handleChange}
                />
              </div>
              <button
                className="btn-sm btn-danger"
                onClick={() => handleUpdate()}
              >
                update
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
