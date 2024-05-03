import { NotFoundException } from '@/domain/exceptions/error.types';
import { RevenuePersist } from '@/dto/request/revenue.request';
import { Revenue } from '@/models/revenue';
import { CustomerRepository } from '@/repository/customer.repository';
import { RevenueRepository } from '@/repository/revenue.repository';
import { plainToInstance } from 'class-transformer';
import { Service } from 'typedi';

@Service()
export class RevenueService {
  constructor(
    private readonly revenueRepository: RevenueRepository,
    private readonly customerRepository: CustomerRepository,
  ) {}

  public async create(
    custumerId: number,
    revenuePersist: RevenuePersist,
  ): Promise<any> {
    const customer = await this.customerRepository.findOneBy({
      id: custumerId,
    });
    if (!customer) {
      throw new NotFoundException(`Customer: ${custumerId} doest not exists`);
    }

    const entity = plainToInstance(Revenue, revenuePersist);
    entity.customer = customer;

    const { id: revenueId } = await this.revenueRepository.save(entity);
    return revenueId;
  }

  public async update(
    id: number,
    revenuePersist: RevenuePersist,
  ): Promise<void> {
    const revenue = await this.revenueRepository.findOneBy({
      id,
    });
    if (!revenue) {
      throw new NotFoundException(`Revenue: ${id} doest not exists`);
    }

    const entity = plainToInstance(Revenue, { id, ...revenuePersist });
    await this.revenueRepository.save(entity);
  }

  public async remove(id: number): Promise<void> {
    const revenue = await this.revenueRepository.findOneBy({ id });
    if (!revenue) {
      throw new NotFoundException(`Revenue: ${id} alredy exists`);
    }
    await this.revenueRepository.manager
      .createQueryBuilder()
      .delete()
      .from(Revenue)
      .where({ id })
      .execute();
  }
}
