import { Module } from "@nestjs/common";
import { CreateCustomerController } from "./create_customer/controller/create_client.controller";
import { CreateCustomerService } from "./create_customer/service/create_customer.service";
import { ICustomerRepository } from "./shared/abstract_class/ICustomerRepository";
import { CustomerRepository } from "./shared/CustomerRepository";
import { PrismaService } from "../prisma/prisma.service";

@Module({
  imports: [],
  controllers: [
    CreateCustomerController,
  ],
  providers: [
    CreateCustomerService,
    {
      provide: ICustomerRepository,
      useClass: CustomerRepository,
    },
    PrismaService,
  ],
})
export class CustomerModule { }