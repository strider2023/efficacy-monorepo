import { UITableColumnTypes } from "@efficacy/constants"

export interface TableUISchema {
    title: string
    subtitle?: string
    showFilter?: boolean
    showAdd?: boolean
    addURL?: string
    editURL?: string
    deleteURL?: string
    deleteHeader?: string
    deleteDescription?: string
    defaultRowId?: string
    pageSizeOptions?: number[]
    properties: TableUISchemaProperties[]
}

export interface TableUISchemaProperties {
    field: string
    headerName: string
    type?: UITableColumnTypes
}