import { knex } from 'knex';
import config from '../knexfile';
import { EFFICACY_SCHEMA, SYSTEM_TABLE_STATUS, TABLE_ASSETS } from '@efficacy/constants';

export async function createAssetsTable(): Promise<boolean> {
    const knexInstance = knex(config);
    return new Promise(async (resolve, reject) => {
        try {
            const assetsExists = await knexInstance.schema.withSchema(EFFICACY_SCHEMA).hasTable(TABLE_ASSETS);
            if (assetsExists) {
                resolve(false);
            } else {
                return knexInstance.schema.withSchema(EFFICACY_SCHEMA).createTable(TABLE_ASSETS, function (t) {
                    t.uuid('id', { primaryKey: true }).defaultTo(knexInstance.fn.uuid());
                    t.string('assetId', 100).unique().notNullable();
                    t.string('filename', 100).notNullable();
                    t.string('mimetype', 100).notNullable();
                    t.string('destination', 20).notNullable();
                    t.string('path').notNullable();
                    t.integer('filesize').notNullable();
                    t.string('description').nullable();
                    t.specificType('tags', 'text ARRAY').nullable();
                    t.json('additionalMetadata').nullable();
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