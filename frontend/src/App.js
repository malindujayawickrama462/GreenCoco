import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CocoInventory from "./Pgs/CocoInventory";
import InventoryTable from "./Components/InventaruTable";
import UpdateInventory from "./Components/UpdateInventory"; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CocoInventory />} />
        <Route path="/inventory" element={<InventoryTable />} />
        <Route path="/update/:id" element={<UpdateInventory />} /> 
      </Routes>
    </Router>
  );
}

export default App;
