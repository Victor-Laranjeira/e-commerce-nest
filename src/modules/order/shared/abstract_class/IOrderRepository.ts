import { Order } from "../models/Order";

abstract class IOrderRepository {
  abstract create(status: string, customer_id: number,): Promise<Order>;
  abstract findById(id: number): Promise<Order | null>;
  abstract getAllByUserId(user_id: number): Promise<Order[]>;
}

export { IOrderRepository };