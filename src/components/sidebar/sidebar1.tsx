import React from "react";
import styles from "./sidebar.module.css";
import dashboard from "../../assets/images/dashboard.png";
import carIcon from "../../assets/images/AdminCar.png";

const Sidebar1: React.FC = () => {
  return (
    <div className="d-flex flex-row">
      <div className={styles.navbar}>
        <a href="" className={styles.logo}>
          <span>BCR</span>
        </a>
        <a href="/admin"><img src={dashboard} alt="" /></a>
        <a href="/admin/cars"><img src={carIcon} alt="" /></a>
      </div>
      <div className={styles.sidebar}>  
        <a href="" className={styles.logo1}>
          <span>BCR</span>
        </a>
        <h2>CARS</h2>
        <a href=""><p>Cars</p></a>
      </div>
    </div>
  );
};

export default Sidebar1;
