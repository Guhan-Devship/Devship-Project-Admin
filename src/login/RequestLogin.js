import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import request from "../api/api";

function RequestLogin() {
  const navigate = useNavigate();
  const { uuid } = useParams();

  const login = async () => {
    console.log(uuid);

    request({
      url: `login/subadmin/${uuid}`,
      method: "POST",
    }).then((res) => {
      console.log(res);

      if (res.status === 0) {
        toast.error(res.message);
      }

      if (res.status === 1) {
        toast.success(res.message);
        window.localStorage.setItem("myapptoken", res.authToken);
        window.localStorage.setItem("id", res.userId);
        window.localStorage.setItem("role", res.role);
        navigate("/dashboard");
        window.location.reload();
      }
    });
  };

  useEffect(() => login(), []);

  return <div>Logging you in.. Please Wait!</div>;
}

export default RequestLogin;
