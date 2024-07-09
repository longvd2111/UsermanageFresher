// App.js
import React, { useState } from "react";
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import TableUsers from "./components/TableUsers";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.scss";
import Home from "./components/Home";
import { Link, Routes, Route } from "react-router-dom";
import Login from "./components/Login";

function App() {
  return (
    <>
      <div className="app-container">
        <Container>
          <Header />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<TableUsers />} />
            <Route path="/login" element={<Login />} />
          </Routes>
          {/* <TableUsers /> */}
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
