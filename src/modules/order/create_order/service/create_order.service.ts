import { Inject, Injectable } from "@nestjs/common";
import { orderCreateDTO } from "../dto/orderCreateDTO";
import { Order } from "../../shared/models/Order";
import { AppError } from "src/shared/AppError";
import { OrderItem } from "src/modules/order_item/shared/models/OrderItem";
import { Product } from "src/modules/product/shared/models/Product";
import { IOrderRepository } from "../../shared/abstract_class/IOrderRepository";
import { ICustomerRepository } from "src/modules/customer/shared/abstract_class/ICustomerRepository";
import { IProductRepository } from "src/modules/product/shared/abstract_class/IProductRepository";
import { IOrderItemRepository } from "src/modules/order_item/shared/abstract_class/IOrderItemRepository";
import { ClientProxy } from "@nestjs/microservices";

@Injectable()
export class CreateOrderService {
  constructor(
    private readonly orderRepository: IOrderRepository,
    private readonly customerRepository: ICustomerRepository,
    private readonly productRepository: IProductRepository,
    private readonly orderItemRepository: IOrderItemRepository,
    @Inject('PAYMENT_SERVICE') private customer: ClientProxy,
  ) { }

  public async create(data: orderCreateDTO, customer_id: number): Promise<Order> {
    const customerExists = await this.customerRepository.findById(customer_id);
    if (!customerExists) {
      throw new AppError(
        'O usuário não existe.',
        400
      );
    }
    if (!data.product_name) {
      throw new AppError(
        'Nome do produto não pode ser vazio.',
        400
      );
    }
    let productList: Product[] = [];
    for (let i = 0; i < data.product_name.length; i++) {
      const productExists = await this.productRepository.findByName(data.product_name[i]);
      if (!productExists) {
        throw new AppError(
          `O produto ${data.product_name[i]} não existe`,
          400
        );
      }
      productList.push(productExists);
    }
    const createOrder = await this.orderRepository.create('PENDING_PAYMENT', customerExists.id);
    let orderItemList: OrderItem[] = [];
    for (let i = 0; i < productList.length; i++) {
      if (!data.quantity[i]) {
        throw new AppError(
          `Não foi selecionado quantidade para o produto ${productList[i].name}`,
          400
        );
      }
      orderItemList.push({
        quantity: data.quantity[i],
        product_id: productList[i].id,
        order_id: createOrder.id,
      });
    }
    await this.orderItemRepository.createMany(orderItemList);
    const order = await this.orderRepository.findById(createOrder.id);
    if (!order) {
      throw new AppError(
        'Pedido não encontrado.',
        400
      );
    }
    // this.customer.emit('order_created', {
    //   orderId: order.id,
    //   customerId: order.customer_id,
    //   items: orderItemList.map((item) => ({
    //     product_id: item.product_id,
    //     quantity: item.quantity,
    //   })),
    // });
    return order;
  }
}