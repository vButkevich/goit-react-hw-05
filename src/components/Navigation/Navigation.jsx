// src/components/Navigation/Navigation.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Navigation.module.css";

const Navigation = () => {
  return (
    <nav className={styles.nav}>
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? styles.active : styles.link)}
      >
        Home
      </NavLink>

      <NavLink
        to="/movies"
        className={({ isActive }) => (isActive ? styles.active : styles.link)}
      >
        Movies
      </NavLink>

      <NavLink
        to="/about"
        className={({ isActive }) => (isActive ? styles.active : styles.link)}
      >
        About
      </NavLink>
    </nav>
  );
};

export default Navigation;
