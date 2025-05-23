import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
import routes from "./routes";
import { mongoService } from "./services/mongo";

const server = express();
server.use(cookieParser());
server.use(bodyParser.json());

server.use(cors({ origin: "http://localhost:3004", credentials: true }));
const jsonParser = bodyParser.json();
server.use(jsonParser);

mongoService.connect();

server.get("/", (req, res) => {
  res.send("Skidoodle Authentication");
});

routes(server);

export default server;
