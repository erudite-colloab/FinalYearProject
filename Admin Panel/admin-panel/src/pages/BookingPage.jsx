import  { useState } from 'react';
import styles from './Bookings.module.css';

const Bookings = () => {
  const [bookings, setBookings] = useState([
    { id: 1, customerName: 'John Doe', contact: '0509909213', route: 'Kumasi - Accra', busNum: 'GT 3030-21', bookingDate: '2024-08-01', travelDate: '2024-08-10', status: 'Confirmed', amountPaid: '100 GHC' },
    { id: 2, customerName: 'Jane Smith', contact: '050996613', route: 'Accra - Kumasi', busNum: 'AS 4040-22', bookingDate: '2024-08-05', travelDate: '2024-08-12', status: 'Pending', amountPaid: '90 GHC' },
    { id: 3, customerName: 'Robert Brown', contact: '0899909213', route: 'Kumasi - Takoradi', busNum: 'ER 2012-23', bookingDate: '2024-08-07', travelDate: '2024-08-14', status: 'Canceled', amountPaid: '70 GHC' },
  ]);

  const [filteredBookings, setFilteredBookings] = useState(bookings);
  const [filter, setFilter] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editBooking, setEditBooking] = useState(null);

  const handleFilterChange = (e) => {
    const value = e.target.value.toLowerCase();
    setFilter(value);
    const filtered = bookings.filter(booking =>
      booking.customerName.toLowerCase().includes(value) ||
      booking.route.toLowerCase().includes(value) ||
      booking.status.toLowerCase().includes(value)
    );
    setFilteredBookings(filtered);
  };

  const handleEditBooking = (id) => {
    const bookingToEdit = bookings.find(booking => booking.id === id);
    setEditBooking(bookingToEdit);
    setEditMode(true);
  };

  const handleSaveBooking = () => {
    setBookings(bookings.map(booking =>
      booking.id === editBooking.id ? editBooking : booking
    ));
    setEditMode(false);
    setEditBooking(null);
  };

  const handleCancelBooking = (id) => {
    setBookings(bookings.map(booking =>
      booking.id === id ? { ...booking, status: 'Canceled' } : booking
    ));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditBooking({ ...editBooking, [name]: value });
  };

  return (
    <div className={styles.bookingsContainer}>
      <div className={styles.header}>
        <h1 className={styles.headerTitle}>Manage Bookings</h1>
        <input
          type="text"
          placeholder="Search bookings..."
          value={filter}
          onChange={handleFilterChange}
          className={styles.filterInput}
        />
      </div>

      <div className={styles.bookingSummary}>
        <div className={styles.card}>
          <h3>Total Bookings</h3>
          <p className={styles.summaryNumber}>{bookings.length}</p>
        </div>
        <div className={styles.card}>
          <h3>Confirmed</h3>
          <p className={styles.summaryNumber}>{bookings.filter(booking => booking.status === 'Confirmed').length}</p>
        </div>
        <div className={styles.card}>
          <h3>Pending</h3>
          <p className={styles.summaryNumber}>{bookings.filter(booking => booking.status === 'Pending').length}</p>
        </div>
        <div className={styles.card}>
          <h3>Canceled</h3>
          <p className={styles.summaryNumber}>{bookings.filter(booking => booking.status === 'Canceled').length}</p>
        </div>
      </div>

      <div className={styles.bookingManagementTable}>
        <h3>All Bookings</h3>
        <table>
          <thead>
            <tr>
              <th>Customer Name</th>
              <th>Contact</th>
              <th>Route</th>
              <th>Bus Number</th>
              <th>Booking Date</th>
              <th>Travel Date</th>
              <th>Status</th>
              <th>Amount Paid</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.map(booking => (
              <tr key={booking.id}>
                <td>{booking.customerName}</td>
                <td>{booking.contact}</td>
                <td>{booking.route}</td>
                <td>{booking.busNum}</td>
                <td>{booking.bookingDate}</td>
                <td>{booking.travelDate}</td>
                <td>{booking.status}</td>
                <td>{booking.amountPaid}</td>
                <td className={styles.tableActions}>
                  <button className={styles.edit} onClick={() => handleEditBooking(booking.id)}>Edit</button>
                  <button className={styles.cancel} onClick={() => handleCancelBooking(booking.id)}>Cancel</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editMode && (
        <div className={styles.editBookingForm}>
          <h3>Edit Booking</h3>
          <div className={styles.formGroup}>
            <label htmlFor="customerName">Customer Name</label>
            <input 
              type="text" 
              id="customerName" 
              name="customerName" 
              value={editBooking.customerName} 
              onChange={handleInputChange} 
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="contact">Contact</label>
            <input 
              type="text" 
              id="contact" 
              name="contact" 
              value={editBooking.contact} 
              onChange={handleInputChange} 
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="route">Route</label>
            <input 
              type="text" 
              id="route" 
              name="route" 
              value={editBooking.route} 
              onChange={handleInputChange} 
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="bus">Bus Number</label>
            <input 
              type="text" 
              id="bus" 
              name="bus" 
              value={editBooking.busNum} 
              onChange={handleInputChange} 
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="travelDate">Travel Date</label>
            <input 
              type="date" 
              id="travelDate" 
              name="travelDate" 
              value={editBooking.travelDate} 
              onChange={handleInputChange} 
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="amountPaid">Amount Paid</label>
            <input 
              type="text" 
              id="amountPaid" 
              name="amountPaid" 
              value={editBooking.amountPaid} 
              onChange={handleInputChange} 
            />
          </div>
          <button className={styles.save} onClick={handleSaveBooking}>Save</button>
        </div>
      )}
    </div>
  );
};

export default Bookings;
