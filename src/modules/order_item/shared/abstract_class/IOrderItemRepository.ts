import { OrderItem } from "../models/OrderItem";

abstract class IOrderItemRepository {
  abstract create(data: OrderItem): Promise<void>;
  abstract createMany(data: OrderItem[]): Promise<void>;
  // abstract update(order_id: number): Promise<OrderItem>;
  // abstract findByUserId(
  //   product_id: number,
  //   order_id: number,
  // ): Promise<OrderItem[] | null>
}

export { IOrderItemRepository };