import { knex } from 'knex';
import config from '../knexfile';
import { EFFICACY_SCHEMA, SYSTEM_COLLECTION_TABLE_TYPES, SYSTEM_TABLE_STATUS, TABLE_COLLECTIONS, TABLE_COLLECTION_PROPERTIES } from '@efficacy/constants';

export async function createCollectionPropertiesTable(): Promise<boolean> {
    const knexInstance = knex(config);
    return new Promise(async (resolve, reject) => {
        try {
            const collectionPropertiesExists = await knexInstance.schema.withSchema(EFFICACY_SCHEMA).hasTable(TABLE_COLLECTION_PROPERTIES);
            if (collectionPropertiesExists) {
                resolve(false);
            } else {
                return knexInstance.schema.withSchema(EFFICACY_SCHEMA).createTable(TABLE_COLLECTION_PROPERTIES, function (t) {
                    t.uuid('id', { primaryKey: true }).defaultTo(knexInstance.fn.uuid());
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
                    t.enu('status', SYSTEM_TABLE_STATUS).defaultTo('active');
                    t.timestamp('createdAt', { useTz: true }).defaultTo(knexInstance.fn.now());
                    t.timestamp('updatedAt', { useTz: true }).defaultTo(knexInstance.fn.now());

                    t.foreign('collectionId').references('collectionId')
                        .inTable(`${EFFICACY_SCHEMA}.${TABLE_COLLECTIONS}`)
                        .onUpdate('CASCADE').onDelete('CASCADE');
                    resolve(true);
                });
            }
        } catch (e) {
            reject(e);
        }
    });
}