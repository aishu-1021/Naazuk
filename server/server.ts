import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();
console.log("API KEY:", process.env.GEMINI_API_KEY);

const app = express();
app.use(cors());
app.use(express.json());

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

app.post("/analyze", async (req, res) => {
  try {
    const { incident } = req.body;

    if (!incident) {
      return res.status(400).json({ error: "No incident provided" });
    }

    const prompt = `
You are a funny AI that analyzes ego-related incidents.

Respond ONLY in valid JSON. No extra text.

Format:
{
  "score": number (0-100),
  "verdict": string,
  "summary": string,
  "evidence": [string, string, string]
}

Incident:
"${incident}"
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });

    const text = response.text;

    // Clean JSON safely
    const cleaned = text.replace(/```json|```/g, "").trim();

    let data;
    try {
      data = JSON.parse(cleaned);
    } catch {
      return res.status(500).json({
        error: "AI returned invalid format",
        raw: text,
      });
    }

    res.json(data);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.listen(process.env.PORT || 5000, () => {
  console.log("Server running on port 5000 🔥");
});