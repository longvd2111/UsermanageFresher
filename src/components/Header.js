import React, { useContext, useState } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, useNavigate } from "react-router-dom";
import "./Header.scss";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleLogoutRedux } from "../redux/actions/userActions";
const Header = (props) => {
  const user = useSelector((state) => state.user.account);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(handleLogoutRedux());
  };

  useEffect(() => {
    if (user && user.auth === false) {
      navigate("/");
      toast.success("Log out success!");
    }
  }, [user]);

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Link className="navbar-brand" to={"/"}>
        Long Depzai
      </Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        {((user && user.auth) || window.location.pathname === "/") && (
          <>
            {" "}
            <Nav className="me-auto header-link-group" activeKey={"/"}>
              <Link to={"/"}>Home</Link>
              <Link to={"/users"}>Manage Users</Link>
            </Nav>
            <Nav style={{ alignItems: "center" }}>
              {user && user.email && (
                <span className="nav-link">Welcome {user.email}!</span>
              )}

              <NavDropdown
                title="Settings"
                id="basic-nav-dropdown"
                style={{ float: "right" }}
              >
                {user && user.auth === true ? (
                  <NavDropdown.Item onClick={() => handleLogout()}>
                    Logout
                  </NavDropdown.Item>
                ) : (
                  <Link className="dropdown-item" to="/login">
                    Login
                  </Link>
                )}
              </NavDropdown>
            </Nav>
          </>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
