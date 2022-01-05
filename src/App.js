import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Airpeace from "./pages/airpeace/airpeace";
import Arik from "./pages/arik/arik";
import "./App.css";
import Apbooking from "./pages/airpeace/apbooking";

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<Airpeace />} />
          <Route exact path="/arik" element={<Arik />} />
          <Route exact path="/apbook" element={<Apbooking />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
