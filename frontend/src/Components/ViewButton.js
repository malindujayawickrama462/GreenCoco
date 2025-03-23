import React from "react";
import { useNavigate } from "react-router-dom";
import "./viewb.css";
import './header.css';

const ViewButton = () => {
  const navigate = useNavigate();

  return (
    
    
    <button className="view-btn" onClick={() => navigate("/inventory")}>
      View 
    </button>
    
  );
};

export default ViewButton;
