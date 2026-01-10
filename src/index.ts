import express from "express";

import { createLogger } from "./utils/logger";

import Doc_Router from "./router/swagger.router"
import User_Router from "./router/users.router";
import EmailOTP_Router from "./router/email-otp.router"
import Email_Passowrd from "./router/email-password.router"

const app = express();
const port = Number(process.env.PORT) || 3001;
const logger = createLogger('server')

app.use(express.json());

app.use("/doc", Doc_Router);

app.use("/user", User_Router);
app.use("/emailotp", EmailOTP_Router);
app.use("/email-password", Email_Passowrd);


app.get("/", (req, res) => {
  res.status(200).json({ message: "Api no ar!" });
});

app.listen(port, () => {
  //console.log(`🚀 Server is running at http://localhost:${port}`);
  logger.info(`🚀 Server is running at http://localhost:${port}`);
});
