import React, { useContext } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import Layout from "./pages/Layout";
import Login from "./pages/Login";
import AuthContext from "./auth/AuthContext";
import LoginModal from "./components/LoginModal";
import JobDetailModal from "./components/JobDetailModal";

function App() {
  const location = useLocation();
  const auth = useContext(AuthContext);
  const state = location.state;
  return (
    <>
      <Routes
        location={
          location.state?.backgroundLocation
            ? location.state.backgroundLocation
            : location
        }
      >
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="sign-in" element={<Login />} />
        </Route>
      </Routes>
      <Routes>
        <Route path="/job/:jobId" element={<JobDetailModal />}></Route>
      </Routes>
      {state && auth.user ? (
        <Routes>
          <Route path="/job/:jobId" element={<JobDetailModal />}></Route>
        </Routes>
      ) : (
        <Routes>
          <Route path="/job/:jobId" element={<Login />}></Route>
        </Routes>
      )}
    </>
  );
}

export default App;
