import dotenv from "dotenv";
import AsterikLLM from "./AsterikLLM.mjs";
import axios from "axios";

dotenv.config({ quiet: true });
class routeHelper {
  //  functiont check health
  async checkHealth(req, res) {
    try {
      res.status(200).json({ msg: "all system checked" });
    } catch (err) {
      console.log(err);
      res.status(503).json({ error: "Something went wrong" });
    }
  }

  // function to scan document
  async scanDocument(req, res) {
    try {
      const AsterikModule = await AsterikLLM.processData(req.body.input);
      res.status(200).json({ msg: AsterikModule });
    } catch (err) {
      res.status(503).json({ error: "Something went wrong" });
    }
  }

  //  route to process text to speech
  async processTTS(req, res) {
    try {
      const { input } = req.body;
      const response = await axios.post(
        "https://api.fish.audio/v1/tts",
        {
          text: input,
          voice: "default",
          format: "mp3",
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.FISH_TTS_API_KEY}`,
            "Content-Type": "application/json",
          },
          responseType: "arraybuffer",
        },
      );
      res.set({
        "Content-Type": "audio/mpeg",
        "Content-Length": response.data.length,
      });
      console.log(response.data);
      return res.send(response.data);
    } catch (err) {
      console.log(err);
      res.status(503).json({ error: "Something went wrong" });
    }
  }
}

export default new routeHelper();
