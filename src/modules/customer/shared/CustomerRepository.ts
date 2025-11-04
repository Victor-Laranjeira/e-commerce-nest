import { PrismaService } from "src/modules/prisma/prisma.service";
import { ICustomerRepository } from "./abstract_class/ICustomerRepository";
import { customerCreateDTO } from "../create_customer/dto/customerCreateDTO";
import { Customer } from "./models/Customer";
import { Injectable } from "@nestjs/common";

@Injectable()
class CustomerRepository implements ICustomerRepository {
  constructor (private prisma: PrismaService) {}

  public async create(data: customerCreateDTO): Promise<Customer> {
    const customer = await this.prisma
    .getPrismaClient()
    .customer.create({
      data,
    });
    return customer;
  }

  public async findById(id: number): Promise<Customer | null> {
    const customer = await this.prisma
      .getPrismaClient()
      .customer.findUnique({
        where: {
          id: id,
        }
      });
    return customer;
  }

  public async findByEmail(email: string): Promise<Customer | null> {
    const customer = await this.prisma
    .getPrismaClient()
    .customer.findUnique({
      where: {
        email: email,
      },
    });
    return customer;
  }
}

export { CustomerRepository };