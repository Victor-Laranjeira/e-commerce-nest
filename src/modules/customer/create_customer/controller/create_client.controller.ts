import { Body, Controller, Post } from "@nestjs/common";
import { customerCreateDTO } from "../dto/customerCreateDTO";
import { Customer } from "../../shared/models/Customer";
import { CreateCustomerService } from "../service/create_customer.service";

@Controller('customer')
export class CreateCustomerController {
  constructor (
    private readonly createCustomerService: CreateCustomerService,
  ) {}

  @Post()
  public async create(
    @Body() data: customerCreateDTO,
  ): Promise<Customer> {
    return await this.createCustomerService.create(data);
  }
}