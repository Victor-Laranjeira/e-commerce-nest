import { Injectable } from "@nestjs/common";
import { IOrderRepository } from "../../shared/abstract_class/IOrderRepository";
import { ICustomerRepository } from "src/modules/customer/shared/abstract_class/ICustomerRepository";
import { AppError } from "src/shared/AppError";
import { Order } from "../../shared/models/Order";

@Injectable()
export class GetOrderService {
  constructor (
    private readonly orderRepository: IOrderRepository,
    private readonly customerRepository: ICustomerRepository,
  ) { }

  public async getAllByUser(customer_id: number): Promise<Order[]> {
    const customerExists = await this.customerRepository.findById(customer_id);
    if (!customerExists) {
      throw new AppError(
        'Usuário não existe.',
        400
      );
    }
    const orderList = await this.orderRepository.getAllByUserId(customer_id);
    return orderList;
  }
}