import React from "react";

export const ValidationErrors = (props) => {
  return props.errors
    ? props.errors.map((e) => (
        <span key={e} className="error">
          {e}
        </span>
      ))
    : null;
};
