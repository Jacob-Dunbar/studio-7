import React from "react";

const Button = (props) => {
  return (
    <button onClick={() => props.onClick} className="" type="button">
      Button
    </button>
  );
};

export default Button;
