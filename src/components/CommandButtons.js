import React from "react";

const commands = ["about", "skills", "education", "projects", "contact", "clear"];

const CommandButtons = ({ onClick, disabled }) => (
  <div className="mt-4 flex flex-wrap justify-center space-x-2">
    {commands.map((cmd) => (
      <button
        key={cmd}
        onClick={() => onClick(cmd)}
        disabled={disabled}
        className="bg-gray-700 text-white px-3 py-1 rounded hover:bg-gray-600 transition-colors"
      >
        {cmd}
      </button>
    ))}
  </div>
);

export default CommandButtons;
