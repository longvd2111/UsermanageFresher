import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const PrivateRoutes = (props) => {
  const { user, loginContext } = useContext(UserContext);
  if (user && !user.auth) {
    return <>You don't have permission to access this page</>;
  }
  return props.children;
};

export default PrivateRoutes;
