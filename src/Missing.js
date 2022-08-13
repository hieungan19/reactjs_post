import React from "react";
import { Link } from "react-router-dom";

const Missing = () => {
  return (
    <>
      <h2>Post Not Found</h2>
      <p>Well, that's disappointing</p>
      <p>
        <Link to="/">Visit HomePage</Link>
      </p>
    </>
  );
};

export default Missing;
