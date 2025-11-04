declare module '@prisma/client' {
  export type Client = {
    id: string;
    name: string;
    email: string;
    cpfCnpj: string;
  }
}