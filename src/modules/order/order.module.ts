import { Module } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateOrderController } from "./create_order/controller/create_order.controller";
import { CreateOrderService } from "./create_order/service/create_order.service";
import { CustomerRepository } from "../customer/shared/CustomerRepository";
import { OrderRepository } from "./shared/OrderRepository";
import { ProductRepository } from "../product/shared/ProductRepository";
import { OrderItemRepository } from "../order_item/shared/OrderItemRepository";
import { IOrderItemRepository } from "../order_item/shared/abstract_class/IOrderItemRepository";
import { IProductRepository } from "../product/shared/abstract_class/IProductRepository";
import { ICustomerRepository } from "../customer/shared/abstract_class/ICustomerRepository";
import { IOrderRepository } from "./shared/abstract_class/IOrderRepository";
import { ClientsModule, Transport } from "@nestjs/microservices";

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'PAYMENT_SERVICE',
        transport: Transport.REDIS,
        options: {
          host: 'localhost',
          port: 6379,
        },
      },
    ]),
  ],
  controllers: [
    CreateOrderController,
  ],
  providers: [
    CreateOrderService,
    {
      provide: IOrderRepository,
      useClass: OrderRepository,
    },
    {
      provide: ICustomerRepository,
      useClass: CustomerRepository,
    },
    {
      provide: IProductRepository,
      useClass: ProductRepository,
    },
    {
      provide: IOrderItemRepository,
      useClass: OrderItemRepository,
    },
    PrismaService,
  ],
})
export class OrderModule {}