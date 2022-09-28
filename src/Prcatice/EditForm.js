import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import request from "../api/api";
import Select from "react-select";
import useCustomForm from "../Component/UseCustomForm";
import { ToastContainer, toast } from "react-toastify";

const initialValues = {
  first_name: "",
  surname: "",
  gender: "",
  email: "",
  phone: {
    number: "",
    code: "",
    dialcountry: "",
  },
};
function EditForm() {
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
        gender: { value: res.gender, label: res.gender },
        email: res.email,
        role: { value: res.role, label: res.role },
        skill: res.skill.map((e) => {
          return { value: e.value, label: e.label };
        }),
        phone: {
          number: res.phone.number,
          code: "",
          dialcountry: "",
        },
      });
      console.log(res);
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
  } = useCustomForm({
    initialValues,
    onSubmit: () => onSubmit(),
  });

  const { first_name, surname, gender, role, email, phone, skill } = inputs;
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
      if (res.status !== 1) {
        toast.error(res.message, toastOptions);
      } else if (res.status === 1) {
        toast.success(res.message, toastOptions);
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
                defaultValue={gender}
                value={gender}
                onChange={(e) => handleSelectChange(e, "gender")}
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
                defaultValue={role}
                value={role}
                onChange={(e) => handleSelectChange(e, "role")}
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
                onChange={(e) => handleSelectChange(e, "role")}
                options={skilloptions}
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
