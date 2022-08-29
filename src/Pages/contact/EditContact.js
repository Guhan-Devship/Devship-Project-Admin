import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Navbar from "../../Component/Navbar";

function EditContact() {
  function fetch() {
    if (!localStorage.getItem("myapptoken")) {
      navigate("/");
    }
  }

  let params = useParams();
  const [clientId, setClientId] = useState({ createdby: params.id });
  const navigate = useNavigate();
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const [addAddress, setAddAddress] = useState([]);
  const [inputFields, setinputFields] = useState([]);
  const [credentials, setCredentials] = useState({
    name: "",
    organisation: "",
    gender: "",
    mobile: "",
    email: "",
    message: "",
    address: [
      {
        line1: "",
        line2: "",
        city: "",
        state: "",
        country: "",
        pincode: "",
      },
    ],
  });
  console.log(addAddress);
  const handleChange = (e) => {
    const id = e.target.id;
    const value = e.target.value;
    setCredentials((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  async function fetchData() {
    try {
      let editdata = await axios.get(
        `http://localhost:2022/getContact/${params.id}`,
        {
          headers: {
            Authorization: window.localStorage.getItem("myapptoken"),
          },
        }
      );
      setCredentials(editdata.data);
      console.log(editdata.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetch();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const checkIfEmptyValuesArray = (e, i) => {
      return (
        e.line1 === "" ||
        e.line2 === "" ||
        e.city === "" ||
        e.state === "" ||
        e.country === "" ||
        e.pincode === ""
      );
    };

    if (addAddress.some(checkIfEmptyValuesArray)) {
      return toast.error("address Field Required", toastOptions);
    } else {
      addAddress.map((item) => {
        credentials.address.push(item);
      });
    }

    if (credentials.address.some(checkIfEmptyValuesArray)) {
      return toast.error("address Field Required", toastOptions);
    } else {
      credentials.address = JSON.stringify(credentials.address);
      const updateData = await axios
        .put(`http://localhost:2022/updateContact/${params.id}`, credentials, {
          headers: {
            Authorization: window.localStorage.getItem("myapptoken"),
          },
        })
        .then((res) => {
          toast.success("Updated", toastOptions);
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
      console.log(credentials);
    }
  };

  const handleChangeOutput = (index, event) => {
    const values = [...credentials.address];
    values[index][event.target.id] = event.target.value;
    setCredentials({ ...credentials, address: values });
  };

  const handleChangeInput = (index, event) => {
    const values = [...addAddress];
    values[index][event.target.id] = event.target.value;
    setAddAddress(values);
  };

  const handleAddField = (e) => {
    e.preventDefault();
    setAddAddress([
      ...addAddress,
      {
        line1: "",
        line2: "",
        state: "",
        city: "",
        country: "",
        pincode: "",
      },
    ]);
  };

  const handleRemoveField = (index) => {
    const values = [...addAddress];
    values.splice(index, 1);
    setAddAddress(values);
  };

  const handleRemove = (index, e) => {
    e.preventDefault();
    const values = [...credentials.address];
    values.splice(index, 1);
    setCredentials({
      ...credentials,
      address: values,
    });
  };

  const handleValidation = () => {
    const [{ line1, line2, city, state, country, pincode }] =
      credentials.address;
    if (line1 === "") {
      toast.error("line1 is required.", toastOptions);
      return false;
    } else if (line2 === "") {
      toast.error("line2 is required", toastOptions);
      return false;
    } else if (city === "") {
      toast.error("city is required", toastOptions);
      return false;
    } else if (state === "") {
      toast.error("state is required", toastOptions);
      return false;
    } else if (country === "") {
      toast.error("country is required", toastOptions);
      return false;
    } else if (pincode === "") {
      toast.error("pincode is required", toastOptions);
      return false;
    }
    return true;
  };

  const handleValidationAddress = () => {
    const [{ line1, line2, city, state, country, pincode }] = addAddress;
    if (line1 === "") {
      toast.error("line1 is required.", toastOptions);
      return false;
    } else if (line2 === "") {
      toast.error("line2 is required", toastOptions);
      return false;
    } else if (city === "") {
      toast.error("city is required", toastOptions);
      return false;
    } else if (state === "") {
      toast.error("state is required", toastOptions);
      return false;
    } else if (country === "") {
      toast.error("country is required", toastOptions);
      return false;
    } else if (pincode === "") {
      toast.error("pincode is required", toastOptions);
      return false;
    }
    return true;
  };

  let handleDelete = async (id) => {
    try {
      let ask = window.confirm(
        "Are you sure, do you want to delete this User?"
      );
      if (ask) {
        await axios.delete(
          `http://localhost:2022/deleteContactAddress/${id}/${params.id}`,
          {
            headers: {
              Authorization: window.localStorage.getItem("myapptoken"),
            },
          }
        );
        toast.success("Removed", toastOptions);
        fetchData();
      }
    } catch (error) {
      alert("Something went wrong");
    }
  };
  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-5">
        <div class="card-header py-3 mb-2 d-flex justify-content-between">
          <h6 class="m-0 font-weight-bold text-primary">contact Details</h6>
        </div>
        <div className="card-body">
          <form>
            <div className="row user-row">
              <div className="form-group col-sm-12 col-md-4 col-lg-6 col-xl-6 col-xxl-6">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Name"
                  id="name"
                  value={credentials.name}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group col-sm-12 col-md-4 col-lg-6 col-xl-6 col-xxl-6 ">
                <input
                  type="text"
                  className="form-control"
                  placeholder="organisation"
                  id="organisation"
                  value={credentials.organisation}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group col-sm-12 col-md-4 col-lg-6 col-xl-6 col-xxl-6 ">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Gender"
                  id="gender"
                  value={credentials.gender}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group col-sm-12 col-md-4 col-lg-6 col-xl-6 col-xxl-6 ">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Mobile"
                  id="mobile"
                  value={credentials.mobile}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group col-sm-12 col-md-4 col-lg-6 col-xl-6 col-xxl-6 ">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Email"
                  id="email"
                  value={credentials.email}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group col-sm-12 col-md-4 col-lg-6 col-xl-6 col-xxl-6 ">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Message"
                  id="message"
                  value={credentials.message}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="row">
              <h5 className="mt-3">Address</h5>
              {credentials.address?.map((item, index) => (
                <div className="col-4">
                  <div class="card text-dark mt-3 mb-3">
                    <div class="card-body" key={index}>
                      <form>
                        <div className="row">
                          <div className="col-6">
                            <input
                              type="text"
                              class="form-control mt-1"
                              placeholder="Line 1"
                              id="line1"
                              value={item.line1}
                              onChange={(event) =>
                                handleChangeOutput(index, event)
                              }
                            />
                          </div>
                          <div className="col-6">
                            <input
                              type="text"
                              placeholder="Line 2"
                              class="form-control mt-1"
                              id="line2"
                              value={item.line2}
                              onChange={(event) =>
                                handleChangeOutput(index, event)
                              }
                            />
                          </div>
                          <div className="col-6">
                            <input
                              type="text"
                              placeholder="State"
                              class="form-control mt-1"
                              id="state"
                              value={item.state}
                              onChange={(event) =>
                                handleChangeOutput(index, event)
                              }
                            />
                          </div>
                          <div className="col-6">
                            <input
                              type="text"
                              placeholder="City"
                              class="form-control mt-1"
                              id="city"
                              value={item.city}
                              onChange={(event) =>
                                handleChangeOutput(index, event)
                              }
                            />
                          </div>
                          <div className="col-6">
                            <input
                              type="text"
                              placeholder="Country"
                              class="form-control mt-1"
                              id="country"
                              value={item.country}
                              onChange={(event) =>
                                handleChangeOutput(index, event)
                              }
                            />
                          </div>
                          <div className="col-6">
                            <input
                              type="text"
                              placeholder="Pincode"
                              class="form-control mt-1"
                              id="pincode"
                              value={item.pincode}
                              onChange={(event) =>
                                handleChangeOutput(index, event)
                              }
                            />
                          </div>
                        </div>
                        <button
                          className="btn btn-danger btn-sm mt-3"
                          onClick={() => handleDelete(item._id)}
                        >
                          Delete
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="row">
              {addAddress.map((inputField, index) => (
                <div className="col-4">
                  <div class="card text-dark mt-3 mb-3">
                    <div class="card-header">Address</div>
                    <div class="card-body" key={index}>
                      <form>
                        <div className="row">
                          <div className="col-6">
                            <input
                              type="text"
                              class="form-control mt-1"
                              placeholder="Line 1"
                              id="line1"
                              value={inputField.line1}
                              onChange={(event) =>
                                handleChangeInput(index, event)
                              }
                            />
                          </div>
                          <div className="col-6">
                            <input
                              type="text"
                              placeholder="Line 2"
                              class="form-control mt-1"
                              id="line2"
                              value={inputField.line2}
                              onChange={(event) =>
                                handleChangeInput(index, event)
                              }
                            />
                          </div>
                          <div className="col-6">
                            <input
                              type="text"
                              placeholder="State"
                              class="form-control mt-1"
                              id="state"
                              value={inputField.state}
                              onChange={(event) =>
                                handleChangeInput(index, event)
                              }
                            />
                          </div>
                          <div className="col-6">
                            <input
                              type="text"
                              placeholder="City"
                              class="form-control mt-1"
                              id="city"
                              value={inputField.city}
                              onChange={(event) =>
                                handleChangeInput(index, event)
                              }
                            />
                          </div>
                          <div className="col-6">
                            <input
                              type="text"
                              placeholder="Country"
                              class="form-control mt-1"
                              id="country"
                              value={inputField.country}
                              onChange={(event) =>
                                handleChangeInput(index, event)
                              }
                            />
                          </div>
                          <div className="col-6">
                            <input
                              type="text"
                              placeholder="Pincode"
                              class="form-control mt-1"
                              id="pincode"
                              value={inputField.pincode}
                              onChange={(event) =>
                                handleChangeInput(index, event)
                              }
                            />
                          </div>
                        </div>
                        <button
                          className="btn btn-danger btn-sm mt-3"
                          onClick={() => handleRemoveField()}
                        >
                          Delete
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              className="btn-primary btn-sm btn mt-3"
              onClick={(e) => handleAddField(e)}
              disabled={
                addAddress.length >= 3 || credentials.address.length >= 3
              }
            >
              Add
            </button>
            <div className="col-4 mt-2 ms-2">
              <button
                className="btn btn-primary btn-sm"
                onClick={(e) => handleUpdate(e)}
              >
                Update
              </button>
            </div>
          </form>
          <ToastContainer />
        </div>
      </div>
    </>
  );
}

export default EditContact;
