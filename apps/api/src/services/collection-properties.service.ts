import { BaseService } from "./base.service";
import { EFFICACY_SCHEMA, TABLE_COLLECTIONS, TABLE_COLLECTION_PROPERTIES } from "@efficacy/constants";
import { CreateCollectionProperty, TableUISchema, UpdateCollectionProperty } from "@efficacy/interfaces";
import { Status } from "@efficacy/constants";
import { ApiError } from "@efficacy/exceptions";
import { UIBuilder } from "../utilities";
import * as _ from "lodash";
import { CollectionProperty, Collections } from "@efficacy/schemas";
import { SchemaBuilder } from "@efficacy/database";

export class CollectionPropertiesService extends BaseService<CollectionProperty> {

    constructor(email?: string) {
        super(`${EFFICACY_SCHEMA}.${TABLE_COLLECTION_PROPERTIES}`, 'Collection Properties', email);
    }

    public async getUIProperties(collectionId: string, platform: string): Promise<any> {
        try {
            const response = await this.db
                .from(this.tableName)
                .where('collectionId', collectionId)
                .where('status', Status.ACTIVE);
            return UIBuilder.getConfig(platform, response);
        } catch (e) {
            throw new ApiError(`Error creating UI View`, 500, e.message);
        }
    }

    public async createProperties(request: CreateCollectionProperty[]) {
        try {
            const collection = await this.getCollection(request[0].collectionId);
            for (const property of request) {
                await new SchemaBuilder().addTableProperty(collection.schemaName, collection.tableName, property);
                this.create(property);
            }
        } catch (e) {
            throw new ApiError(`Error creating entry for ${this.entityName}`, 500, e.message);
        }
    }

    public async createProperty(property: CreateCollectionProperty) {
        try {
            const collection = await this.getCollection(property.collectionId);
            await new SchemaBuilder().addTableProperty(collection.schemaName, collection.tableName, property);
            this.create(property);
        } catch (e) {
            throw new ApiError(`Error creating entry for ${this.entityName}`, 500, e.message);
        }
    }

    public async updateProperty(
        collectionId: string,
        property: UpdateCollectionProperty,
        propertyName: string) {
        try {
            const collection = await this.getCollection(collectionId);
            // Get latest version
            const collectionProperty = await this.get(propertyName, 'propertyName');
            const updatedProperty = _.merge({}, collectionProperty, property);
            const difference = _.pickBy(
                _.omit(updatedProperty, ['id', 'status', 'createdAt', 'updatedAt']), 
                (v, k) => !_.isEqual(collectionProperty[k], v));
            if (!_.isEmpty(difference)) {
                await new SchemaBuilder().updateTableProperty(
                    collection.schemaName,
                    collection.tableName,
                    updatedProperty);
            }
            await this.update(property, propertyName, 'propertyName');
        } catch (e) {
            throw new ApiError(`Error updating entry in ${this.entityName}`, 500, e.message);
        }
    }

    public async deleteProperty(collectionId: string, propertyName: string) {
        try {
            const collection = await this.getCollection(collectionId);
            await new SchemaBuilder().removeTableProperty(collection.schemaName, collection.tableName, propertyName);
            this.delete(propertyName, 'propertyName');
        } catch (e) {
            throw new ApiError(`Error removing entry in ${this.entityName}`, 500, e.message);
        }
    }

    /////////////// Private functions //////////////////////

    private async getCollection(collectionId: string): Promise<Collections> {
        try {
            const response = await this.db
                .from(`${EFFICACY_SCHEMA}.${TABLE_COLLECTIONS}`)
                .where('collectionId', collectionId)
                .where('status', Status.ACTIVE)
                .first();
            return response;
        } catch (e) {
            throw new ApiError(`Error fetching entry from ${this.entityName}`, 500, e.message);
        }
    }
}