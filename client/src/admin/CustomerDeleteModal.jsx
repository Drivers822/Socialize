// src/components/CustomerDeleteModal.jsx
import React, { useState, useEffect } from 'react';
import '../Styles/CustomerDeleteModal.css';

const CustomerDeleteModal = ({ show, customerId, onCancel, onConfirm }) => {
  const [input, setInput] = useState('');

  useEffect(() => {
    if (show) setInput('');
  }, [show]);

  const handleInput = (e) => setInput(e.target.value);

  const handlePaste = (e) => e.preventDefault(); // block paste
  const handleKeyDown = (e) => {
    if (e.ctrlKey && e.key.toLowerCase() === 'v') e.preventDefault(); // block Ctrl+V
  };

  const confirm = () => {
    if (input.trim() === customerId) {
      onConfirm();
    } else {
      alert('❌ Customer ID does not match.');
    }
  };

  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h3>⚠️ Confirm Deletion</h3>
        <p>Please type the Customer ID <b>({customerId})</b> manually to confirm.</p>
        <input
          type="text"
          value={input}
          onChange={handleInput}
          onPaste={handlePaste}
          onKeyDown={handleKeyDown}
          placeholder="Type Customer ID"
        />
        <div className="modal-actions">
          <button onClick={onCancel}>Cancel</button>
          <button disabled={!input.trim()} onClick={confirm}>Confirm</button>
        </div>
      </div>
    </div>
  );
};

export default CustomerDeleteModal;
