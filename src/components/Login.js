import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import {
  faChevronLeft,
  faEye,
  faEyeSlash,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { loginApi } from "../services/userService";
import { toast, Toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const Login = () => {
  const navigate = useNavigate();
  const { loginContext } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);

  const [loadingApi, setLoadingApi] = useState(false);

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, []);

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Email/Password is required");
      return;
    }

    setLoadingApi(true);
    let res = await loginApi(email, password);
    if (res && res.token) {
      loginContext(email, res.token);
      navigate("/");
    } else {
      //error
      if (res && res.status === 400) {
        toast.error(res.data.error);
      }
    }
    return () => {
      setLoadingApi(false);
    };
  };

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <>
      <div className="login-container col-sm-4 col-12">
        <div className="title">Log in</div>
        <div className="text">
          Email or username (eve.holt@reqres.in)(cityslicka)
        </div>
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
          disabled={!email || !password || loadingApi}
          onClick={() => handleLogin()}
        >
          {loadingApi && (
            <FontAwesomeIcon icon={faSpinner} className="spinner fa-spin" />
          )}
          &nbsp;Login
        </button>
        <div className="back">
          <FontAwesomeIcon icon={faChevronLeft} />
          <span onClick={() => handleGoBack()}>&nbsp;Go back</span>
        </div>
      </div>
    </>
  );
};

export default Login;
