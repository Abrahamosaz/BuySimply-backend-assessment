import { DeepPartial, FindOptionsWhere, Repository } from 'typeorm';
import { IBaseRepository } from './base.interface';
export declare abstract class BaseRepository<T> implements IBaseRepository<T> {
    protected readonly repository: Repository<T>;
    constructor(repository: Repository<T>);
    findOne(id: string): Promise<T | null>;
    findOneBy(where: FindOptionsWhere<T>): Promise<T | null>;
    find(where: FindOptionsWhere<T>): Promise<T[]>;
    create(data: DeepPartial<T>): Promise<T>;
    update(id: string, data: DeepPartial<T>): Promise<T>;
    delete(id: string): Promise<void>;
    save(data: DeepPartial<T>): Promise<T>;
}
