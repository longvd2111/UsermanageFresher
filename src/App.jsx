// App.js
import React, { useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.scss";

import { UserContext } from "./context/UserContext";
import AppRoutes from "./routes/AppRoutes";
import { useDispatch, useSelector } from "react-redux";
import { handleRefresh } from "./redux/actions/userActions";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(handleRefresh());
    }
  }, []);
  return (
    <>
      <div className="app-container">
        <Container>
          <Header />
          <AppRoutes />
        </Container>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </>
  );
}

export default App;
