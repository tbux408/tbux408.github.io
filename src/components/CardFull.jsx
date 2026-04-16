import React from "react";

function CardFull({ title, pic, description, onClick, color = "white" }) {
  const isClickable = typeof onClick === "function";
  return (
    <div
      className={`
        relative rounded-2xl overflow-hidden border border-line
        w-[280px] h-[200px] shrink-0
        transition-all duration-200
        ${isClickable ? "cursor-pointer hover:border-line-hi hover:shadow-xl hover:-translate-y-0.5" : ""}
      `}
      onClick={isClickable ? onClick : undefined}
    >
      {/* Background image */}
      <div className="absolute inset-0">
        {pic}
      </div>
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      {/* Content */}
      <div
        className="absolute bottom-0 left-0 right-0 p-4"
        style={{ color: color }}
      >
        <div className="flex items-center justify-between">{title}</div>
        {description && <div className="text-sm mt-1 opacity-80">{description}</div>}
      </div>
    </div>
  );
}

export default CardFull;
