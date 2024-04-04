import { ActivityTypes } from "@efficacy/constants";
import { BaseSchema } from "./base.schema";

export interface Activity extends BaseSchema {
    action: ActivityTypes;
    tableName: string;
    objectId: string;
    changes?: JSON;
    userId?: string;
    isSystem?: boolean;
    ip?: string;
    revision?: number;
}