import React, { useState } from "react";

interface Props {
  children: React.ReactElement[];
  limit: number;
  className?: string;
}

export function ListDisclosure({ children, limit, className = "" }: Props) {
  const [expanded, toggleExpanded] = useState(false);
  const renderedItems = expanded ? children : children.slice(0, limit);

  return (
    <div className={className}>
      {renderedItems}
      <button
        className="font-semibold text-sm bg-emerald-100 text-gray-900 rounded-full shadow-sm h-10 w-28 mt-4"
        onClick={() => toggleExpanded((s: boolean) => !s)}
      >
        {" "}
        {expanded ? "Collapse" : "See all"}
      </button>
    </div>
  );
}
