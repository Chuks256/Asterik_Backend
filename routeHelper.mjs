import AsterikLLM from "./AsterikLLM.mjs";

class routeHelper {
  async checkHealth(req, res) {
    try {
      res.status(200).json({ msg: "all system checked" });
    } catch (err) {
      console.log(err);
      res.status(503).json({ error: "Something went wrong" });
    }
  }

  async scanDocument(req, res) {
    try {
      const AsterikModule = await AsterikLLM.processData(req.body.input);
      res.status(200).json({ msg: AsterikModule });
    } catch (err) {
      res.status(503).json({ error: "Something went wrong" });
    }
  }
}

export default new routeHelper();
