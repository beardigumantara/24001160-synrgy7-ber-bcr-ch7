import React from "react";
import styles from "./navbarAdmin.module.css";

const NavbarAdmin: React.FC = () => {
  return (
    <div className={styles.containerNav}>
      <button>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          className="bi bi-list"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
          />
        </svg>
      </button>
      <div className={styles.searchForm}>
        <input type="text" placeholder="Search"/>
        <button style={{padding: "8px"}}>Search</button>
      </div>
    </div>
  );
};

export default NavbarAdmin;
