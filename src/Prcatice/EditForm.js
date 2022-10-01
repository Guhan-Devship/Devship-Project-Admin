import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import request from "../api/api";
import Select from "react-select";
import useCustomForm from "../Component/UseCustomForm";
import { ToastContainer, toast } from "react-toastify";

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
function EditForm() {
  let navigate = useNavigate();
  useEffect(() => {
    getdata();
    getRole();
    getSkill();
  }, []);
  const [roleData, setRoleData] = useState([]);
  const [skillData, setSkillData] = useState([]);
  let getSkill = async () => {
    request({
      url: `getSkill`,
      method: "GET",
      headers: {
        Authorization: window.localStorage.getItem("myapptoken"),
      },
    }).then((res) => {
      setSkillData(res);
      console.log(res);
    });
  };

  let getRole = async () => {
    request({
      url: `getRole`,
      method: "GET",
      headers: {
        Authorization: window.localStorage.getItem("myapptoken"),
      },
    }).then((res) => {
      setRoleData(res);
    });
  };
  let getdata = async () => {
    request({
      url: `getforms/${params.id}`,
      method: "GET",
      headers: {
        Authorization: window.localStorage.getItem("myapptoken"),
      },
    }).then((res) => {
      setValues({
        first_name: res.first_name,
        surname: res.surname,
        genderValue: res.genderValue[0],
        email: res.email,
        roleValue: res.roleValue[0],
        skill: res.skill,
        phone: {
          number: res.phone.number,
          code: "",
          dialcountry: "",
        },
      });
      console.log(res);
      console.log(res.genderValue[0]);
    });
  };

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  let params = useParams();
  const options = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "transgender", label: "Transgender" },
  ];
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

  const { first_name, surname, genderValue, roleValue, email, phone, skill } =
    inputs;
  console.log(skill);
  const roleoptions = roleData.map((e) => {
    return { value: `${e.role_name}`, label: `${e.role_name}` };
  });
  const skilloptions = skillData.map((e) => {
    return { value: `${e.skill_name}`, label: `${e.skill_name}` };
  });
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  const onSubmit = () => {
    if (first_name === "") {
      return toast.error("Firstname required.", {
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
      url: `updateform/${params.id}`,
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
        navigate("/formList");
      }
    });
  };
  return (
    <div className="register-wrap">
      <form className="register" onSubmit={handleSubmit}>
        <div className="line"></div>
        <div className="row">
          <div className="col-sm-12 col-lg-6 mt-2">
            <div className="form-box">
              <input
                type="text"
                className="form-control"
                name="first_name"
                id="newfirstName"
                value={first_name}
                onChange={handleChange}
              />
              <label htmlFor="newfirstName">First Name</label>
            </div>
          </div>
          <div className="col-sm-12 col-lg-6 mt-2">
            <div className="form-box">
              <input
                type="text"
                className="form-control"
                name="surname"
                id="newLastName"
                value={surname}
                onChange={handleChange}
              />
              <label htmlFor="newLastName">Last Name</label>
            </div>
          </div>
        </div>
        <div>
          <div className="col-sm-12 col-lg-6">
            <div className="form-box">
              <Select
                name="gender"
                id="gender"
                placeholder="Gender"
                defaultValue={genderValue}
                value={{ value: genderValue, label: genderValue }}
                onChange={(e) => handleSelectChange(e, "genderValue")}
                options={options}
              />
              <label htmlFor="gender">Gender</label>
            </div>
          </div>
          <div className="col-sm-12 col-lg-6">
            <div className="form-box">
              <Select
                name="role"
                id="role"
                placeholder="Role"
                defaultValue={roleValue}
                value={{ value: roleValue, label: roleValue }}
                onChange={(e) => handleSelectChange(e, "roleValue")}
                options={roleoptions}
              />
            </div>
          </div>
          <div className="col-sm-12 col-lg-6">
            <div className="form-box">
              <Select
                name="role"
                id="role"
                placeholder="Skill"
                defaultValue={skill}
                value={skill}
                onChange={(e) => handleMultiSelectChange(e, "skill")}
                options={skilloptions}
                isMulti
              />
            </div>
          </div>
          <div className="col-sm-12 col-lg-6">
            <div className="form-box">
              <input
                type="email"
                className="form-control"
                name="email"
                id="newEmail"
                value={email}
                onChange={handleChange}
              />
              <label htmlFor="newEmail">Email</label>
            </div>
          </div>
          <div className="col-sm-12 col-lg-6">
            <div className="form-box">
              <input
                type="tel"
                className="form-control"
                name="number"
                id="newPhone"
                value={phone.number}
                onChange={(e) => handleObjectChange(e, phone)}
              />
              <label htmlFor="newPhone">Mobile</label>
            </div>
          </div>
        </div>
        <button className="btn-register" type="submit">
          Update
        </button>
      </form>
    </div>
  );
}

export default EditForm;
