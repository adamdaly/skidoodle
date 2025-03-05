import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
import routes from "./routes";
import { mongoService } from "./services/mongo";

const server = express();
server.use(cookieParser("secret"));
server.use(bodyParser.json());
server.use(cors());
const jsonParser = bodyParser.json();
server.use(jsonParser);

mongoService.connect();

server.get("/", (req, res) => {
  res.send("Skidoodle Authentication");
});

routes(server);

export default server;
