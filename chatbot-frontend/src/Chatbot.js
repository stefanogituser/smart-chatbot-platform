import React, { useState } from "react";
import axios from "axios";

const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");

    const sendMessage = async () => {
        if (!input.trim()) return;

        // Add user message to chat
        const newMessages = [...messages, { sender: "user", text: input }];
        setMessages(newMessages);
        setInput("");

        try {
            // Send request to backend
            const response = await axios.post("http://localhost:5000/chat", {
                message: input,
            });

            // Add chatbot response to chat
            setMessages([...newMessages, { sender: "bot", text: response.data.reply }]);
        } catch (error) {
            console.error("Error:", error);
            setMessages([...newMessages, { sender: "bot", text: "Error connecting to AI." }]);
        }
    };

    return (
        <div style={{ maxWidth: "500px", margin: "auto", textAlign: "center" }}>
            <h2>AI Chatbot</h2>
            <div style={{ border: "1px solid #ccc", padding: "10px", height: "300px", overflowY: "auto" }}>
                {messages.map((msg, index) => (
                    <div key={index} style={{ textAlign: msg.sender === "user" ? "right" : "left" }}>
                        <strong>{msg.sender === "user" ? "You: " : "Bot: "}</strong> {msg.text}
                    </div>
                ))}
            </div>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                style={{ width: "80%", padding: "8px", marginTop: "10px" }}
            />
            <button onClick={sendMessage} style={{ padding: "8px", marginLeft: "10px" }}>Send</button>
        </div>
    );
};

export default Chatbot;
