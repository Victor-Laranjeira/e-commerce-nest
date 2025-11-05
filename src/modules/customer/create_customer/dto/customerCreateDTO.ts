import { IsEmail, IsString, } from "class-validator";

export class customerCreateDTO {
  @IsEmail()
  email: string;

  @IsString({ message: 'Nome deve ser válido.' })
  name: string;

  @IsString()
  cpfCnpj: string;
}