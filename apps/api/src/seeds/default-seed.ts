import {
    ActivityTypes,
    EFFICACY_SCHEMA,
    TABLE_ACTIVITY,
    TABLE_ASSETS,
    TABLE_COLLECTIONS,
    TABLE_COLLECTION_PROPERTIES,
    TABLE_ROLES,
    TABLE_TABLE_UI_SCHEMA,
    TABLE_TABLE_UI_SCHEMA_PROPERTIES,
    TABLE_USERS
} from "@efficacy/constants";
import { Knex } from "knex";
import * as dotenv from "dotenv";
import * as bcrypt from 'bcrypt';

dotenv.config();

const { ADMIN_EMAIL, ADMIN_PASSWORD } =
    process.env;

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex(`${EFFICACY_SCHEMA}.${TABLE_ASSETS}`).del();
    await knex(`${EFFICACY_SCHEMA}.${TABLE_ROLES}`).del();
    await knex(`${EFFICACY_SCHEMA}.${TABLE_USERS}`).del();
    await knex(`${EFFICACY_SCHEMA}.${TABLE_ACTIVITY}`).del();
    await knex(`${EFFICACY_SCHEMA}.${TABLE_COLLECTIONS}`).del();
    await knex(`${EFFICACY_SCHEMA}.${TABLE_COLLECTION_PROPERTIES}`).del();
    await knex(`${EFFICACY_SCHEMA}.${TABLE_TABLE_UI_SCHEMA}`).del();
    await knex(`${EFFICACY_SCHEMA}.${TABLE_TABLE_UI_SCHEMA_PROPERTIES}`).del();

    // Inserts seed entries
    // Create Default Admin Roles
    await knex.into(`${EFFICACY_SCHEMA}.${TABLE_ROLES}`).insert({
        roleId: 'efficacy_admin',
        displayName: 'Efficacy Admin',
        description: 'Do not delete!!!',
        adminAccess: true,
        portalAccess: true,
        appAccess: true
    });

    const role = await knex.from(`${EFFICACY_SCHEMA}.${TABLE_ROLES}`).where('roleId', 'efficacy_admin').first();
    await knex.into(`${EFFICACY_SCHEMA}.${TABLE_ACTIVITY}`).insert({
        action: ActivityTypes.CREATE,
        tableName: TABLE_ROLES,
        objectId: role.id,
        isSystem: true
    });

    // Create Default Admin User
    const salt = bcrypt.genSaltSync(10);
    await knex.into(`${EFFICACY_SCHEMA}.${TABLE_USERS}`).insert({
        firstname: 'Efficacy',
        lastname: 'Admin',
        email: ADMIN_EMAIL ?? 'test@test.com',
        password: bcrypt.hashSync(ADMIN_PASSWORD ?? 'test@123', salt),
        roleId: role.id
    });
    const user = await knex.from(`${EFFICACY_SCHEMA}.${TABLE_USERS}`).where('email', ADMIN_EMAIL ?? 'test@test.com').first();
    await knex.into(`${EFFICACY_SCHEMA}.${TABLE_ACTIVITY}`).insert({
        action: ActivityTypes.CREATE,
        tableName: TABLE_USERS,
        objectId: user.id,
        isSystem: true
    });
};
