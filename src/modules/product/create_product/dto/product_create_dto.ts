import { IsNumber, IsString } from "class-validator";

export class productCreateDTO {
  @IsString()
  name: string;

  @IsNumber()
  price: number;

  @IsNumber()
  stock: number;
}