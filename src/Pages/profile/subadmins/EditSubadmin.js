import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Link, useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import useCustomForm from "../../../Component/UseCustomForm";
import { useObjectUrl } from "../../../useObjectUrl";
import request from "../../../api/api";

const initialValues = {
  first_name: "",
  surname: "",
  roleValue: "",
  skill: "",
  genderValue: "",
  email: "",
  phone: {
    number: "",
    code: "",
    dialcountry: "",
  },
};

function EditSubadmin({ setOpenEditModal, editData }) {
  let params = useParams();
  let navigate = useNavigate();
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const {
    values: inputs,
    setValues,
    handleCheckedChange,
    handleChange,
    handleObjectChange,
    handleSubmit,
    handleSelectChange,
    handleMultiSelectChange,
  } = useCustomForm({
    initialValues,
    onSubmit: () => onSubmit(),
  });
  useEffect(() => {
    console.log(editData);
    setValues({
      name: editData.name,
      last_name: editData.last_name,
      role: editData.role,
      email: editData.email,
      components: editData.components,
      users: editData.users,
      products: editData.products,
      orders: editData.orders,
      orderDelete: editData.orderDelete,
      userView: editData.userView,
      userEdit: editData.userEdit,
      userDelete: editData.userDelete,
      productDelete: editData.productDelete,
      productView: editData.productView,
      productEdit: editData.productEdit,
      utilities: editData.utilities,
      utilitiContact: editData.utilitiContact,
      contactDelete: editData.contactDelete,
      contactCreate: editData.contactCreate,
      contactEdit: editData.contactEdit,
      contactView: editData.contactView,
      utilitiForm: editData.utilitiForm,
      utilitiPricing: editData.utilitiPricing,
      pricingCreate: editData.pricingCreate,
      pricingEdit: editData.pricingEdit,
      pricingDelete: editData.pricingDelete,
      utilitiRole: editData.utilitiRole,
      roleCreate: editData.roleCreate,
      roleEdit: editData.roleEdit,
      roleDelete: editData.roleDelete,
      utilitiSkill: editData.utilitiSkill,
      skillCreate: editData.skillCreate,
      skillEdit: editData.skillEdit,
      skillDelete: editData.skillDelete,
    });
  }, []);

  const {
    email,
    name,
    access,
    last_name,
    role,
    status,
    components,
    users,
    products,
    orders,
    orderDelete,
    userView,
    userEdit,
    userDelete,
    productDelete,
    productView,
    productEdit,
    utilities,
    utilitiContact,
    contactDelete,
    contactCreate,
    contactEdit,
    contactView,
    utilitiForm,
    utilitiPricing,
    pricingCreate,
    pricingEdit,
    pricingDelete,
    utilitiRole,
    roleCreate,
    roleEdit,
    roleDelete,
    utilitiSkill,
    skillCreate,
    skillEdit,
    skillDelete,
  } = inputs;

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  const options = [
    { value: "sub-admins", label: "sub-admins" },
    { value: "admins", label: "admins" },
  ];
  const onSubmit = () => {
    if (name === "") {
      return toast.error("Name required.", {
        id: "fullName",
      });
    }
    if (last_name === "") {
      return toast.error("last name required.", {
        id: "fullName",
      });
    }
    if (email === "") {
      return toast.error("Email required.", {
        id: "email",
      });
    } else if (!validateEmail(email)) {
      return toast.error("Invalid email.", {
        id: "email",
      });
    }
    console.log(inputs);
    request({
      url: `updatesubadmin/${editData._id}`,
      method: "PUT",
      data: inputs,
      headers: {
        Authorization: window.localStorage.getItem("myapptoken"),
      },
    }).then((res) => {
      console.log(res);
      if (res.message !== "Updated") {
        toast.error(res.message, toastOptions);
      } else if (res.message === "Updated") {
        toast.success(res.message, toastOptions);
        setOpenEditModal(false);
      }
    });
  };
  return (
    <>
      <div className="reserve">
        <div className="rContainer">
          <button
            className="btn btn-sm btn-danger rounded-circle mx-1"
            onClick={() => setOpenEditModal(false)}
          >
            X
          </button>
          <span>Edit Subadmin</span>
          <form onSubmit={handleSubmit} className="scroll-subadmin">
            <div className="row m-3">
              <div className="col-4">Name :</div>
              <div className="col-8">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Name"
                  id="name"
                  name="name"
                  value={name}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="row m-3">
              <div className="col-4">lastname</div>
              <div className="col-8">
                <input
                  type="text"
                  className="form-control"
                  placeholder="last_name"
                  id="last_name"
                  name="last_name"
                  value={last_name}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="row m-3">
              <div className="col-4">Role</div>
              <div className="col-8">
                <Select
                  name="role"
                  id="role"
                  defaultValue={role}
                  value={{ value: role, label: role }}
                  onChange={(e) => handleSelectChange(e, "role")}
                  options={options}
                />
              </div>
            </div>
            <div className="row m-3">
              <div className="col-2">Access</div>
              <div className="col-5">
                <input
                  type="checkbox"
                  name="components"
                  onChange={handleCheckedChange}
                  checked={components}
                />
                Components
                {components === true ? (
                  <>
                    <div className="ms-4">
                      <input
                        type="checkbox"
                        name="users"
                        value={users}
                        onChange={handleCheckedChange}
                        checked={users}
                      />
                      users
                      {users === true ? (
                        <>
                          <div className="ms-3">
                            <input
                              type="checkbox"
                              name="userView"
                              onChange={handleCheckedChange}
                              checked={userView}
                            />
                            View
                          </div>
                          <div className="ms-3">
                            <input
                              type="checkbox"
                              name="userEdit"
                              onChange={handleCheckedChange}
                              checked={userEdit}
                            />
                            Edit
                          </div>
                          <div className="ms-3">
                            <input
                              type="checkbox"
                              name="userDelete"
                              onChange={handleCheckedChange}
                              checked={userDelete}
                            />
                            Delete
                          </div>
                        </>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="ms-4">
                      <input
                        type="checkbox"
                        name="products"
                        onChange={handleCheckedChange}
                        checked={products}
                      />
                      product
                      {products === true ? (
                        <>
                          <div className="ms-3">
                            <input
                              type="checkbox"
                              name="productView"
                              onChange={handleCheckedChange}
                              checked={productView}
                            />
                            View
                          </div>
                          <div className="ms-3">
                            <input
                              type="checkbox"
                              name="productEdit"
                              onChange={handleCheckedChange}
                              checked={productEdit}
                            />
                            Edit
                          </div>
                          <div className="ms-3">
                            <input
                              type="checkbox"
                              name="productDelete"
                              onChange={handleCheckedChange}
                              checked={productDelete}
                            />
                            Delete
                          </div>
                        </>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="ms-4">
                      <input
                        type="checkbox"
                        name="orders"
                        onChange={handleCheckedChange}
                        checked={orders}
                      />
                      orders
                      {orders === true ? (
                        <>
                          <div className="ms-3">
                            <input
                              type="checkbox"
                              name="orderDelete"
                              onChange={handleCheckedChange}
                              checked={orderDelete}
                            />
                            Delete
                          </div>
                        </>
                      ) : (
                        ""
                      )}
                    </div>
                  </>
                ) : (
                  ""
                )}
              </div>
              <div className="col-5">
                <input
                  type="checkbox"
                  name="utilities"
                  onChange={handleCheckedChange}
                  checked={utilities}
                />
                utilities
                {utilities === true ? (
                  <>
                    <div className="ms-3">
                      <input
                        type="checkbox"
                        name="utilitiContact"
                        onChange={handleCheckedChange}
                        checked={utilitiContact}
                      />
                      Contact
                      {utilitiContact === true ? (
                        <>
                          <div className="ms-3">
                            <input
                              type="checkbox"
                              name="contactCreate"
                              onChange={handleCheckedChange}
                              checked={contactCreate}
                            />
                            Create
                          </div>
                          <div className="ms-3">
                            <input
                              type="checkbox"
                              name="contactView"
                              onChange={handleCheckedChange}
                              checked={contactView}
                            />
                            View
                          </div>
                          <div className="ms-3">
                            <input
                              type="checkbox"
                              name="contactEdit"
                              onChange={handleCheckedChange}
                              checked={contactEdit}
                            />
                            Edit
                          </div>
                          <div className="ms-3">
                            <input
                              type="checkbox"
                              name="contactDelete"
                              onChange={handleCheckedChange}
                              checked={contactDelete}
                            />
                            Delete
                          </div>
                        </>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="ms-3">
                      <input
                        type="checkbox"
                        name="utilitiRole"
                        onChange={handleCheckedChange}
                        checked={utilitiRole}
                      />
                      Role
                      {utilitiRole === true ? (
                        <>
                          <div className="ms-3">
                            <input
                              type="checkbox"
                              name="roleCreate"
                              onChange={handleCheckedChange}
                              checked={roleCreate}
                            />
                            Create
                          </div>
                          <div className="ms-3">
                            <input
                              type="checkbox"
                              name="roleEdit"
                              onChange={handleCheckedChange}
                              checked={roleEdit}
                            />
                            Edit
                          </div>
                          <div className="ms-3">
                            <input
                              type="checkbox"
                              name="roleDelete"
                              onChange={handleCheckedChange}
                              checked={roleDelete}
                            />
                            Delete
                          </div>
                        </>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="ms-3">
                      <input
                        type="checkbox"
                        name="utilitiSkill"
                        onChange={handleCheckedChange}
                        checked={utilitiSkill}
                      />
                      Skill
                      {utilitiSkill === true ? (
                        <>
                          <div className="ms-3">
                            <input
                              type="checkbox"
                              name="skillCreate"
                              onChange={handleCheckedChange}
                              checked={skillCreate}
                            />
                            Create
                          </div>
                          <div className="ms-3">
                            <input
                              type="checkbox"
                              name="skillEdit"
                              onChange={handleCheckedChange}
                              checked={skillEdit}
                            />
                            Edit
                          </div>
                          <div className="ms-3">
                            <input
                              type="checkbox"
                              name="skillDelete"
                              onChange={handleCheckedChange}
                              checked={skillDelete}
                            />
                            Delete
                          </div>
                        </>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="ms-3">
                      <input
                        type="checkbox"
                        name="utilitiForm"
                        onChange={handleCheckedChange}
                        checked={utilitiForm}
                      />
                      Form
                    </div>
                    <div className="ms-3">
                      <input
                        type="checkbox"
                        name="utilitiPricing"
                        onChange={handleCheckedChange}
                        checked={utilitiPricing}
                      />
                      Pricing
                      {utilitiPricing === true ? (
                        <>
                          <div className="ms-3">
                            <input
                              type="checkbox"
                              name="pricingCreate"
                              onChange={handleCheckedChange}
                              checked={pricingCreate}
                            />
                            Create
                          </div>
                          <div className="ms-3">
                            <input
                              type="checkbox"
                              name="pricingEdit"
                              onChange={handleCheckedChange}
                              checked={pricingEdit}
                            />
                            Edit
                          </div>
                          <div className="ms-3">
                            <input
                              type="checkbox"
                              name="pricingDelete"
                              onChange={handleCheckedChange}
                              checked={pricingDelete}
                            />
                            Delete
                          </div>
                        </>
                      ) : (
                        ""
                      )}
                    </div>
                  </>
                ) : (
                  ""
                )}
              </div>
            </div>

            <div className="row m-3">
              <div className="col-4">Email</div>
              <div className="col-8">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                />
              </div>
            </div>
            <button className="rButton" type="submit">
              Update
            </button>
          </form>
        </div>
        <ToastContainer />
      </div>
    </>
  );
}

export default EditSubadmin;
