import React from "react";
import SuggestionsDropdown from "./SuggestionsDropdown";

const Terminal = ({
  terminalRef,
  inputRef,
  input,
  setInput,
  output,
  isTyping,
  showContactForm,
  handleKeyDown,
  handleInputChange,
  contactForm,
  filteredSuggestions,
}) => (
  <div className="flex-1 overflow-y-auto" ref={terminalRef}>
    <div className="whitespace-pre-line">
      {output.map((line, index) => (
        <div key={index}>{line}</div>
      ))}

      {showContactForm && contactForm}

      {!isTyping && !showContactForm && (
        <div className="relative">
          {input.length > 0 && filteredSuggestions.length > 0 && (
            <SuggestionsDropdown
              suggestions={filteredSuggestions}
              onSelect={setInput}
            />
          )}
          <div className="flex items-center mt-2">
            <span className="text-purple-400">mete.wtf</span>:~$
            <input
              type="text"
              className="flex-1 bg-transparent text-green-400 border-none outline-none caret-green-400 ml-2"
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              autoFocus
              ref={inputRef}
            />
          </div>
        </div>
      )}
    </div>
  </div>
);

export default Terminal;
