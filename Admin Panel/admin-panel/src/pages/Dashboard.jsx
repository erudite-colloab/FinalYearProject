import  { useState } from 'react';
import styles from './Dashboard.module.css'; // Importing as CSS Module
import adminImg from "../assets/3dmanglasses.jpg"
import { Link } from 'react-router-dom';
import { FaBus, FaRoute, FaUsers, FaMoneyBillWave, FaCogs } from 'react-icons/fa';
import { GiSteeringWheel, GiHamburgerMenu } from "react-icons/gi";
import { BiSolidReport } from "react-icons/bi";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={styles.dashboardContainer}>
      <div className={`${styles.sidebar} ${isSidebarOpen ? '' : styles.closed}`}>
        <div className={styles.adminProfile}>
          <img src={adminImg} alt="Admin" />
          <h2>@admin</h2>
          <p>System Administrator</p>
        </div>
        <ul className={styles.navLinks}>
          <li><FaCogs />  Dashboard</li>
          <li><FaBus /><Link to="/fleet-management">Buses</Link></li>
          <li><FaRoute /><Link to="/route-management"> Routes</Link></li>
          <li><GiSteeringWheel /><Link to="/driver">Drivers</Link></li>
          <li><FaUsers /><Link to="/bookings">Bookings</Link></li>
          <li><FaMoneyBillWave /><Link to="/payment-management"> Manage Payments</Link></li>
          <li><FaMoneyBillWave /><Link to="/bus-tracking"> Bus Tracking</Link></li>
          <li><BiSolidReport /><Link to="/reporting-analytics">Reporting & Analytics</Link></li>
        </ul>
      </div>

      <div className={styles.mainContent}>
        <div className={styles.header}>
          <h1>Welcome, Admin</h1>
          <button className={styles.logoutButton}>Log Out</button>
        </div>
        <div className={styles.cards}>
          <div className={styles.card}>
            <FaBus className={styles.icon} />
            <div className={styles.cardDetails}>
              <h2>Buses</h2>
              <p>Total Buses: 10</p>
              <a href="#">View More</a>
            </div>
          </div>
          <div className={styles.card}>
            <FaRoute className={styles.icon} />
            <div className={styles.cardDetails}>
              <h2>Routes</h2>
              <p>Total Routes: 7</p>
              <a href="#">View More</a>
            </div>
          </div>
          <div className={styles.card}>
            <FaUsers className={styles.icon} />
            <div className={styles.cardDetails}>
              <h2>Customers</h2>
              <p>Total Customers: 6</p>
              <a href="#">View More</a>
            </div>
          </div>
          <div className={styles.card}>
            <FaMoneyBillWave className={styles.icon} />
            <div className={styles.cardDetails}>
              <h2>Earnings</h2>
              <p>Total Earnings: $490</p>
              <a href="#">View More</a>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.hamburger} onClick={toggleSidebar}>
        <GiHamburgerMenu />
      </div>
    </div>
  );
}

export default Dashboard;
