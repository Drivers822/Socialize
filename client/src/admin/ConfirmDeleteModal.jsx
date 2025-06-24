// src/components/ConfirmDeleteModal.jsx
import React, { useState, useEffect } from 'react';

const ConfirmDeleteModal = ({ show, driverId, onCancel, onConfirm }) => {
  const [input, setInput] = useState('');

  useEffect(() => {
    setInput('');
  }, [show]);

  const handleChange = (e) => {
    const value = e.target.value;
    setInput(value);
  };

  const handlePaste = (e) => {
    e.preventDefault(); // ❌ block paste
  };

  const handleKeyDown = (e) => {
    if (e.ctrlKey && e.key.toLowerCase() === 'v') {
      e.preventDefault(); // ❌ block Ctrl+V
    }
  };

  const handleSubmit = () => {
    if (input.trim() === driverId) {
      onConfirm();
    } else {
      alert("❌ Driver ID does not match.");
    }
  };

  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h3>⚠️ Confirm Deletion</h3>
        <p>Please type the Driver ID <b>({driverId})</b> manually to confirm.</p>
        <input
          type="text"
          value={input}
          onChange={handleChange}
          onPaste={handlePaste}
          onKeyDown={handleKeyDown}
          placeholder="Type Driver ID"
        />
        <div className="modal-actions">
          <button onClick={onCancel}>Cancel</button>
          <button disabled={input.trim() === ''} onClick={handleSubmit}>Confirm</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
