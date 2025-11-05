import { PrismaService } from "src/modules/prisma/prisma.service";
import { IProductRepository } from "./abstract_class/IProductRepository";
import { Injectable } from "@nestjs/common";
import { productCreateDTO } from "../create_product/dto/product_create_dto";
import { Product } from "./models/Product";

@Injectable()
class ProductRepository implements IProductRepository {
  constructor(private prisma: PrismaService) { }

  public async create(data: productCreateDTO): Promise<Product> {
    const product = await this.prisma
      .getPrismaClient()
      .product.create({
        data,
      });
    return product;
  }

  public async findByName(name: string): Promise<Product | null> {
    const product = await this.prisma
      .getPrismaClient()
      .product.findFirst({
        where: {
          name: name,
        },
      });
    return product;
  }
}

export { ProductRepository };