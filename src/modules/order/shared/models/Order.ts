import { OrderItem } from "src/modules/order_item/shared/models/OrderItem";

export class Order {
  id: number;
  status: string;
  message: string;
  customer_id: number;
  // items: OrderItem[];
}