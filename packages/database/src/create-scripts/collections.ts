import { knex } from 'knex';
import config from '../knexfile';
import { EFFICACY_SCHEMA, SYSTEM_TABLE_STATUS, TABLE_COLLECTIONS } from '@efficacy/constants';

export async function createCollectionsTable(): Promise<boolean> {
    const knexInstance = knex(config);
    return new Promise(async (resolve, reject) => {
        try {
            const collectionExists = await knexInstance.schema.withSchema(EFFICACY_SCHEMA).hasTable(TABLE_COLLECTIONS);
            if (collectionExists) {
                resolve(false);
            } else {
                return knexInstance.schema.withSchema(EFFICACY_SCHEMA).createTable(TABLE_COLLECTIONS, function (t) {
                    t.uuid('id', { primaryKey: true }).defaultTo(knexInstance.fn.uuid());
                    t.string('collectionId', 100).unique().notNullable();
                    t.string('displayName', 100).notNullable();
                    t.string('description').nullable();
                    t.string('schemaName', 100).notNullable().defaultTo('public');
                    t.string('tableName', 100).unique().notNullable();
                    t.json('additionalMetadata').nullable();
                    t.boolean('isPublic').nullable().defaultTo(true);
                    t.boolean('useTimestamps').nullable().defaultTo(true);
                    t.enu('status', SYSTEM_TABLE_STATUS).defaultTo('active');
                    t.timestamp('when', { useTz: true }).defaultTo(knexInstance.fn.now());
                    resolve(true);
                });
            }
        } catch (e) {
            reject(e);
        }
    });
}