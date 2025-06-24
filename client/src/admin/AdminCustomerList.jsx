// import React, { useEffect, useState } from 'react';
// import '../Styles/AdminCustomerList.css';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';

// const AdminCustomerList = () => {
//   const [bookings, setBookings] = useState([]);
//   const [startDate, setStartDate] = useState(null);
//   const [endDate, setEndDate] = useState(null);

//   useEffect(() => {
//     fetchBookings();
//   }, []);

//   const fetchBookings = () => {
//     fetch('http://localhost:5000/api/customer/bookings')
//       .then(res => res.json())
//       .then(setBookings)
//       .catch(err => console.error('Fetch error:', err));
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this booking?")) return;

//     try {
//       const res = await fetch(`http://localhost:5000/api/customer/bookings/${id}`, {
//         method: 'DELETE'
//       });

//       if (res.ok) {
//         setBookings(prev => prev.filter(b => b._id !== id));
//         alert('Booking deleted successfully ✅');
//       } else {
//         alert('Failed to delete booking ❌');
//       }
//     } catch (err) {
//       console.error('Delete error:', err);
//       alert('An error occurred ❌');
//     }
//   };

//   const exportToCSV = () => {
//     const headers = ['Customer ID', 'Full Name', 'Booking Date', 'Vehicle Type', 'Pickup Location', 'Drop Location'];
//     const rows = filteredBookings.map(b => [
//       b.customerId, b.fullName, b.bookingDate, b.vehicleType, b.pickupLocation, b.dropLocation
//     ]);

//     const csvContent = "data:text/csv;charset=utf-8," +
//       [headers, ...rows].map(e => e.join(",")).join("\n");

//     const encodedUri = encodeURI(csvContent);
//     const link = document.createElement("a");
//     link.setAttribute("href", encodedUri);
//     link.setAttribute("download", "customer_bookings.csv");
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   const filteredBookings = bookings.filter(b => {
//     const date = new Date(b.bookingDate);
//     return (!startDate || date >= startDate) && (!endDate || date <= endDate);
//   });

//   return (
//     <div className="admin-booking-page">
//       <header>
//         <h1>📋 Customer Bookings</h1>
//         <div className="filters">
//           <DatePicker selected={startDate} onChange={setStartDate} placeholderText="Start Date" />
//           <DatePicker selected={endDate} onChange={setEndDate} placeholderText="End Date" />
//           <button onClick={exportToCSV}>📤 Export CSV</button>
//         </div>
//       </header>

//       {filteredBookings.length === 0 ? (
//         <div className="empty-state">🚫 No bookings found</div>
//       ) : (
//         <div className="table-wrapper">
//           <table>
//             <thead>
//               <tr>
//                 <th>#</th>
//                 <th>Name</th>
//                 <th>Customer ID</th>
//                 <th>Date</th>
//                 <th>Vehicle</th>
//                 <th>Pickup</th>
//                 <th>Drop</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredBookings.map((c, i) => (
//                 <tr key={c._id}>
//                   <td>{i + 1}</td>
//                   <td>{c.fullName}</td>
//                   <td>{c.customerId}</td>
//                   <td>{c.bookingDate}</td>
//                   <td><span className="pill dark">{c.vehicleType}</span></td>
//                   <td><span className="pill green">{c.pickupLocation}</span></td>
//                   <td><span className="pill red">{c.dropLocation}</span></td>
//                   <td>
//                     <button className="delete-btn" onClick={() => handleDelete(c._id)}>🗑️</button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminCustomerList;
import React, { useEffect, useState } from 'react';
import '../Styles/AdminCustomerList.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import CustomerDeleteModal from './CustomerDeleteModal';

const AdminCustomerList = () => {
  const [bookings, setBookings] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = () => {
    fetch('http://localhost:5000/api/customer/bookings')
      .then(res => res.json())
      .then(setBookings)
      .catch(err => console.error('Fetch error:', err));
  };

  const requestDelete = (booking) => {
    const confirm1 = window.confirm("Are you sure you want to delete this booking?");
    if (!confirm1) return;
    setSelectedBooking(booking);
    setShowModal(true);
  };

  const cancelDelete = () => {
    setShowModal(false);
    setSelectedBooking(null);
  };

  const confirmDelete = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/customer/bookings/${selectedBooking._id}`, {
        method: 'DELETE'
      });

      if (res.ok) {
        setBookings(prev => prev.filter(b => b._id !== selectedBooking._id));
        alert('✅ Booking deleted');
      } else {
        alert('❌ Failed to delete booking');
      }
    } catch (err) {
      console.error('Delete error:', err);
      alert('❌ Something went wrong');
    } finally {
      cancelDelete();
    }
  };

  const exportToCSV = () => {
    const headers = ['Customer ID', 'Full Name', 'Booking Date', 'Vehicle Type', 'Pickup Location', 'Drop Location'];
    const rows = filteredBookings.map(b => [
      b.customerId, b.fullName, b.bookingDate, b.vehicleType, b.pickupLocation, b.dropLocation
    ]);
    const csvContent = "data:text/csv;charset=utf-8," +
      [headers, ...rows].map(e => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "customer_bookings.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredBookings = bookings.filter(b => {
    const date = new Date(b.bookingDate);
    return (!startDate || date >= startDate) && (!endDate || date <= endDate);
  });

  // Function to handle going back to the previous page
  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="admin-booking-page">
      <header>
        <h1>📋 Customer Bookings</h1>
        <button onClick={handleGoBack} className="back-btn">⬅️ Back</button> {/* Back Button */}
        <div className="filters">
          <DatePicker selected={startDate} onChange={setStartDate} placeholderText="Start Date" />
          <DatePicker selected={endDate} onChange={setEndDate} placeholderText="End Date" />
          <button onClick={exportToCSV}>📤 Export CSV</button>
        </div>
      </header>

      {filteredBookings.length === 0 ? (
        <div className="empty-state">🚫 No bookings found</div>
      ) : (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Customer ID</th>
                <th>Date</th>
                <th>Vehicle</th>
                <th>Pickup</th>
                <th>Drop</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map((c, i) => (
                <tr key={c._id}>
                  <td>{i + 1}</td>
                  <td>{c.fullName}</td>
                  <td>{c.customerId}</td>
                  <td>{c.bookingDate}</td>
                  <td><span className="pill dark">{c.vehicleType}</span></td>
                  <td><span className="pill green">{c.pickupLocation}</span></td>
                  <td><span className="pill red">{c.dropLocation}</span></td>
                  <td>
                    <button className="delete-btn" onClick={() => requestDelete(c)}>🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <CustomerDeleteModal
        show={showModal}
        customerId={selectedBooking?.customerId}
        onCancel={cancelDelete}
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default AdminCustomerList;
