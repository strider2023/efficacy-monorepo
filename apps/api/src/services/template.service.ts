import { EFFICACY_SCHEMA, Status, TABLE_COLLECTIONS, TABLE_COLLECTION_PROPERTIES, UITableColumnTypes } from "@efficacy/constants";
import config from "@efficacy/database/src/knexfile";
import { TableUISchema } from "@efficacy/interfaces";
import knex from "knex";

export class TemplateService {

    readonly db: any;
    
    constructor() {
        this.db = knex(config);
    }

    public getUITableSchema(templateId: string): TableUISchema | undefined {
        switch (templateId) {
            case 'roles':
                return this.getRolesSchema();
            case 'users':
                return this.getUsersSchema();
            case 'collections':
                return this.getCollectionsSchema();
            case 'collection-properties':
                return this.getCollectionPropertiesSchema();
            case 'assets':
                return this.getAssetsSchema();
        }
    }

    public async getDynamicUITableSchema(collectionId: string): Promise<TableUISchema|undefined> {
        const collection = await this.db
                .from(`${EFFICACY_SCHEMA}.${TABLE_COLLECTIONS}`)
                .where('collectionId', collectionId)
                .where('status', Status.ACTIVE)
                .first();
        const properties = await this.db
                .from(`${EFFICACY_SCHEMA}.${TABLE_COLLECTION_PROPERTIES}`)
                .where('collectionId', collectionId)
                .where('status', Status.ACTIVE);
        let tableSchema: TableUISchema = {
            title: collection.displayName + " Data",
            subtitle: "Entity Data Management",
            showFilter: false,
            addURL: `/collections/${collectionId}/items/create`,
            viewURL: `/collections/${collectionId}/items/{id}`,
            editURL: `/collections/${collectionId}/items/{id}/edit`,
            deleteURL: `/api/collection/${collectionId}/item/{id}`,
            properties: [
                { field: 'id', headerName: 'ID' },
            ]
        }
        if (properties.length > 0) {
            for (const p of properties) {
                tableSchema.properties.push({ field: p.propertyName, headerName: p.displayName });
            }
        }
        if (collection.useTimestamps) {
            tableSchema.properties.push({ field: 'createdAt', headerName: 'Created On', type: UITableColumnTypes.STRING });
            tableSchema.properties.push({ field: 'createdAt', headerName: 'Created On', type: UITableColumnTypes.STRING });
        }
        return tableSchema;
    }

    private getAssetsSchema(): TableUISchema {
        return {
            title: "Assets",
            subtitle: "Asset Management",
            showFilter: true,
            addURL: '/assets/create',
            viewURL: '/assets/{assetId}',
            editURL: '/assets/{assetId}/edit',
            deleteURL: '/api/assets/{assetId}',
            properties: [
                { field: 'id', headerName: 'ID' },
                { field: 'assetId', headerName: 'Asset Id' },
                { field: 'filename', headerName: 'File Name' },
                { field: 'mimetype', headerName: 'MIME Type' },
                { field: 'destination', headerName: 'Destination' },
                { field: 'path', headerName: 'Path' },
                { field: 'filesize', headerName: 'Size' },
                { field: 'description', headerName: 'Description' },
                { field: 'tags', headerName: 'Tags' },
                { field: 'status', headerName: 'Status' },
                { field: 'createdAt', headerName: 'Created On', type: UITableColumnTypes.STRING },
                { field: 'updatedAt', headerName: 'Updated On', type: UITableColumnTypes.STRING },
            ]
        }
    }

    private getCollectionsSchema(): TableUISchema {
        return {
            title: "Collections",
            subtitle: "Entity Management",
            showFilter: true,
            addURL: '/collections/create',
            viewURL: '/collections/{collectionId}',
            editURL: '/collections/{collectionId}/edit',
            deleteURL: '/api/collections/{collectionId}',
            properties: [
                { field: 'id', headerName: 'ID' },
                { field: 'collectionId', headerName: 'Collection Id' },
                { field: 'displayName', headerName: 'Display Name' },
                { field: 'description', headerName: 'Description' },
                { field: 'schemaName', headerName: 'Schema Name' },
                { field: 'tableName', headerName: 'Table Name' },
                { field: 'isPublic', headerName: 'Is Public', type: UITableColumnTypes.BOOLEAN },
                { field: 'useTimestamps', headerName: 'Use Timestamps', type: UITableColumnTypes.BOOLEAN },
                { field: 'status', headerName: 'Status' },
                { field: 'createdAt', headerName: 'Created On', type: UITableColumnTypes.STRING },
                { field: 'updatedAt', headerName: 'Updated On', type: UITableColumnTypes.STRING },
            ]
        }
    }

    private getCollectionPropertiesSchema(): TableUISchema {
        return {
            title: "Collection Properties",
            subtitle: "Entity Management",
            showFilter: true,
            addURL: '/collections/{collectionId}/properties/create',
            viewURL: '/collections/{collectionId}/properties/{propertyName}',
            editURL: '/collections/{collectionId}/properties/{propertyName}/edit',
            deleteURL: '/api/collection/{collectionId}/property/{propertyName}',
            properties: [
                { field: 'id', headerName: 'ID' },
                { field: 'collectionId', headerName: 'Collection Id' },
                { field: 'propertyName', headerName: 'Propertye Name' },
                { field: 'displayName', headerName: 'Display Name' },
                { field: 'description', headerName: 'Description' },
                { field: 'type', headerName: 'Type' },
                { field: 'nullable', headerName: 'Nullable', type: UITableColumnTypes.BOOLEAN },
                { field: 'isUnique', headerName: 'Unique', type: UITableColumnTypes.BOOLEAN },
                { field: 'default', headerName: 'Default' },
                { field: 'regex', headerName: 'Regex' },
                { field: 'stringOneOf', headerName: 'String One Of' },
                { field: 'stringNoneOf', headerName: 'String None Of' },
                { field: 'stringLengthCheckOperator', headerName: 'Length Check Operator' },
                { field: 'stringLengthCheck', headerName: 'Check Length', type: UITableColumnTypes.BOOLEAN },
                { field: 'setNumberPositive', headerName: 'Check Positive', type: UITableColumnTypes.BOOLEAN },
                { field: 'setNumberNegative', headerName: 'Check Negative', type: UITableColumnTypes.BOOLEAN },
                { field: 'minimum', headerName: 'Minimum' },
                { field: 'maximum', headerName: 'Maximum' },
                { field: 'checkNumberRange', headerName: 'Check Range', type: UITableColumnTypes.BOOLEAN },
                { field: 'numericPrecision', headerName: 'Precision' },
                { field: 'numericScale', headerName: 'Scale' },
                { field: 'enumValues', headerName: 'Enum Values' },
                { field: 'dateFormat', headerName: 'Date Format' },
                { field: 'foreignKeyColumn', headerName: 'Foreign Key Column' },
                { field: 'foreignKeySchema', headerName: 'Foreign Key Schema' },
                { field: 'foreignKeyTable', headerName: 'Foreign Key Table' },
                { field: 'additionalMetadata', headerName: 'Metadat' },
                { field: 'status', headerName: 'Status' },
                { field: 'createdAt', headerName: 'Created On', type: UITableColumnTypes.STRING },
                { field: 'updatedAt', headerName: 'Updated On', type: UITableColumnTypes.STRING },
            ]
        }
    }

    private getUsersSchema(): TableUISchema {
        return {
            title: "Users",
            subtitle: "User Management",
            showFilter: true,
            addURL: '/users/create',
            viewURL: '/users/{roleId}',
            editURL: '/users/{roleId}/edit',
            deleteURL: '/api/users/{roleId}',
            properties: [
                { field: 'id', headerName: 'ID' },
                { field: 'firstname', headerName: 'First Name' },
                { field: 'middlename', headerName: 'Middle Name' },
                { field: 'lastname', headerName: 'Last Name' },
                { field: 'phone', headerName: 'Phone' },
                { field: 'email', headerName: 'Email' },
                { field: 'status', headerName: 'Status' },
                { field: 'createdAt', headerName: 'Created On', type: UITableColumnTypes.STRING },
                { field: 'updatedAt', headerName: 'Updated On', type: UITableColumnTypes.STRING },
            ]
        }
    }

    private getRolesSchema(): TableUISchema {
        return {
            title: "Roles",
            subtitle: "Permissions Management",
            showFilter: true,
            addURL: '/roles/create',
            viewURL: '/roles/{roleId}',
            editURL: '/roles/{roleId}/edit',
            deleteURL: '/api/roles/{roleId}',
            properties: [
                { field: 'id', headerName: 'ID' },
                { field: 'roleId', headerName: 'Role Id' },
                { field: 'displayName', headerName: 'Display Name' },
                { field: 'description', headerName: 'Description' },
                { field: 'adminAccess', headerName: 'Admin Access', type: UITableColumnTypes.BOOLEAN },
                { field: 'portalAccess', headerName: 'Portal Access', type: UITableColumnTypes.BOOLEAN },
                { field: 'appAccess', headerName: 'App Access', type: UITableColumnTypes.BOOLEAN },
                { field: 'status', headerName: 'Status' },
                { field: 'createdAt', headerName: 'Created On', type: UITableColumnTypes.STRING },
                { field: 'updatedAt', headerName: 'Updated On', type: UITableColumnTypes.STRING },
            ]
        }
    }
}