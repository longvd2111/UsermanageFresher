import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import {
  faChevronLeft,
  faEye,
  faEyeSlash,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { handleLoginRedux } from "../redux/actions/userActions";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);

  const isLoading = useSelector((state) => state.user.isLoading);
  const account = useSelector((state) => state.user.account);

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

    dispatch(handleLoginRedux(email, password));
  };

  const handleGoBack = () => {
    navigate("/");
  };

  useEffect(() => {
    if (account && account.auth === true) {
      navigate("/");
    }
  }, [account]);

  return (
    <>
      <div className="login-container col-sm-4 col-12">
        <div className="title">Log in</div>
        <div className="text">
          Email or username (email:eve.holt@reqres.in)(pw:cityslicka)
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
          disabled={!email || !password || isLoading}
          onClick={() => handleLogin()}
        >
          {isLoading && (
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
