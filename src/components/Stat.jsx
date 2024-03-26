import React from "react";

const Stat = ({ parameter, value, units }) => {
  return (
    <div className="stat">
      <div className="parameter">{parameter}</div>
      <div className="value">
        {value}
        <span className="unit">{units}</span>
      </div>
    </div>
  );
};

export default Stat;
