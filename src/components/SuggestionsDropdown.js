import React from "react";

const SuggestionsDropdown = ({ suggestions, onSelect }) => (
  <div className="absolute left-0 bottom-full mb-2 p-2 bg-gray-800 rounded-lg shadow-lg">
    {suggestions.map((suggestion, index) => (
      <div
        key={index}
        className="cursor-pointer text-sm text-yellow-400 hover:text-white transition-colors"
        onClick={() => onSelect(suggestion)}
      >
        {suggestion}
      </div>
    ))}
  </div>
);

export default SuggestionsDropdown;
