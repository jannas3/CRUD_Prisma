// src/index.ts
import express, { Request, Response } from "express";
import router from "./router";

const app = express();
const PORT = 4466;

app.use(express.json());
app.use(router);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
