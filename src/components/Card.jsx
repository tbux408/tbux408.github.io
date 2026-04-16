import React from "react";

function Card({ title, pic, description, onClick, full = false }) {
  const isClickable = typeof onClick === "function";
  return (
    <div
      className={`
        rounded-2xl bg-card border border-line p-4 flex flex-col gap-3
        transition-all duration-200
        ${isClickable ? "cursor-pointer hover:bg-card-hi hover:border-line-hi hover:shadow-lg hover:-translate-y-0.5" : ""}
        ${full ? "w-full" : "w-[220px] shrink-0"}
      `}
      onClick={isClickable ? onClick : undefined}
    >
      {title && <div className="text-fg">{title}</div>}
      {pic && (
        <div className="flex items-center justify-center overflow-hidden rounded-xl">
          {pic}
        </div>
      )}
      <hr className="border-line" />
      {description && <div className="text-fg-dim text-sm">{description}</div>}
    </div>
  );
}

export default Card;
