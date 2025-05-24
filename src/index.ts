import express from "express";

import User_Router from "./router/users.router";
import { createLogger } from "./utils/logger";

const logger = createLogger('server')

const app = express();
const port = Number(process.env.PORT) || 3001;

app.use(express.json());

app.use("/user", User_Router);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Api no ar!" });
});

app.listen(port, () => {
  //console.log(`🚀 Server is running at http://localhost:${port}`);
  logger.info(`🚀 Server is running at http://localhost:${port}`);
});
