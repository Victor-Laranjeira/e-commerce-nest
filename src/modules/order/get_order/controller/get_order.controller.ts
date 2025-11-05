import { Controller, Get } from "@nestjs/common";
import { CurrentUser } from "src/modules/auth/decorators/current_user.decorator";
import { GetOrderService } from "../service/get_order.service";

@Controller('customer/:customerId/order')
export class GetOrderController {
  constructor (
    private readonly getOrderService: GetOrderService,
  ) { }

  @Get()
  public async getAllByUser(
    @CurrentUser() customer_id: number,
  ) {
    return await this.getOrderService.getAllByUser(customer_id);
  }
}