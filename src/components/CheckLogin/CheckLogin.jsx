import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function CheckLogin({ children }) {
  const loginUser = localStorage.getItem("login");
  const navigate = useNavigate();
  useEffect(() => {
    if (!loginUser || loginUser == false) {
      navigate("/login");
    }
  }, [loginUser]);
  return <div>{children}</div>;
}

export default CheckLogin;
