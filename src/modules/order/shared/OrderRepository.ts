import { PrismaService } from "src/modules/prisma/prisma.service";
import { IOrderRepository } from "./abstract_class/IOrderRepository";
import { Order } from "./models/Order";
import { orderCreateDTO } from "../create_order/dto/orderCreateDTO";
import { OrderItem } from "src/modules/order_item/shared/models/OrderItem";
import { Injectable } from "@nestjs/common";

@Injectable()
class OrderRepository implements IOrderRepository {
  constructor (
    private readonly prisma: PrismaService,
  ) {}

  public async create(
    status: string,
    message: string, 
    customer_id: number,
    // order_items: OrderItem
  ): Promise<Order> {
    const order = await this.prisma
      .getPrismaClient()
      .order.create({
        data: {
          status: status,
          message: message,
          customer_id: customer_id,
        },
        include: {
          items: true,
        }
      });
    return order;
  }

  public async findById(id: number): Promise<Order | null> {
    const order = await this.prisma
      .getPrismaClient()
      .order.findUnique({
        where: {
          id: id,
        },
        include: {
          items: true,
        }
      });
      return order;
  }
}

export { OrderRepository };