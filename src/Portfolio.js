import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Terminal from "./components/Terminal";
import CommandButtons from "./components/CommandButtons";
import useCommandHandler from "./hooks/useCommandHandler";

const GITHUB_USERNAME = "metey12";
const GITHUB_API_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos`;

const Portfolio = () => {
  const terminalRef = useRef(null);
  const inputRef = useRef(null);

  const {
    input,
    setInput,
    output,
    isTyping,
    showContactForm,
    handleKeyDown,
    handleInputChange,
    handleButtonClick,
    contactFormHandlers,
    filteredSuggestions,
    ContactForm,
  } = useCommandHandler({
    githubApiUrl: GITHUB_API_URL,
    terminalRef,
    inputRef,
  });

  return (
    <div className="bg-[#1e1e1e] text-green-400 p-6 font-mono h-screen flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        </div>
        <div className="text-sm">mete.wtf/bash</div>
      </div>

      <Terminal
        terminalRef={terminalRef}
        inputRef={inputRef}
        input={input}
        setInput={setInput}
        output={output}
        isTyping={isTyping}
        showContactForm={showContactForm}
        handleKeyDown={handleKeyDown}
        handleInputChange={handleInputChange}
        contactForm={ContactForm}
        filteredSuggestions={filteredSuggestions}
      />

      <CommandButtons
        onClick={handleButtonClick}
        disabled={isTyping || showContactForm}
      />
    </div>
  );
};

export default Portfolio;
