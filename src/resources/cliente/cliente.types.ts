import { Cliente } from "@prisma/client";

export type CreateClienteDto = Pick<
  Cliente,
  | "nomeCompleto_cliente"
  | "CPF_cliente"
  | "NCelular_cliente"
  | "email_cliente"
  | "dataNascimento_cliente"
  | "Enderecos_cliente"
>;
