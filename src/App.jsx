// App.js
import React, { useState } from "react";
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import TableUsers from "./components/TableUsers";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.scss";

function App() {
  return (
    <>
      <div className="app-container">
        <Container>
          <Header />

          <TableUsers />
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
