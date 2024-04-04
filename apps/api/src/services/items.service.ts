import { EFFICACY_SCHEMA, FilterOperations, Status } from "@efficacy/constants";
import {
    CollectionItems,
    CollectionItemsQuery,
} from "@efficacy/interfaces";
import { ApiError } from "@efficacy/exceptions";
import { TABLE_COLLECTIONS, TABLE_COLLECTION_PROPERTIES } from "@efficacy/constants";
import { CollectionProperty, Collections } from "@efficacy/schemas";
import knex from "knex";
import config from "@efficacy/database/src/knexfile";

export class ItemsService {

    readonly db: any;

    constructor() {
        this.db = knex(config);
    }

    public async create(
        collectionId: string,
        request: Record<string, any>) {
        // Check if collection exists
        const collection = await this.getCollection(collectionId);
        if (collection) {
            // TODO: Validate Request
            try {
                await this.insertData(
                    `${collection.schemaName}.${collection.tableName}`,
                    request);
            } catch (e) {
                throw new ApiError("Update Collection Item", 500, e.message);
            }
        }
    }

    public async update(
        collectionId: string,
        itemId: string,
        request: Record<string, any>) {
        // Check if collection exists
        const collection = await this.getCollection(collectionId);
        if (collection) {
            // TODO: Validate Request
            try {
                await this.updateData(
                    itemId,
                    `${collection.schemaName}.${collection.tableName}`,
                    request);
            } catch (e) {
                throw new ApiError("Update Collection Item", 500, e.message);
            }
        }
    }

    public async delete(
        collectionId: string,
        itemId: string) {
        // Check if collection exists
        const collection = await this.getCollection(collectionId);
        if (collection) {
            // TODO: Validate Request
            try {
                await this.removeData(
                    itemId,
                    `${collection.schemaName}.${collection.tableName}`);
            } catch (e) {
                throw new ApiError("Update Collection Item", 500, e.message);
            }
        }
    }

    public async get(
        collectionId: string,
        itemId: string): Promise<Record<string, any> | undefined> {
        // Check if collection exists
        const collection = await this.getCollection(collectionId);
        if (collection) {
            // TODO: Validate Request
            try {
                return await this.getData(
                    itemId,
                    `${collection.schemaName}.${collection.tableName}`);
            } catch (e) {
                throw new ApiError("Update Collection Item", 500, e.message);
            }
        }
    }

    public async getAll(
        collectionId: string,
        request: CollectionItemsQuery): Promise<CollectionItems> {
        let response: CollectionItems = {
            result: []
        }
        // Check if collection exists
        const collection = await this.getCollection(collectionId);
        if (collection) {
            response = await this.queryTable(collection, request);
            return response;
        }
        return response;
    }

    public async getCollectionProperties(collectionId: string): Promise<CollectionProperty[]> {
        const collectionProperties = await this.db
            .from(`${EFFICACY_SCHEMA}.${TABLE_COLLECTION_PROPERTIES}`)
            .select(['id', 'propertyName', 'displayName', 'description', 'type'])
            .where('collectionId', collectionId)
            .where('status', Status.ACTIVE);
        return collectionProperties;
    }

    ////////////////////// Private Functions //////////////////////////

    /**
     * 
     * @param collectionId 
     * @returns 
     */
    private async getCollection(collectionId: string): Promise<Collections> {
        const collection = await this.db
            .from(`${EFFICACY_SCHEMA}.${TABLE_COLLECTIONS}`)
            .where('collectionId', collectionId)
            .where('status', Status.ACTIVE)
            .first();
        return collection;
    }

    private async getData(itemId: string, tableName: string): Promise<Record<string, any>> {
        const result = await this.db
            .from(tableName)
            .where({ id: itemId })
            .first();
        return result;
    }

    private async insertData(tableName: string, request: Record<string, any>) {
        await this.db
            .insert(request)
            .into(tableName);
    }

    private async updateData(itemId: string, tableName: string, request: Record<string, any>) {
        await this.db(tableName)
            .where({ id: itemId })
            .update(request);
    }

    private async removeData(itemId: string, tableName: string) {
        await this.db(tableName)
            .where({ id: itemId })
            .del();
    }

    private async queryTable(collection: any, query: CollectionItemsQuery): Promise<CollectionItems> {
        const response: CollectionItems = {
            result: []
        }
        try {
            const queryProps = this.db.from(`${collection.schemaName}.${collection.tableName}`);
            if (query.properties) {
                queryProps.select(query.properties);
            }
            if (query.offset) {
                queryProps.offset(query.offset);
            }
            if (query.limit) {
                queryProps.limit(query.limit);
            }
            if (query.sortByProperty) {
                queryProps.orderBy(query.sortByProperty, query.ascending ? 'asc' : 'desc');
            }
            if (query.filterByProperty && query.filterValue && query.filterOperation) {
                if (query.filterOperation === FilterOperations.LIKE) {
                    queryProps.where(query.filterByProperty, query.filterOperation, `%${query.filterValue.replaceAll('%', '\\%')}%`);
                } else {
                    queryProps.where(query.filterByProperty, query.filterOperation, query.filterValue);
                }
            }
            response.result = await queryProps;
            if (query.showCount) {
                response.count = await this.db.from(`${collection.schemaName}.${collection.tableName}`).count('id');
            }
        } catch (e) {
            console.error(e);
        }
        return response;
    }
}