import React from "react";

const Spinner = () => {
  return (
    <div className="d-flex justify-content-center spinner">
      <div className="spinner-border loading" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default Spinner;