import { DeleteResult, Model, MongooseUpdateQueryOptions, ProjectionType, QueryOptions, RootFilterQuery, UpdateQuery } from "mongoose";

export class AbstractRepository<T> {
    constructor(private readonly model: Model<T>) { }
    public async create(item: Partial<T>) {
        const doc = new this.model(item);
        return doc.save();
    }
    public async getOne(filter: RootFilterQuery<T>, projection?: ProjectionType<T>, options?: QueryOptions<T>) {
        return this.model.findOne(filter, projection, options);
    }
    public async updateOne(
        filter: RootFilterQuery<T>,
        updateQuery: UpdateQuery<T>,
        options?: QueryOptions<T>) {
        return this.model.findOneAndUpdate(filter, updateQuery, options);
    }

    public async updateMany(
    filter: RootFilterQuery<T>,
    updateQuery: UpdateQuery<T>,
    options?: MongooseUpdateQueryOptions<T>,
) {
    return this.model.updateMany(filter, updateQuery, options);
}
    
    public async getMany(
        filter: RootFilterQuery<T>,
        projection?: ProjectionType<T>,
        options?: QueryOptions<T>,
    ) {
        return this.model.find(filter, projection, options);
    }

    public async delete(
        filter: RootFilterQuery<T>,
    ): Promise<DeleteResult> {
        return this.model.deleteOne(filter);
    }
}