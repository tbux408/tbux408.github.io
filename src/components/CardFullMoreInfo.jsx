import React, { useState } from "react";

function CardFullMoreInfo({ title, pic, description, onClick, color = "white" }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const onClickDiv = (event) => {
    event.stopPropagation();
    setIsExpanded(true);
  };

  return (
    <div
      className="relative rounded-2xl overflow-hidden border border-line w-[280px] h-[200px] shrink-0 cursor-pointer transition-all duration-200 hover:border-line-hi hover:shadow-xl hover:-translate-y-0.5"
      onClick={() => setIsExpanded(false)}
      style={{ color }}
    >
      {/* Background image */}
      <div className="absolute inset-0">{pic}</div>
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
      {/* Title bar at bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <div className="flex items-center justify-between">{title}</div>
        {/* Expandable description */}
        <div
          className={`text-sm mt-2 leading-relaxed overflow-hidden transition-all duration-300 ${
            isExpanded ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
          }`}
          onClick={onClickDiv}
        >
          <hr className="border-white/30 mb-2" />
          {description}
        </div>
      </div>
    </div>
  );
}

export default CardFullMoreInfo;
