import React from "react";
const Spinner = ({ fullPage, customClass }) => {
  return (
    <div
      className={`sb-loading${fullPage ? " sb-loading--full-page" : ""}${
        customClass?.length > 0 ? ` ${customClass}` : ""
      }`}
    >
      <div className="spinner"></div>
    </div>
  );
};
export default Spinner;
