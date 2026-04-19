import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import routeHelper from "./routeHelper.mjs";

dotenv.config({ quiet: true });

const app = express();
const port = 3453 || process.env.PORT;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.disable("x-powered-by");
app.use(bodyParser.json());
app.use(cors());

app.post("/api/v1/scanDocument", routeHelper.scanDocument);
app.get("/api/v1/checkHealth", routeHelper.checkHealth);

app.listen(port, () => {
  console.log("Listening for incoming connection");
});
