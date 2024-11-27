import { cleanEnv, port, str, url } from "envalid";
import { config as dotenvConfig } from "dotenv";

dotenvConfig();

function validateEnv() {
  cleanEnv(process.env, {
    PORT: port({ desc: "numero da porta para o servidor" }),
    NODE_ENV: str({
      choices: ["development", "production", "test"],
      desc: "tipos de ambientes",
    }),
    DB_SERVER: url({ desc: "URL de conexão com o banco de dados" }),
  });
}
export default validateEnv;
