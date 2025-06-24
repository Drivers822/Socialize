import React, { useState } from 'react';
import '../Styles/CustomerReviews.css';
import Footer from './Footer'; // ✅ Import Footer

const CustomerReviews = () => {
  const [role, setRole] = useState('Customer'); // Default to Customer
  const [name, setName] = useState('');
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Review Submitted:
Role: ${role}
Name: ${name}
Rating: ${rating} stars
Message: ${reviewText}`);
    
    // Reset form fields
    setRole('Customer');
    setName('');
    setRating(0);
    setHoverRating(0);
    setReviewText('');
  };

  return (
    <>
      <div className="reviews-container">
        <h2 className="write-review-heading">Write a Review</h2>

        <form onSubmit={handleSubmit} className="review-form">
          <select
            name="userType"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="">Select Type</option>
            <option value="driver">Driver</option>
            <option value="customer">Customer</option>
          </select>

          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <textarea
            placeholder="Write your review here..."
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            required
          />

          <div className="stars">
            {Array.from({ length: 5 }).map((_, i) => (
              <span
                key={i}
                className={i < (hoverRating || rating) ? 'filled' : ''}
                onClick={() => setRating(i + 1)}
                onMouseEnter={() => setHoverRating(i + 1)}
                onMouseLeave={() => setHoverRating(0)}
              >
                ⭐
              </span>
            ))}
          </div>

          <button type="submit">Submit Review</button>
        </form>
      </div>

      <Footer /> {/* ✅ Footer added */}
    </>
  );
};

export default CustomerReviews;
