import * as dotenv from 'dotenv';
import * as bcrypt from 'bcrypt'
import { ActivityTypes } from '@efficacy/constants';
import { TABLE_ROLES, TABLE_USERS } from '@efficacy/constants';
import { ActivityService, RolesService, UserService } from '../services';
import { Roles } from '@efficacy/schemas';

dotenv.config();

const { ADMIN_EMAIL, ADMIN_PASSWORD } =
    process.env;

export async function seed() {
    const role = await createDefaultRole();
    if (role) {
        createDefaultAdmin(role);
    }
}

async function createDefaultRole(): Promise<Roles|undefined> {
    //Create default application roles
    let admin = await new RolesService(undefined).get('efficacy_admin', 'roleId');
    let role: Roles;
    if (!admin) {
        role = await new RolesService(undefined).create({
            roleId: 'efficacy_admin',
            displayName: 'Efficacy Admin',
            description: 'Do not delete!!!',
            adminAccess: true,
            portalAccess: true,
            appAccess: true
        });
        await new ActivityService().create({
            action: ActivityTypes.CREATE,
            tableName: TABLE_ROLES,
            objectId: role.id,
            isSystem: true
        });
        return role;
    } else {
        console.info("Default admin role exists");
    }
}

async function createDefaultAdmin(role: Roles) {
    // Create default user
    if (ADMIN_EMAIL && ADMIN_PASSWORD) {
        const user = await new UserService().get(ADMIN_EMAIL, 'email');
        if (!user) {
            const salt = bcrypt.genSaltSync(10);
            const request = {
                firstname: 'Efficacy',
                lastname: 'Admin',
                email: ADMIN_EMAIL,
                password: bcrypt.hashSync(ADMIN_PASSWORD, salt),
                roleId: role.id
            }
            const user = await new UserService().create(request);
            await new ActivityService().create({
                action: ActivityTypes.CREATE,
                tableName: TABLE_USERS,
                objectId: user.id,
                isSystem: true
            });
        } else {
            console.info("Default admin exists");
        }
    } else {
        console.error("Default Admin email and password not provided!!");
    }
}