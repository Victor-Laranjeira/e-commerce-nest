import { Module } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateProductController } from "./create_product/controller/create_product.controller";
import { CreateProductService } from "./create_product/service/create_product.service";
import { ProductRepository } from "./shared/ProductRepository";
import { IProductRepository } from "./shared/abstract_class/IProductRepository";

@Module({
  imports: [],
  controllers: [
    CreateProductController,
  ],
  providers: [
    CreateProductService,
    {
      provide: IProductRepository,
      useClass: ProductRepository,
    },
    PrismaService,
  ],
})
export class ProductModule {}