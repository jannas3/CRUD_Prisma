import { Router } from "express";
import clienteRouter from "../resources/cliente/cliente.router";

const router = Router();

router.use("/api/cliente", clienteRouter);

export default router;
