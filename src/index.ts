import express from "express";
import router from "./router";
import validateEnv from "./utils/validadeEnv";

validateEnv();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(router);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
