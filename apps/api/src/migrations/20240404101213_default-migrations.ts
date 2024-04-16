import { 
    EFFICACY_SCHEMA, 
    SYSTEM_COLLECTION_TABLE_TYPES, 
    SYSTEM_TABLE_STATUS, 
    TABLE_ACTIVITY, 
    TABLE_ASSETS, 
    TABLE_COLLECTIONS, 
    TABLE_COLLECTION_PROPERTIES, 
    TABLE_ROLES, 
    TABLE_TABLE_UI_SCHEMA, 
    TABLE_TABLE_UI_SCHEMA_PROPERTIES, 
    TABLE_USERS 
} from "@efficacy/constants";
import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.raw('CREATE SCHEMA IF NOT EXISTS efficacy;');
    await knex.schema.withSchema(EFFICACY_SCHEMA)
        .createTable(TABLE_ASSETS, function (t) {
            t.uuid('id', { primaryKey: true }).defaultTo(knex.fn.uuid());
            t.string('assetId', 100).unique().notNullable();
            t.string('filename', 100).notNullable();
            t.string('mimetype', 100).notNullable();
            t.string('destination', 20).notNullable();
            t.string('path').notNullable();
            t.integer('filesize').notNullable();
            t.string('description').nullable();
            t.specificType('tags', 'text ARRAY').nullable();
            t.json('additionalMetadata').nullable();
            defaultHistoryFields(knex, t);
        })
        .createTable(TABLE_ROLES, function (t) {
            t.uuid('id', { primaryKey: true }).defaultTo(knex.fn.uuid());
            t.string('roleId', 100).unique().notNullable();
            t.string('displayName', 100).notNullable();
            t.string('description').nullable();
            t.boolean('adminAccess').nullable().defaultTo(false);
            t.boolean('portalAccess').nullable().defaultTo(false);
            t.boolean('appAccess').nullable().defaultTo(false);
            defaultHistoryFields(knex, t);
        })
        .createTable(TABLE_USERS, function (t) {
            t.uuid('id', { primaryKey: true }).defaultTo(knex.fn.uuid());
            t.string('firstname', 100).notNullable();
            t.string('middlename', 100).nullable();
            t.string('lastname', 100).notNullable();
            t.string('phone', 20).unique().nullable();
            t.string('email', 100).unique().notNullable().checkRegex('^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+[.][A-Za-z]+$');
            t.string('password').notNullable();
            t.uuid('roleId').notNullable();
            t.date('dob').nullable();
            t.string('image').nullable();
            t.string('location').nullable();
            t.string('description').nullable();
            t.specificType('tags', 'text ARRAY').nullable();
            t.json('additionalMetadata').nullable();
            defaultHistoryFields(knex, t);

            t.foreign('roleId').references('id').inTable(`${EFFICACY_SCHEMA}.${TABLE_ROLES}`).onUpdate('CASCADE').onDelete('CASCADE');
        })
        .createTable(TABLE_ACTIVITY, function (t: any) {
            t.uuid('id', { primaryKey: true }).defaultTo(knex.fn.uuid());
            t.string('action', 100).notNullable();
            t.string('tableName', 100).notNullable();
            t.string('objectId').notNullable();
            t.json('changes').nullable();
            t.string('userId').nullable();
            t.boolean('isSystem').nullable();
            t.string('ip').nullable();
            t.timestamp('createdAt', { useTz: true }).defaultTo(knex.fn.now());
            t.timestamp('updatedAt', { useTz: true }).defaultTo(knex.fn.now());

            t.foreign('userId').references('email').inTable(`${EFFICACY_SCHEMA}.${TABLE_USERS}`).onUpdate('CASCADE').onDelete('CASCADE');
        })
        .createTable(TABLE_COLLECTIONS, function (t) {
            t.uuid('id', { primaryKey: true }).defaultTo(knex.fn.uuid());
            t.string('collectionId', 100).unique().notNullable();
            t.string('displayName', 100).notNullable();
            t.string('description').nullable();
            t.string('schemaName', 100).notNullable().defaultTo('public');
            t.string('tableName', 100).unique().notNullable();
            t.json('additionalMetadata').nullable();
            t.boolean('isPublic').nullable().defaultTo(true);
            t.boolean('useTimestamps').nullable().defaultTo(true);
            defaultHistoryFields(knex, t);
        })
        .createTable(TABLE_COLLECTION_PROPERTIES, function (t) {
            t.uuid('id', { primaryKey: true }).defaultTo(knex.fn.uuid());
            t.string('collectionId', 100).notNullable();
            t.string('propertyName', 100).notNullable();
            t.string('displayName', 100).notNullable();
            t.string('description').nullable();
            t.enu('type', SYSTEM_COLLECTION_TABLE_TYPES).notNullable().defaultTo('string');
            t.boolean('nullable').notNullable().defaultTo(true);
            t.boolean('isUnique').notNullable().defaultTo(true);
            t.string('default').nullable();
            t.string('regex').nullable();
            t.specificType('stringOneOf', 'text ARRAY').nullable();
            t.specificType('stringNoneOf', 'text ARRAY').nullable();
            t.enu('stringLengthCheckOperator', ['=', '!=', '<=', '>=', '<', '>']).nullable();
            t.boolean('stringLengthCheck').nullable();
            t.boolean('setNumberPositive').nullable();
            t.boolean('setNumberNegative').nullable();
            t.integer('minimum').nullable();
            t.integer('maximum').nullable();
            t.boolean('checkNumberRange').nullable();
            t.integer('numericPrecision').nullable();
            t.integer('numericScale').nullable();
            t.specificType('enumValues', 'text ARRAY').nullable();
            t.string('dateFormat').nullable();
            t.string('foreignKeyColumn').nullable();
            t.string('foreignKeySchema').nullable();
            t.string('foreignKeyTable').nullable();
            t.json('additionalMetadata').nullable();
            defaultHistoryFields(knex, t);

            t.foreign('collectionId').references('collectionId')
                .inTable(`${EFFICACY_SCHEMA}.${TABLE_COLLECTIONS}`)
                .onUpdate('CASCADE').onDelete('CASCADE');
        })
        .createTable(TABLE_TABLE_UI_SCHEMA, function (t) {
            t.uuid('id', { primaryKey: true }).defaultTo(knex.fn.uuid());
            t.string('collectionId', 100).unique().notNullable();
            t.string('title', 100).notNullable();
            t.string('subtitle').nullable();
            t.boolean('showFilter').nullable().defaultTo(false);
            t.string('addURL').nullable();
            t.string('viewURL').nullable();
            t.string('editURL').nullable();
            t.string('duplicateURL').nullable();
            t.string('deleteURL').nullable();
            t.string('deleteHeader').nullable();
            t.string('deleteDescription').nullable();
            t.string('defaultRowId').nullable();
            defaultHistoryFields(knex, t);

            t.foreign('collectionId').references('collectionId')
                .inTable(`${EFFICACY_SCHEMA}.${TABLE_COLLECTIONS}`)
                .onUpdate('CASCADE').onDelete('CASCADE');
        })
        .createTable(TABLE_TABLE_UI_SCHEMA_PROPERTIES, function (t) {
            t.uuid('id', { primaryKey: true }).defaultTo(knex.fn.uuid());
            t.uuid('uiTableId').notNullable();
            t.string('field', 100).notNullable();
            t.string('headerName').notNullable();
            t.string('type').notNullable().defaultTo('string');
            defaultHistoryFields(knex, t);

            t.foreign('uiTableId').references('id')
                .inTable(`${EFFICACY_SCHEMA}.${TABLE_TABLE_UI_SCHEMA}`)
                .onUpdate('CASCADE').onDelete('CASCADE');
        });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.withSchema(EFFICACY_SCHEMA).dropTable(TABLE_ASSETS);
    await knex.schema.withSchema(EFFICACY_SCHEMA).dropTable(TABLE_ROLES);
    await knex.schema.withSchema(EFFICACY_SCHEMA).dropTable(TABLE_USERS);
    await knex.schema.withSchema(EFFICACY_SCHEMA).dropTable(TABLE_ACTIVITY);
    await knex.schema.withSchema(EFFICACY_SCHEMA).dropTable(TABLE_COLLECTIONS);
    await knex.schema.withSchema(EFFICACY_SCHEMA).dropTable(TABLE_COLLECTION_PROPERTIES);
}

const defaultHistoryFields = (knex: Knex, table: any): void => {
    table.enu('status', SYSTEM_TABLE_STATUS).defaultTo('active');
    table.timestamp('createdAt', { useTz: true }).notNullable().defaultTo(knex.fn.now());
    table.timestamp('updatedAt', { useTz: true }).notNullable().defaultTo(knex.fn.now());
};

