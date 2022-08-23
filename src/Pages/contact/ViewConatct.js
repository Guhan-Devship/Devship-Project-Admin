import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Navbar from "../../Component/Navbar";

function ViewContact() {
  function fetch() {
    if (!localStorage.getItem("myapptoken")) {
      navigate("/");
    }
  }
  const params = useParams();
  const navigate = useNavigate();
  const [contact, setContactData] = useState([]);
  useEffect(() => {
    async function fetchData() {
      let user = await axios.get(
        `http://localhost:2022/getContact/${params.id}`,
        {
          headers: {
            Authorization: window.localStorage.getItem("myapptoken"),
          },
        }
      );
      setContactData(user.data);
      console.log(user.data);
    }
    fetchData();
  }, []);
  useEffect(() => {
    fetch();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row">
          <div className="col-6 border mt-5">
            <h3>Contact Details</h3>
            <div className="row">
              <div className="col-6">
                <p>Name</p>
                <p>Organisation</p>
                <p>Gender</p>
                <p>Mobile</p>
                <p>Email</p>
                <p>Message</p>
              </div>
              <div className="col-6">
                {contact.map((items) => {
                  return (
                    <>
                      <p>: {items.name}</p>
                      <p>: {items.organisation}</p>
                      <p>: {items.gender}</p>
                      <p>: {items.mobile}</p>
                      <p>: {items.email}</p>
                      <p>: {items.message}</p>
                    </>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="col-6 mt-5 border">
            <h3>Address</h3>
            <div className="col-4">
              <h6>Address 1</h6>
              {contact.map((items) => {
                return (
                  <>
                    <p>
                      {" "}
                      {items.Address.line1},{items.Address.line2},
                      {items.Address.city},{items.Address.state},
                      {items.Address.country}
                      {items.Address.pincode}
                    </p>
                  </>
                );
              })}
            </div>
          </div>
        </div>
        <Link to={"/contact"}>
          <button className="btn btn-danger btn-sm mt-5">Close</button>
        </Link>
      </div>
    </>
  );
}

export default ViewContact;
