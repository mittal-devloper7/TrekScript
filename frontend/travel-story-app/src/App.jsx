import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";

import Login from "./pages/Auth/login";
import Signup from "./pages/Auth/signup";
import Home from "./pages/Home/home";

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
