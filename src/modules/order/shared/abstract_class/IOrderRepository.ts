import { orderCreateDTO } from "../../create_order/dto/orderCreateDTO";
import { Order } from "../models/Order";

abstract class IOrderRepository {
  abstract create(status: string, message: string, customer_id: number,): Promise<Order>;
  abstract findById(id: number): Promise<Order | null>;
}

export { IOrderRepository };