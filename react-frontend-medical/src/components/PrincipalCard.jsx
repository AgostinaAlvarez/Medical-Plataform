import React from "react";

const PrincipalCard = ({ title, header, children }) => {
  return (
    <div className="card border-component">
      <div className="card padding-component border-btm-component">
        {title ? title : <>{header}</>}
      </div>
      <div className="card padding-component" style={{ position: "relative" }}>
        {children}
      </div>
    </div>
  );
};

export default PrincipalCard;
