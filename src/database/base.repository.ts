import { DeepPartial, FindOptionsWhere, Repository } from 'typeorm';
import { IBaseRepository } from './base.interface';

export abstract class BaseRepository<T> implements IBaseRepository<T> {
  constructor(protected readonly repository: Repository<T>) {}

  async findOne(id: string): Promise<T | null> {
    return this.repository.findOneBy({ id } as unknown as FindOptionsWhere<T>);
  }

  async findOneBy(where: FindOptionsWhere<T>): Promise<T | null> {
    return this.repository.findOneBy(where);
  }

  async find(where: FindOptionsWhere<T>): Promise<T[]> {
    return this.repository.findBy(where);
  }

  async create(data: DeepPartial<T>): Promise<T> {
    const entity = this.repository.create(data);
    return this.repository.save(entity);
  }

  async update(id: string, data: DeepPartial<T>): Promise<T> {
    await this.repository.update(id, data as any);
    return this.findOne(id);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async save(data: DeepPartial<T>): Promise<T> {
    return this.repository.save(data);
  }
}
