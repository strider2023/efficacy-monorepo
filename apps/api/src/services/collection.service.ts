import { BaseService } from "./base.service";
import { EFFICACY_SCHEMA, SYSTEM_TABLES, TABLE_COLLECTIONS, TABLE_COLLECTION_PROPERTIES } from "@efficacy/constants";
import { CreateCollection } from "@efficacy/interfaces";
import { ApiError } from "@efficacy/exceptions";
import { Status } from "@efficacy/constants";
import { SchemaBuilder } from "@efficacy/database";
import { Collections } from "@efficacy/schemas";

export class CollectionService extends BaseService<Collections> {

    constructor(email?: string) {
        super(`${EFFICACY_SCHEMA}.${TABLE_COLLECTIONS}`, 'Collections', email);
    }

    public async syncCollections() {
        try {
            new SchemaBuilder().syncTables();
        } catch (e) {
            throw new ApiError(`Error syncing ${this.entityName}`, 500, e.message);
        }
    }

    public async createCollection(request: CreateCollection) {
        try {
            if (SYSTEM_TABLES.includes(request.tableName)) {
                throw new ApiError("Collection Creation Error", 500, "Table name is system reserved.")
            }
            const collection = await this.get(request.collectionId, 'collectionId');
            if (collection) {
                throw new ApiError(`Error creating entry in ${this.entityName}`, 500, `Collection by the ${request.collectionId} already exists.`);
            }
            await new SchemaBuilder().createTable(request)
            this.create(request);
        } catch (e) {
            throw new ApiError(`Error creating entry in ${this.entityName}`, 500, e.message);
        }
    }

    public async deleteCollection(collectionId: string) {
        try {
            const collection = await this.get(collectionId, 'collectionId');
            await new SchemaBuilder().removeTable(collection.schemaName, collection.tableName);
            this.delete(collectionId, 'collectionId');
            this.deteleCollectionProperties(collectionId);
        } catch (e) {
            throw new ApiError(`Error removing entry in ${this.entityName}`, 500, e.message);
        }
    }

    //////////////////// Private Functions //////////////////////////

    private async deteleCollectionProperties(collectionId: string) {
        try {
            const properties = await this.db
                .from(`${EFFICACY_SCHEMA}.${TABLE_COLLECTION_PROPERTIES}`)
                .where('collectionId', collectionId)
                .where('status', Status.ACTIVE)
                .first();
            for (const p of properties) {
                await this.db
                    .into(this.tableName)
                    .where('id', p.id)
                    .update({ status: Status.DELETED });
            }
        } catch (e) {
            throw new ApiError(`Error deleting entry from ${this.entityName}`, 500, e.message);
        }
    }
}