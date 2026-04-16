import React from "react";

function CardPicture({ pic, description, last = false }) {
  return (
    <div className="flex flex-col w-[380px] shrink-0">
      <div className="overflow-hidden rounded-xl border border-line">
        {pic}
      </div>
      {!last && <hr className="border-line my-3" />}
      {description && (
        <div className="text-fg-dim text-sm leading-relaxed px-1 py-2">
          {description}
        </div>
      )}
    </div>
  );
}

export default CardPicture;
