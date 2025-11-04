import { customerCreateDTO } from "../../create_customer/dto/customerCreateDTO";
import { Customer } from "../models/Customer";

abstract class ICustomerRepository {
  abstract create(data: customerCreateDTO): Promise<Customer>;
  abstract findById(id: number): Promise<Customer | null>;
  abstract findByEmail(email: string): Promise<Customer | null>;
}

export { ICustomerRepository };