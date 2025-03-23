import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./update.css";
import Header from "./Header";

const UpdateInventory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [inventory, setInventory] = useState({
    batchId: "",
    totalWeight: "",
    collectionDate: "",
    sourceLocation: "",
    wasteType: "",
    qualityGrade: "",
    processingStatus: "",
    processingMethod: "",
    notes: "",
  });

  useEffect(() => {
    axios
      .get(`http://localhost:8070/inventory/get/${id}`)
      .then((response) => {
        setInventory(response.data.inventory);
      })
      .catch(() => alert("Error fetching inventory details"));
  }, [id]);

  const handleChange = (e) => {
    setInventory({ ...inventory, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:8070/inventory/update/${id}`, inventory)
      .then(() => {
        alert("Inventory updated successfully");
        navigate("/inventory");
      })
      .catch(() => alert("Error updating inventory"));
  };

  return (
    <div>
      <Header />
      <div className="update-form-container">
        <div className="update-form-card">
          <h2>Update Inventory</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Batch ID:</label>
              <input
                type="text"
                name="batchId"
                value={inventory.batchId}
                readOnly
                className="form-input read-only"
              />
            </div>

            <div className="form-group">
              <label>Total Weight (kg):</label>
              <input
                type="number"
                name="totalWeight"
                value={inventory.totalWeight}
                onChange={handleChange}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label>Collection Date:</label>
              <input
                type="date"
                name="collectionDate"
                value={inventory.collectionDate}
                readOnly
                className="form-input read-only"
              />
            </div>

            <div className="form-group">
              <label>Source Location:</label>
              <input
                type="text"
                name="sourceLocation"
                value={inventory.sourceLocation}
                readOnly
                className="form-input read-only"
              />
            </div>

            <div className="form-group">
              <label>Waste Type:</label>
              <input
                type="text"
                name="wasteType"
                value={inventory.wasteType}
                readOnly
                className="form-input read-only"
              />
            </div>

            <div className="form-group">
              <label>Quality Grade:</label>
              <select
                name="qualityGrade"
                value={inventory.qualityGrade}
                onChange={handleChange}
                className="form-input"
              >
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
              </select>
            </div>

            <div className="form-group">
              <label>Processing Status:</label>
              <select
                name="processingStatus"
                value={inventory.processingStatus}
                onChange={handleChange}
                className="form-input"
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            <div className="form-group">
              <label>Processing Method:</label>
              <input
                type="text"
                name="processingMethod"
                value={inventory.processingMethod}
                onChange={handleChange}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label>Notes:</label>
              <textarea
                name="notes"
                value={inventory.notes}
                onChange={handleChange}
                className="form-input"
              ></textarea>
            </div>

            <div className="button-group">
              <button type="submit" className="submit-btn">
                Update
              </button>
              <button
                type="button"
                className="cancel-btn"
                onClick={() => navigate("/inventory")}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateInventory;
