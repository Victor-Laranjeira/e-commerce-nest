import { IsArray, IsNumber, IsOptional, IsString } from "class-validator";

export class orderCreateDTO {
  @IsString()
  @IsOptional()
  status: string;

  @IsString()
  @IsOptional()
  message: string;

  @IsArray()
  quantity: number;

  @IsArray()
  product_name?: string[];

  @IsNumber()
  @IsOptional()
  product_id?: number;
}