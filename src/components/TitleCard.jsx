import React from "react";

function TitleCard({ message, id, action }) {
  return (
    <div
      id={id}
      className="flex items-center justify-between px-6 py-5 border-b border-line"
    >
      <h2 className="text-3xl font-bold text-fg tracking-tight">{message}</h2>
      {action && <div>{action}</div>}
    </div>
  );
}

export default TitleCard;
