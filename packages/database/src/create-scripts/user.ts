import { knex } from 'knex';
import config from '../knexfile';
import { EFFICACY_SCHEMA, SYSTEM_TABLE_STATUS, TABLE_ROLES, TABLE_USERS } from '@efficacy/constants';

export async function createUserTable(): Promise<boolean> {
    const knexInstance = knex(config);
    return new Promise(async (resolve, reject) => {
        try {
            const userExists = await knexInstance.schema.withSchema(EFFICACY_SCHEMA).hasTable(TABLE_USERS);
            if (userExists) {
                resolve(false);
            } else {
                return knexInstance.schema.withSchema(EFFICACY_SCHEMA).createTable(TABLE_USERS, function (t) {
                    t.uuid('id', { primaryKey: true }).defaultTo(knexInstance.fn.uuid());
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
                    t.enu('status', SYSTEM_TABLE_STATUS).defaultTo('active');
                    t.timestamp('createdAt', { useTz: true }).defaultTo(knexInstance.fn.now());
                    t.timestamp('updatedAt', { useTz: true }).defaultTo(knexInstance.fn.now());

                    t.foreign('roleId').references('id').inTable(`${EFFICACY_SCHEMA}.${TABLE_ROLES}`).onUpdate('CASCADE').onDelete('CASCADE');
                    resolve(true);
                });
            }
        } catch (e) {
            reject(e);
        }
    });
}