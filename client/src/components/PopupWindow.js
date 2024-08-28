import React from "react";

function PopupWindow({ children, show }) {
  if (!show) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-content">{children}</div>
    </div>
  );
}

export default PopupWindow;
