import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Navbar from "../../Component/Navbar";

function Order() {
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const [order, setOrder] = useState([]);
  async function fetchAll() {
    try {
      let listData = await axios.get("http://localhost:2022/all/order", {
        headers: {
          Authorization: window.localStorage.getItem("myapptoken"),
        },
      });
      setOrder(listData.data);
      console.log(listData.data);
    } catch (error) {
      alert("Something went wrong");
    }
  }
  useEffect(() => {
    fetchAll();
  }, []);

  let handleDelete = async (id) => {
    try {
      let ask = window.confirm(
        "Are you sure, do you want to delete this Order?"
      );
      if (ask) {
        await axios.delete(`http://localhost:2022/deleteOrder/${id}`, {
          headers: {
            Authorization: window.localStorage.getItem("myapptoken"),
          },
        });
        toast.success("Removed", toastOptions);
        fetchAll();
      }
    } catch (error) {
      alert("Something went wrong");
    }
  };
  return (
    <>
      <Navbar />
      <div class="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 class="h3 mb-0 text-gray-800">Orders</h1>
      </div>

      <div class="card shadow mb-4">
        <div class="card-header py-3 d-flex justify-content-between">
          <h6 class="m-0 font-weight-bold text-primary">Order Details</h6>
        </div>
        <div class="card-body">
          <div class="table-responsive table-scroll">
            <table
              class="table table-bordered"
              id="dataTable"
              width="100%"
              cellspacing="0"
            >
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Address</th>
                  <th>Pincode</th>
                  <th>Title</th>
                  <th>Qty</th>
                  <th>Price</th>
                  <th>Total &#x20b9;</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {order.map((data) => {
                  return (
                    <tr>
                      <td>{data.name}</td>
                      <td>
                        {data.line1},{data.line2},{data.state},{data.city},
                        {data.country}
                      </td>
                      <td>{data.pincode}</td>
                      <td>{data.title}</td>
                      <td>{data.quantity}</td>
                      <td>&#x20b9;{data.offerPrice}</td>
                      <td>&#x20b9;{data.offerPrice * data.quantity}</td>
                      <td>
                        <button
                          className="btn btn-outline-danger btn-sm ms-2"
                          onClick={() => handleDelete(data._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <Link to={"/home"}>
          <button className="btn btn-primary btn-sm m-4">Back</button>
        </Link>
        <ToastContainer />
      </div>
    </>
  );
}

export default Order;
