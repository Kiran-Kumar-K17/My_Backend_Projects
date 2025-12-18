import React, { useState, useRef, useEffect } from "react";
import UserResponse from "./UserResponse";
import "./UserInput.css";

const UserInput = () => {
  const date = new Date().toDateString();

  const [chatMessages, setChatMessages] = useState([]);

  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef(null);

  // ✅ Auto-scroll on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const handleSubmit = async () => {
    if (!inputText.trim()) return;

    const userMsg = {
      id: crypto.randomUUID(),
      message: inputText,
      sender: "user",
    };

    setChatMessages((prev) => [...prev, userMsg]);
    setInputText("");

    // Add typing indicator
    const typingId = crypto.randomUUID();
    setChatMessages((prev) => [
      ...prev,
      { id: typingId, sender: "robot", message: "Typing..." },
    ]);

    try {
      const res = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg.message }),
      });

      const data = await res.json();

      setChatMessages((prev) =>
        prev
          .filter((msg) => msg.id !== typingId) // ❌ remove typing
          .concat({
            id: crypto.randomUUID(),
            sender: "robot",
            message: data.reply,
          })
      );
    } catch {
      setChatMessages((prev) =>
        prev
          .filter((msg) => msg.message !== "Typing...")
          .concat({
            id: crypto.randomUUID(),
            sender: "robot",
            message: "Robot is temporarily confused 🤖",
          })
      );
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <div className="chat-title">🤖 Web ChatBot</div>
        <div className="chat-subtitle">Ask anything • 5 messages per day</div>
      </div>

      <div className="chat-messages">
        {chatMessages.map((chatMeg) => (
          <UserResponse
            key={chatMeg.id}
            message={chatMeg.message}
            sender={chatMeg.sender}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input-container">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          placeholder="Send a message to Chatbot"
          className="chat-input"
        />
        <button
          className="send-button"
          onClick={handleSubmit}
          disabled={!inputText.trim()}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default UserInput;
