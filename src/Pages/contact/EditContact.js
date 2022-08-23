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
  const [inputFields, setInputField] = useState([]);
  const [credentials, setCredentials] = useState({
    title: "",
    desc: "",
    model: "",
    category: "",
    price: "",
    offerPrice: "",
    stockAvailability: "",
  });
  const handleChange = (e) => {
    const id = e.target.id;
    const value = e.target.value;

    setCredentials((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };
  useEffect(() => {
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
        editdata.data.map((items) => {
          return setCredentials({
            name: items.name,
            organisation: items.organisation,
            gender: items.gender,
            mobile: items.mobile,
            email: items.email,
            message: items.message,
          });
        });
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);
  useEffect(() => {
    fetch();
  }, []);
  const handleUpdate = async () => {
    const updateData = await axios
      .put(`http://localhost:2022/updateContact/${params.id}`, credentials, {
        headers: {
          Authorization: window.localStorage.getItem("myapptoken"),
        },
      })
      .then((res) => {
        toast.success("Updated", toastOptions);
        navigate("/contact", { replace: true });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChangeInput = (index, event) => {
    const values = [...inputFields];
    values[index][event.target.id] = event.target.value;
    setInputField(values);
  };

  const handleAddField = (e) => {
    e.preventDefault();
    setInputField([
      ...inputFields,
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
    const values = [...inputFields];
    values.splice(index, 1);
    setInputField(values);
  };

  const handleValidation = () => {
    const [{ line1, line2, city, state, country, pincode }] = inputFields;
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    for (let i = 0; i < inputFields.length; i++) {
      if (handleValidation()) {
        const data = await axios.post(
          `http://localhost:2022/address/${params.id}`,
          Object.assign(inputFields[i], clientId),
          {
            headers: {
              Authorization: window.localStorage.getItem("myapptoken"),
            },
          }
        );

        if (data.data.message !== "created") {
          toast.error(data.data.message, toastOptions);
        }
        if (data.data.message === "created") {
          toast.success("SuccessFully Created", toastOptions);
        }
      }
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
              <div className="col-4 mt-2 ms-2">
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => handleUpdate()}
                >
                  Update
                </button>
              </div>
            </div>
            <div className="row">
              {inputFields.length <= 0 ? (
                <h3 className="mt-3">Add Address</h3>
              ) : (
                ""
              )}
              {inputFields.map((inputField, index) => (
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
                        <button className="btn btn-primary btn-sm mt-3 ms-2">
                          Set Default
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
              disabled={inputFields.length >= 3}
            >
              Add
            </button>
            <button
              className="btn-primary btn-sm btn ms-2 mt-3"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </form>
          <ToastContainer />
        </div>
      </div>
    </>
  );
}

export default EditContact;
