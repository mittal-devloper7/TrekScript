import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";

import login from "./pages/Auth/login";
import signup from "./pages/Auth/signup";
import home from "./pages/Home/home";

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/home" element={<home />} />
          <Route path="/login" element={<login />} />
          <Route path="/signup" element={<signup />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
