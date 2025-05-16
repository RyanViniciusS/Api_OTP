import express from "express";

import Users_Router from "./router/users.router";

const app = express();
const port = Number(process.env.PORT) || 3001;

app.use(express.json());

app.use("/users", Users_Router);
app.get("/", (req, res) => {
  res.status(200).json({ message: "Api no ar!" });
});

app.listen(port, () => {
  console.log(`🚀 Server is running at http://localhost:${port}`);
});
