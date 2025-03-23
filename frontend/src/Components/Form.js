import './form.css';
import React, { useState } from 'react';
import axios from 'axios';

const CoconutWasteForm = () => {
  const [formData, setFormData] = useState({
    batchId: '',
    totalWeight: '',
    collectionDate: '',
    sourceLocation: '',
    wasteType: 'Coconut Husk',
    qualityGrade: 'Grade A',
    processingStatus: 'Pending',
    processingMethod: 'Mechanical',
    notes: ''
  });

  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple validation
    let newErrors = {};
    if (!formData.batchId.trim()) newErrors.batchId = 'Batch ID is required';
    if (!formData.totalWeight || formData.totalWeight <= 0)
      newErrors.totalWeight = 'Total Weight must be greater than 0';
    if (!formData.collectionDate) newErrors.collectionDate = 'Collection Date is required';
    if (!formData.sourceLocation.trim()) newErrors.sourceLocation = 'Source Location is required';

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return; // Stop submission if there are errors
    }

    try {
      await axios.post("http://localhost:8070/inventory/add", formData);
      alert("Waste details added successfully!");

      // Reset form
      setFormData({
        batchId: '',
        totalWeight: '',
        collectionDate: '',
        sourceLocation: '',
        wasteType: 'Coconut Husk',
        qualityGrade: 'Grade A',
        processingStatus: 'Pending',
        processingMethod: 'Mechanical',
        notes: ''
      });
    } catch (err) {
      alert("Error adding details: " + err.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="inventory-form">
      <h2>Coconut Waste Inventory Details</h2>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Batch Information</legend>
          <div className="form-group">
            <label>Batch ID</label>
            <input
              type="text"
              name="batchId"
              value={formData.batchId}
              onChange={handleChange}
              required
            />
            {errors.batchId && <span className="error-text">{errors.batchId}</span>}
          </div>
        </fieldset>

        <fieldset>
          <legend>Quantity Details</legend>
          <div className="form-group">
            <label>Total Weight (kg)</label>
            <input
              type="number"
              name="totalWeight"
              value={formData.totalWeight}
              onChange={handleChange}
              required
            />
            {errors.totalWeight && <span className="error-text">{errors.totalWeight}</span>}
          </div>
        </fieldset>

        <fieldset>
          <legend>Collection Date</legend>
          <div className="form-row">
            <div className="form-group">
              <label>Date</label>
              <input
                type="date"
                name="collectionDate"
                value={formData.collectionDate}
                onChange={handleChange}
                required
              />
              {errors.collectionDate && <span className="error-text">{errors.collectionDate}</span>}
            </div>
            <div className="form-group">
              <label>Source Location</label>
              <input
                type="text"
                name="sourceLocation"
                value={formData.sourceLocation}
                onChange={handleChange}
                required
              />
              {errors.sourceLocation && <span className="error-text">{errors.sourceLocation}</span>}
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>Waste Type</legend>
          <div className="form-row">
            <div className="form-group">
              <label>Type</label>
              <select name="wasteType" value={formData.wasteType} onChange={handleChange}>
                <option>Coconut Husk</option>
                <option>Coconut Shell</option>
                <option>Coconut Fiber</option>
                <option>Coconut Charcoal</option>
              </select>
            </div>
            <div className="form-group">
              <label>Quality Grade</label>
              <select name="qualityGrade" value={formData.qualityGrade} onChange={handleChange}>
                <option>Grade A</option>
                <option>Grade B</option>
                <option>Grade C</option>
              </select>
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>Processing Information</legend>
          <div className="form-row">
            <div className="form-group">
              <label>Status</label>
              <select name="processingStatus" value={formData.processingStatus} onChange={handleChange}>
                <option>Pending</option>
                <option>In Progress</option>
                <option>Completed</option>
              </select>
            </div>
            <div className="form-group">
              <label>Notes</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows="3"
              />
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>Processing Method</legend>
          <div className="form-group">
            <select name="processingMethod" value={formData.processingMethod} onChange={handleChange}>
              <option>Mechanical</option>
              <option>Chemical</option>
              <option>Biological</option>
            </select>
          </div>
        </fieldset>

        <div className="form-actions">
          <button type="button" className="cancel-btn" onClick={() => setFormData({
            batchId: '',
            totalWeight: '',
            collectionDate: '',
            sourceLocation: '',
            wasteType: 'Coconut Husk',
            qualityGrade: 'Grade A',
            processingStatus: 'Pending',
            processingMethod: 'Mechanical',
            notes: ''
          })}>Cancel</button>
          <button type="submit" className="submit-btn">Save Details</button>
        </div>
      </form>
    </div>
  );
};

export default CoconutWasteForm;
