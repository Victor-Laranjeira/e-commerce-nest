import { productCreateDTO } from "../../create_product/dto/product_create_dto";
import { Product } from "../models/Product";

abstract class IProductRepository {
  abstract create(data: productCreateDTO): Promise<Product>;
  abstract findByName(name: string): Promise<Product | null>
}

export { IProductRepository }