import { Request, Response } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { CreateClienteDto } from "./cliente.types";
import {
  checkCpfIsAvailable,
  checkEmailIsAvailable,
  createCliente,
  deleteCliente,
  listClientes,
  readCliente,
  updateCliente,
} from "./cliente.service";

const index = async (req: Request, res: Response) => {
  try {
    const clientes = await listClientes();
    res.status(StatusCodes.OK).json(clientes);
  } catch (err) {
    console.error(err);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: ReasonPhrases.INTERNAL_SERVER_ERROR });
  }
};

const create = async (req: Request, res: Response) => {
  const cliente: CreateClienteDto = req.body;

  try {
    const dataNascimento = new Date(cliente.dataNascimento_cliente);
    if (isNaN(dataNascimento.getTime())) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "dataNascimento_cliente deve ser uma data válida." });
    }

    if (
      (await checkCpfIsAvailable(cliente.CPF_cliente)) &&
      (await checkEmailIsAvailable(cliente.email_cliente))
    ) {
      const novoCliente = await createCliente({
        ...cliente,
        dataNascimento_cliente: dataNascimento, // Use o objeto Date aqui
      });
      res.status(StatusCodes.CREATED).json(novoCliente);
    } else {
      res.status(StatusCodes.CONFLICT).json({ error: ReasonPhrases.CONFLICT });
    }
  } catch (err) {
    console.error(err);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: ReasonPhrases.INTERNAL_SERVER_ERROR });
  }
};

const read = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const idNumber = parseInt(id, 10);
    const cliente = await readCliente(idNumber);
    if (!cliente) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: ReasonPhrases.NOT_FOUND });
    }
    res.status(StatusCodes.OK).json(cliente);
  } catch (err) {
    console.error(err);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: ReasonPhrases.INTERNAL_SERVER_ERROR });
  }
};
const update = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedCliente = req.body;

  // Converte dataNascimento_cliente para um objeto Date
  if (updatedCliente.dataNascimento_cliente) {
    updatedCliente.dataNascimento_cliente = new Date(
      updatedCliente.dataNascimento_cliente
    );
    updatedCliente.dataNascimento_cliente.setHours(0, 0, 0, 0); // Zera a parte da hora
  }

  try {
    const idNumber = parseInt(id, 10);
    const cliente = await updateCliente(idNumber, updatedCliente);
    if (!cliente) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: ReasonPhrases.NOT_FOUND });
    }
    res.status(StatusCodes.OK).json(cliente);
  } catch (err) {
    console.error(err);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: ReasonPhrases.INTERNAL_SERVER_ERROR });
  }
};

const remove = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const idNumber = parseInt(id, 10);
    const result = await deleteCliente(idNumber);
    if (!result) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: ReasonPhrases.NOT_FOUND });
    }
    res.status(StatusCodes.NO_CONTENT).json();
  } catch (err) {
    console.error(err);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: ReasonPhrases.INTERNAL_SERVER_ERROR });
  }
};

export default { index, create, read, update, remove };
