import "dotenv/config";
import express from "express";
import cors from "cors";
import { GoogleGenAI } from "@google/genai";

const app = express();
app.use(cors());
app.use(express.json());

const DAILY_LIMIT = 5;
const usageMap = {};

function getToday() {
  return new Date().toISOString().split("T")[0];
}

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

app.post("/api/chat", async (req, res) => {
  try {
    let userIp = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

    if (userIp === "::1") userIp = "127.0.0.1";

    const today = getToday();

    if (!usageMap[userIp] || usageMap[userIp].date !== today) {
      usageMap[userIp] = { count: 0, date: today };
    }

    if (usageMap[userIp].count >= DAILY_LIMIT) {
      return res.status(429).json({
        reply: "Daily limit reached (5 messages). Try again tomorrow.",
      });
    }

    const { message } = req.body;

    // ✅ validate single message
    if (!message || typeof message !== "string") {
      return res.status(400).json({
        reply: "Invalid message",
      });
    }

    usageMap[userIp].count++;

    const result = await ai.models.generateContent({
      model: "models/gemini-flash-latest",
      contents: [
        {
          role: "user",
          parts: [{ text: message }],
        },
      ],
    });

    res.json({ reply: result.text });
  } catch (err) {
    console.error("🔥 Backend error:", err);
    res.status(500).json({
      reply: "Internal error 🤖",
    });
  }
});

app.listen(5000, () => {
  console.log("🤖 Gemini backend running on port 5000");
});
