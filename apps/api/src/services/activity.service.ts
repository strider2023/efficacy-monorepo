import { EFFICACY_SCHEMA, TABLE_ACTIVITY } from "@efficacy/constants";
import { BaseService } from "./base.service";
import { Activity } from "@efficacy/schemas";

export class ActivityService extends BaseService<Activity>{

    constructor() {
        super(`${EFFICACY_SCHEMA}.${TABLE_ACTIVITY}`, 'Activity')
    }
}