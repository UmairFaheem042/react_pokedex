import React from "react";

const Button = ({ label, onclick }) => {
  return (
    <button onClick={onclick} className="btn">
      {label}
    </button>
  );
};

export default Button;
