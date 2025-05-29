"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRepository = void 0;
class BaseRepository {
    constructor(repository) {
        this.repository = repository;
    }
    async findOne(id) {
        return this.repository.findOneBy({ id });
    }
    async findOneBy(where) {
        return this.repository.findOneBy(where);
    }
    async find(where) {
        return this.repository.findBy(where);
    }
    async create(data) {
        const entity = this.repository.create(data);
        return this.repository.save(entity);
    }
    async update(id, data) {
        await this.repository.update(id, data);
        return this.findOne(id);
    }
    async delete(id) {
        await this.repository.delete(id);
    }
    async save(data) {
        return this.repository.save(data);
    }
}
exports.BaseRepository = BaseRepository;
//# sourceMappingURL=base.repository.js.map