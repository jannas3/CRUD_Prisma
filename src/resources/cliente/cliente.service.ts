import { PrismaClient, Cliente } from "@prisma/client";
import { CreateClienteDto } from "./cliente.types";

const prisma = new PrismaClient();

export const checkCpfIsAvailable = async (cpf: string): Promise<boolean> => {
  const cliente = await prisma.cliente.findMany({
    where: { CPF_cliente: cpf },
  });
  return cliente.length === 0; // Retorna true se não encontrar clientes com esse CPF
};

export const checkEmailIsAvailable = async (
  email: string
): Promise<boolean> => {
  const cliente = await prisma.cliente.findMany({
    where: { email_cliente: email },
  });
  return cliente.length === 0; // Retorna true se não encontrar clientes com esse e-mail
};

export const createCliente = async (
  cliente: CreateClienteDto
): Promise<Cliente> => {
  return await prisma.cliente.create({ data: cliente });
};

export const listClientes = async (): Promise<Cliente[]> => {
  return await prisma.cliente.findMany();
};

export const readCliente = async (id: number): Promise<Cliente | null> => {
  return await prisma.cliente.findUnique({ where: { IDCliente: id } });
};

export const updateCliente = async (
  id: number,
  cliente: Partial<CreateClienteDto>
): Promise<Cliente | null> => {
  return await prisma.cliente.update({
    where: { IDCliente: id },
    data: cliente,
  });
};

export const deleteCliente = async (id: number): Promise<Cliente | null> => {
  return await prisma.cliente.delete({
    where: { IDCliente: id },
  });
};
