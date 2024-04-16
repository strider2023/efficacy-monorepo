import { BaseSchema } from "./base.schema";

export interface UITable extends BaseSchema {
    collectionId: string
    title: string
    subtitle?: string
    showFilter?: boolean
    addURL?: string
    viewURL?: string
    editURL?: string
    duplicateURL?: string
    deleteURL?: string
    deleteHeader?: string
    deleteDescription?: string
    defaultRowId?: string
}