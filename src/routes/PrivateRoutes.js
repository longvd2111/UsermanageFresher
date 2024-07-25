import React from "react";
import { useSelector } from "react-redux";

const PrivateRoutes = (props) => {
  const user = useSelector((state) => state.user.account);
  if (user && !user.auth) {
    return <>You don't have permission to access this page</>;
  }
  return props.children;
};

export default PrivateRoutes;
