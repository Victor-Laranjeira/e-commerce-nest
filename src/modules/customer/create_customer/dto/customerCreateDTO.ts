import { IsEmail, IsNumber, IsString,  } from "class-validator";

export class customerCreateDTO {
  @IsEmail()
  email: string;

  @IsString({ message: 'Nome deve ser válido.'})
  name: string;

  @IsNumber()
  cpfCnpj: number;
}