import React from "react";

const ContactForm = ({ onSubmit, isTyping }) => (
  <form onSubmit={onSubmit} className="my-4">
    <div className="flex flex-col space-y-2 mb-2">
      <label htmlFor="name" className="text-gray-400">Name:</label>
      <input type="text" id="name" name="name" className="bg-transparent border-b border-gray-500 text-green-400 outline-none" required />
    </div>
    <div className="flex flex-col space-y-2 mb-2">
      <label htmlFor="email" className="text-gray-400">Email:</label>
      <input type="email" id="email" name="email" className="bg-transparent border-b border-gray-500 text-green-400 outline-none" required />
    </div>
    <div className="flex flex-col space-y-2 mb-4">
      <label htmlFor="message" className="text-gray-400">Message:</label>
      <textarea id="message" name="message" rows="4" className="bg-transparent border border-gray-500 text-green-400 outline-none" required />
    </div>
    <button
      type="submit"
      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500 transition-colors"
      disabled={isTyping}
    >
      Send Message
    </button>
  </form>
);

export default ContactForm;
