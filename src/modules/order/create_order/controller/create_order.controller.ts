import { Body, Controller, Post } from "@nestjs/common";
import { Order } from "../../shared/models/Order";
import { orderCreateDTO } from "../dto/orderCreateDTO";
import { CurrentUser } from "src/modules/auth/decorators/current_user.decorator";
import { Customer } from "src/modules/customer/shared/models/Customer";
import { CreateOrderService } from "../service/create_order.service";

@Controller('customer/:customerId/order')
export class CreateOrderController {
  constructor (
    private readonly createOrderService: CreateOrderService,
  ) {}

  @Post()
  public async create(
    @Body() data: orderCreateDTO,
    @CurrentUser() customer_id: number,
  ): Promise<Order> {
    return await this.createOrderService.create(data, customer_id);
  }
}