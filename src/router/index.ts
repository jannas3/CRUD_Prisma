import { Router } from "express";
import clienteRouter from "../resources/cliente/cliente.router";

const router = Router();

// Rotas da API versão 1
router.use("/v1/cliente", clienteRouter);

export default router;
