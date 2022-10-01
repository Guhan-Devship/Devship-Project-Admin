import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import request from "../../api/api";

function CreatePricing({ setOpen, getdata }) {
  let navigate = useNavigate();
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const [pricingName, setPricingName] = useState({
    pricing_name: "",
    price: 0,
  });
  const handleChange = (e) => {
    setPricingName((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const handleValidation = () => {
    const { pricing_name } = pricingName;
    if (pricing_name === "") {
      toast.error("Role name is required.", toastOptions);
      return false;
    }
    return true;
  };

  const handleClick = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      console.log(pricingName);
      request({
        url: `newPricing`,
        method: "POST",
        data: pricingName,
        headers: {
          Authorization: window.localStorage.getItem("myapptoken"),
        },
      }).then((res) => {
        if (res.message !== "pricing Created") {
          toast.error(res.message, toastOptions);
        }
        if (res.message === "pricing Created") {
          toast.success(" pricing Created", toastOptions);
          getdata();
          navigate("/pricing");
          setOpen(false);
        }
      });
    }
  };
  return (
    <div className="reserve">
      <div className="rContainer">
        <button
          className="btn btn-sm btn-danger rounded-circle mx-1"
          onClick={() => setOpen(false)}
        >
          X
        </button>
        <span>Create Pricing</span>
        <form>
          <div className="row m-3">
            <div className="col-4">Pricing Name :</div>
            <div className="col-8">
              <input
                type="text"
                className="form-control"
                placeholder="Pricing Name"
                id="pricing_name"
                name="pricing_name"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="row m-3">
            <div className="col-4">Price :</div>
            <div className="col-8">
              <input
                type="number"
                className="form-control"
                placeholder="Price"
                id="price"
                name="price"
                onChange={handleChange}
              />
            </div>
          </div>
          <button className="rButton" onClick={handleClick}>
            Create
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default CreatePricing;
