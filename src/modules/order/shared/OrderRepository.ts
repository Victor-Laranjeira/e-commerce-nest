import { PrismaService } from "src/modules/prisma/prisma.service";
import { IOrderRepository } from "./abstract_class/IOrderRepository";
import { Order } from "./models/Order";
import { Injectable } from "@nestjs/common";

@Injectable()
class OrderRepository implements IOrderRepository {
  constructor(
    private readonly prisma: PrismaService,
  ) { }

  public async create(
    status: string,
    customer_id: number,
  ): Promise<Order> {
    const order = await this.prisma
      .getPrismaClient()
      .order.create({
        data: {
          status: status,
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

  public async getAllByUserId(user_id: number): Promise<Order[]> {
    const order = await this.prisma
      .getPrismaClient()
      .order.findMany({
        where: {
          customer_id: user_id,
        },
        include: {
          items: true,
        },
      });
    return order;
  }
}

export { OrderRepository };