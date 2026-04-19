import dotenv from "dotenv";
dotenv.config({ quiet: true });
import OpenAI from "openai";
import rules from "./llmrules.mjs";

class AsterikLLM {
  constructor() {
    this.client = new OpenAI({
      apiKey: process.env.ASTERIK_LLM_API_KEY,
      baseURL: "https://openrouter.ai/api/v1",
    });
  }

  async processData(prompt) {
    try {
      const response = await this.client.chat.completions.create({
        model: process.env.LLM_MODEL,
        max_tokens: 500,
        temperature: 0.3,
        messages: [
          {
            role: "system",
            content: rules,
          },
          {
            role: "user",
            content: [
              {
                type: "image_url",
                image_url: {
                  url: prompt,
                },
              },
            ],
          },
        ],
      });
      return response.choices[0].message.content;
    } catch (error) {
      console.error("LLM Error:", error);
      throw error;
    }
  }
}

export default new AsterikLLM();
