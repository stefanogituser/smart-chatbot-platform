const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors()); // Enable CORS for frontend access

const PORT = process.env.PORT || 5000;

// Hugging Face model endpoint
const model = "microsoft/DialoGPT-medium"; // The new model to use for chat

// ChatGPT API Route
app.post("/chat", async (req, res) => {
    const userMessage = req.body.message;

    try {
        const response = await axios.post(
            `https://api-inference.huggingface.co/models/${model}`,
            {
                inputs: userMessage,  // The user input
            },
            {
                headers: {
                    "Authorization": `Bearer ${process.env.HUGGINGFACE_API_KEY}`, // Ensure your Hugging Face API key is set correctly
                    "Content-Type": "application/json",
                },
            }
        );

        // Return the model's response
        res.json({ reply: response.data[0].generated_text });
    } catch (error) {
        console.error("Hugging Face API Error:", error.response ? error.response.data : error.message);
        res.status(500).json({ error: "Error connecting to AI." });
    }
});

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
