import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
import server from "./server";

declare module "jsonwebtoken" {
  export interface UserIDJwtPayload extends jwt.JwtPayload {
    userId: string;
  }
}

const port = process.env.PORT;

server.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
