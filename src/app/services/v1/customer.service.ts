import { BadRequest, NotFoundException } from '@/domain/exceptions/error.types';
import {
  CustomerMerge,
  CustomerPersist,
  CustomerRequest,
} from '@/dto/request/customer.request';
import {
  PageMetaResponse,
  PageResponse,
} from '@/dto/response/base/page.base.response';
import { CustomerResponse } from '@/dto/response/customer.response';
import { Customer } from '@/models/customer';
import { CustomerRepository } from '@/repository/customer.repository';
import { plainToInstance } from 'class-transformer';
import { Service } from 'typedi';

@Service()
export class CustomerService {
  constructor(private readonly customerRepository: CustomerRepository) {}

  public async one(id: number) {
    const customer = await this.customerRepository.findOneBy({ id });
    if (!customer) {
      throw new NotFoundException(`Customer: ${id} doest not exists`);
    }

    return plainToInstance(CustomerResponse, customer, {
      strategy: 'excludeAll',
    });
  }

  public async list(
    customerRequest: CustomerRequest,
  ): Promise<PageResponse<CustomerResponse>> {
    const pageable = CustomerRequest.get(customerRequest, Customer);

    const { result, total } = await this.customerRepository.page(pageable);

    const meta = new PageMetaResponse(pageable, total, result.length);
    const content = plainToInstance(CustomerResponse, result, {
      strategy: 'excludeAll',
    });

    return new PageResponse(content, meta);
  }

  public async create(customerPersist: CustomerPersist): Promise<number> {
    const customer = await this.customerRepository.findOneBy({
      ein: customerPersist.ein,
    });
    if (customer) {
      throw new NotFoundException(
        `Customer: cnpj ${customerPersist.ein} already exists`,
      );
    }
    const customerName = await this.customerRepository.findOneBy({
      commercialName: customerPersist.commercialName,
    });
    if (customerName) {
      throw new BadRequest(
        `Customer: commercial name ${customerPersist.commercialName} already exists`,
      );
    }
    const entity = plainToInstance(Customer, customerPersist);
    const { id: revenueId } = await this.customerRepository.save(entity);
    return revenueId;
  }

  public async update(
    id: number,
    customerPersist: CustomerPersist,
  ): Promise<void> {
    const customer = await this.customerRepository.findOneBy({ id });
    if (!customer) {
      throw new NotFoundException(`Customer: ${id} doest not exists`);
    }

    const customerEin = await this.customerRepository.findOneBy({
      ein: customerPersist.ein,
    });
    if (customerEin) {
      throw new BadRequest(
        `Customer: cnpj ${customerPersist.ein} already exists`,
      );
    }

    const customerName = await this.customerRepository.findOneBy({
      commercialName: customerPersist.commercialName,
    });
    if (customerName) {
      throw new BadRequest(
        `Customer: commercial name ${customerPersist.commercialName} already exists`,
      );
    }

    const entity = plainToInstance(Customer, { ...customerPersist, id });
    await this.customerRepository.save(entity);
  }

  public async merge(id: number, customerMerge: CustomerMerge): Promise<void> {
    const customer = await this.customerRepository.findOneBy({ id });
    if (!customer) {
      throw new NotFoundException(`Customer: ${id} doest not exists`);
    }

    const entity = plainToInstance(Customer, {
      ...customer,
      ...customerMerge,
    });
    await this.customerRepository.save(entity);
  }

  public async archive(id: number): Promise<void> {
    const customer = await this.customerRepository.findOneBy({ id });
    if (!customer) {
      throw new NotFoundException(`Customer: ${id} doest not exists`);
    }
    await this.customerRepository.softDelete(id);
  }
}
