import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import {
  faChevronLeft,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { loginApi } from "../services/userService";
import { toast, Toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);

  const handleLogin = async () => {
    alert("ME");
    if (!email || !password) {
      toast.error("Email/Password is required");
      return;
    }

    let res = await loginApi(email, password);

    if (res && res.token) {
      localStorage.setItem("token", res.token);
    }
  };

  return (
    <>
      <div className="login-container col-sm-4 col-12">
        <div className="title">Log in</div>
        <div className="text">Email or username</div>
        <input
          type="text"
          placeholder="Text email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="input-password">
          <input
            type={isShowPassword ? "text" : "password"}
            placeholder="Text password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {/* <FontAwesomeIcon icon={faEye} /> */}
          <FontAwesomeIcon
            icon={isShowPassword ? faEye : faEyeSlash}
            onClick={() => setIsShowPassword(!isShowPassword)}
          />
        </div>
        <button
          className={email && password ? "active" : ""}
          disabled={email && password ? false : true}
          onClick={() => handleLogin()}
        >
          Login
        </button>
        <div className="back">
          <FontAwesomeIcon icon={faChevronLeft} /> Go back
        </div>
      </div>
    </>
  );
};

export default Login;
