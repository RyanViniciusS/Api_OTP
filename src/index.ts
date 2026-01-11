import express from "express";

import { log } from "./utils/logger";

import Doc_Router from "@/router/swagger.router"
import User_Router from "@/router/users.router";
import EmailOTP_Router from "@/router/otp/email-otp.router"
import Email_Passowrd from "@/router/password/forgot-password.router";
import AuthRouter from "@/router/auth/auth.router";

const app = express();
const port = Number(process.env.PORT) || 3001;


app.use(express.json());

app.use("/doc", Doc_Router);

app.use("/user", User_Router);
app.use("/emailotp", EmailOTP_Router);
app.use("/forgot-password", Email_Passowrd);
app.use("/auth", AuthRouter);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Api no ar!" });
});

app.listen(port, () => {
  //console.log(`🚀 Server is running at http://localhost:${port}`);
  log.info("Server started", {
    port,
    env: process.env.NODE_ENV,
  })
});
