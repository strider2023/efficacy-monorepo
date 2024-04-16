import { knex } from 'knex';
import config from '../knexfile';
import { EFFICACY_SCHEMA, SYSTEM_TABLE_STATUS, TABLE_ROLES } from '@efficacy/constants';

export async function createRolesTable(): Promise<boolean> {
    const knexInstance = knex(config);
    return new Promise(async (resolve, reject) => {
        try {
            const rolesExists = await knexInstance.schema.withSchema(EFFICACY_SCHEMA).hasTable(TABLE_ROLES);
            if (rolesExists) {
                resolve(false);
            } else {
                return knexInstance.schema.withSchema(EFFICACY_SCHEMA).createTable(TABLE_ROLES, function (t) {
                    t.uuid('id', { primaryKey: true }).defaultTo(knexInstance.fn.uuid());
                    t.string('roleId', 100).unique().notNullable();
                    t.string('displayName', 100).notNullable();
                    t.string('description').nullable();
                    t.boolean('adminAccess').nullable().defaultTo(false);
                    t.boolean('portalAccess').nullable().defaultTo(false);
                    t.boolean('appAccess').nullable().defaultTo(false);
                    t.enu('status', SYSTEM_TABLE_STATUS).defaultTo('active');
                    t.timestamp('createdAt', { useTz: true }).defaultTo(knexInstance.fn.now());
                    t.timestamp('updatedAt', { useTz: true }).defaultTo(knexInstance.fn.now());
                    resolve(true);
                });
            }
        } catch (e) {
            reject(e);
        }
    });
}