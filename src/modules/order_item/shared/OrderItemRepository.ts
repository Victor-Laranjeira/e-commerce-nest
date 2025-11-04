import { Injectable } from "@nestjs/common";
import { IOrderItemRepository } from "./abstract_class/IOrderItemRepository";
import { OrderItem } from "./models/OrderItem";
import { PrismaService } from "src/modules/prisma/prisma.service";

@Injectable()
class OrderItemRepository implements IOrderItemRepository {
  constructor (
    private readonly prisma: PrismaService,
  ) {}

  public async createMany(data: OrderItem[]): Promise<void> {
    await this.prisma.getPrismaClient().orderItem.createMany({
      data: data
    });
  }

  public async create(data: OrderItem): Promise<void> {
    await this.prisma
      .getPrismaClient()
      .orderItem.create({
        data: {
          quantity: data.quantity,
          order_id: data.order_id,
          product_id: data.product_id,
        }
      });
  }
  // public async update(id: number, order_id: number): Promise<OrderItem> {
  //   const orderItem = await this.prisma
  //     .getPrismaClient()
  //     .orderItem.update({
  //       where: {
  //         id: id,
  //       },
  //       data: {
  //         order_id: order_id
  //       }
  //     })
  // }

  // public async findByUserId(product_id: number, order_id: number): Promise<OrderItem[] | null> {
  //   const orderItem = await this.prisma
  //     .getPrismaClient()
  //     .orderItem.findMany({
  //       where: {
  //         productId: product_id,
  //         orderId: order_id,
  //       }
  //     });
  //   return orderItem;
  // }
}

export { OrderItemRepository };