import { Injectable } from "@nestjs/common";
import { customerCreateDTO } from "../dto/customerCreateDTO";
import { AppError } from "src/shared/AppError";
import { Customer } from "../../shared/models/Customer.js";
import { ICustomerRepository } from "../../shared/abstract_class/ICustomerRepository";

@Injectable()
export class CreateCustomerService {
  constructor(
    private readonly customerRepository: ICustomerRepository,
  ) { }

  public async create(data: customerCreateDTO): Promise<Customer> {
    const customerExists = await this.customerRepository.findByEmail(data.email);
    if (customerExists) {
      throw new AppError(
        'E-mail já cadastrado.',
        400
      );
    }
    if (
      data.cpfCnpj.length !== 11 &&
      data.cpfCnpj.length !== 14
    ) {
      throw new AppError(
        'Cpf ou Cnpj inválido.',
        400
      );
    }
    const createCustomer = await this.customerRepository.create(data);
    return createCustomer;
  }
}