import { Roles } from "@efficacy/schemas";
import { BaseService } from "./base.service";
import { EFFICACY_SCHEMA, TABLE_ROLES } from "@efficacy/constants";

export class RolesService extends BaseService<Roles> {

    constructor(email?: string) {
        super(`${EFFICACY_SCHEMA}.${TABLE_ROLES}`, 'Roles', email);
    }
}