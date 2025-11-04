import { Order } from "src/modules/order/shared/models/Order";
import { Product } from "src/modules/product/shared/models/Product";

export class OrderItem {
  id?: number;
  quantity: number;
  product?: Product;
  product_id: number;
  order?: Order;
  order_id: number;
}