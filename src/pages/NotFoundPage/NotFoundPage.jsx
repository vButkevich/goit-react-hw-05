// import React from 'react';
import { Link } from "react-router-dom";
import css from "./NotFoundPage.module.css";

const NotFoundPage = () => {
  return (
    <div className={css.container}>
      <Link to="/">Go to HomePage</Link>
      <h1>404 - Page Not Found</h1>
    </div>
  );
};

export default NotFoundPage;
