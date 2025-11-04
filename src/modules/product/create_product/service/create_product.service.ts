import { Injectable } from "@nestjs/common";
import { productCreateDTO } from "../dto/product_create_dto";
import { Product } from "../../shared/models/Product";
import { AppError } from "src/shared/AppError";
import { IProductRepository } from "../../shared/abstract_class/IProductRepository";

@Injectable()
export class CreateProductService {
  constructor(
    private readonly productRepository: IProductRepository,
  ) { }

  public async create(data: productCreateDTO): Promise<Product> {
    const productExists = await this.productRepository.findByName(data.name);
    if (productExists) {
      throw new AppError(
        "Produto já está cadastrado.",
        400
      );
    }
    const createProduct = await this.productRepository.create(data);
    return createProduct;
  }
}