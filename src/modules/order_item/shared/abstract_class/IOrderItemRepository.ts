import { OrderItem } from "../models/OrderItem";

abstract class IOrderItemRepository {
  abstract create(data: OrderItem): Promise<void>;
  abstract createMany(data: OrderItem[]): Promise<void>;
}

export { IOrderItemRepository };