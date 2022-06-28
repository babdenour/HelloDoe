/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { Document, DocumentQuery, FilterQuery, Model, Types } from 'mongoose';

import { Converter } from './converters/types';
import { PopulatableFields } from './types';

export class BaseRepository<M, D extends Document> {
  constructor(private readonly model: Model<D>, private readonly converter: Converter<M, D>) {}

  public async findAll(): Promise<M[]> {
    const docs: D[] = await this.model.find().exec();
    return docs.map((doc: D) => this.converter.toDomain(doc));
  }

  public async findById(id: string): Promise<M | null> {
    const doc = await this.findByQuery('_id', id);
    return this.convertIfNotNull(doc);
  }

  public async save(domain: M): Promise<M> {
    let doc = this.converter.toDocument(domain);

    delete doc['createdAt'];
    doc['updatedAt'] = new Date();

    doc = await this.model.findOneAndUpdate({ _id: doc._id }, doc, {
      upsert: true,
      new: true,
      timestamps: true,
      useFindAndModify: false,
    });
    return this.converter.toDomain(doc);
  }

  public async bulkSave(domains: M[]): Promise<void> {
    const convertToDomain = (domain: M): D => {
      const doc: D = this.converter.toDocument(domain);

      delete doc['createdAt'];
      doc['updatedAt'] = new Date();

      return doc;
    };

    const buildOperations = (doc: D) => {
      return {
        updateOne: {
          filter: { _id: doc._id },
          update: doc.toObject(),
          upsert: true,
        },
      };
    };

    const operations = domains.map(convertToDomain).map(buildOperations);

    await this.model.bulkWrite(operations);
  }

  protected async findByQuery(query: FilterQuery<D>, populatableFields?: PopulatableFields<D>): Promise<D | null>;
  protected async findByQuery(query: string, value: any, populatableFields?: PopulatableFields<D>): Promise<D | null>;
  protected async findByQuery(
    query: string | FilterQuery<D>,
    value: any | PopulatableFields<D>,
    populatableFields: PopulatableFields<D> = [],
  ): Promise<D | null> {
    let docQuery: DocumentQuery<D | null, D>;
    if (typeof query === 'string') {
      docQuery = this.model.findOne({ [query]: value } as any);
    } else {
      docQuery = this.model.findOne(query);
      populatableFields = value ? value : [];
    }

    for (const field of populatableFields) {
      await docQuery.populate(field);
    }

    const document = await docQuery.exec();
    return document;
  }

  protected async findAllByQuery(query: FilterQuery<D>, populatableFields?: PopulatableFields<D>): Promise<D[]>;
  protected async findAllByQuery(query: string, value: any, populatableFields?: PopulatableFields<D>): Promise<D[]>;
  protected async findAllByQuery(
    query: string | FilterQuery<D>,
    value: any | PopulatableFields<D>,
    populatableFields: PopulatableFields<D> = [],
  ): Promise<D[]> {
    let docQuery: DocumentQuery<D[], D>;
    if (typeof query === 'string') {
      docQuery = this.model.find({ [query]: value } as any);
    } else {
      docQuery = this.model.find(query);
      populatableFields = value ? value : [];
    }

    for (const field of populatableFields) {
      await docQuery.populate(field);
    }

    const docs = await docQuery.exec();
    return docs;
  }

  protected convertIfNotNull(doc: D | null): M | null {
    return doc != null ? this.converter.toDomain(doc) : null;
  }

  protected convertArray(docs: D[]): M[] {
    return docs.map((doc: D) => this.converter.toDomain(doc));
  }

  /**
   * Convert a string id to an ObjectId.
   * @param id String id.
   * @returns Object id.
   */
  protected toObjectId(id: string): Types.ObjectId {
    return Types.ObjectId(id);
  }

  /**
   * Convert an array of string id to an array of ObjectId.
   * @param ids Array of string id.
   * @returns Array of ObjectId.
   */
  protected toArrayObjectId(ids: string[]): Types.ObjectId[] {
    return ids.map((id) => Types.ObjectId(id));
  }
}
