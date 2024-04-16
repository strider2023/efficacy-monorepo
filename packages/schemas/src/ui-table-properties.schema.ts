import { BaseSchema } from "./base.schema";

export interface UITableProperties extends BaseSchema {
    uiTableId: string
    field: string
    headerName: string
    type?: string
}