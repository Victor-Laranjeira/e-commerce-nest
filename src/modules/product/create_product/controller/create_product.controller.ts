import { Body, Controller, Post } from "@nestjs/common";
import { productCreateDTO } from "../dto/product_create_dto";
import { Product } from "../../shared/models/Product";
import { CreateProductService } from "../service/create_product.service";

@Controller('product')
export class CreateProductController {
  constructor(
    private readonly createProductService: CreateProductService,
  ) { }

  @Post()
  public async create(
    @Body() data: productCreateDTO
  ): Promise<Product> {
    return await this.createProductService.create(data);
  }
}