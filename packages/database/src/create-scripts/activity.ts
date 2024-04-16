import knex from 'knex';
import config from '../knexfile';
import { EFFICACY_SCHEMA, TABLE_ACTIVITY, TABLE_USERS } from '@efficacy/constants';

export async function createActivityTable(): Promise<boolean> {
    const knexInstance = knex(config);
    return new Promise(async (resolve, reject) => {
        try {
            const activityExists = await knexInstance.schema.withSchema(EFFICACY_SCHEMA).hasTable(TABLE_ACTIVITY);
            if (activityExists) {
                resolve(false);
            } else {
                return knexInstance.schema.withSchema(EFFICACY_SCHEMA).createTable(TABLE_ACTIVITY, function (t: any) {
                    t.uuid('id', { primaryKey: true }).defaultTo(knexInstance.fn.uuid());
                    t.string('action', 100).notNullable();
                    t.string('tableName', 100).notNullable();
                    t.string('objectId').notNullable();
                    t.json('changes').nullable();
                    t.string('userId').nullable();
                    t.boolean('isSystem').nullable();
                    t.string('ip').nullable();
                    t.timestamp('createdAt', { useTz: true }).defaultTo(knexInstance.fn.now());
                    t.timestamp('updatedAt', { useTz: true }).defaultTo(knexInstance.fn.now());

                    t.foreign('userId').references('email').inTable(`${EFFICACY_SCHEMA}.${TABLE_USERS}`).onUpdate('CASCADE').onDelete('CASCADE');
                    resolve(true);
                });
            }
        } catch (e) {
            reject(e);
        }
    });
}