import { UITableColumnTypes } from "@efficacy/constants"

export interface TableUISchema {
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
    properties: TableUISchemaProperties[]
}

export interface TableUISchemaProperties {
    field: string
    headerName: string
    type?: UITableColumnTypes
}