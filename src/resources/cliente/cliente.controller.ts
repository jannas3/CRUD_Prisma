import { Request, Response } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
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
  const cliente = req.body;
  try {
    if (
      (await checkCpfIsAvailable(cliente.CPF_cliente)) &&
      (await checkEmailIsAvailable(cliente.email_cliente))
    ) {
      const novoCliente = await createCliente(cliente);
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
