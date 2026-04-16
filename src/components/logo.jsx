import React from "react";
import { useNavigate } from "react-router-dom";

function Logo() {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate("/")}
      className="w-8 h-8 rounded-lg bg-fg text-bg flex items-center justify-center text-sm font-bold cursor-pointer hover:bg-fg-dim transition-colors shrink-0"
      aria-label="Home"
    >
      T
    </button>
  );
}

export default Logo;
