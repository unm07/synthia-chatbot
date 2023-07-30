import React from "react";
import { BrowserRouter as Router, Routes, Route,Switch } from "react-router-dom";
import Login from "./Login.jsx";
import Home from "./Home.jsx";
import Register from "./Register.jsx";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './useAuth';
import PrivateRoute from './privateRoute';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
        </Routes>
      </AuthProvider>
      <ToastContainer
        className="custom-toast"
        position="bottom-center"
        autoClose={1000}
        closeOnClick
      />
    </Router>
  );
}

export default App;
