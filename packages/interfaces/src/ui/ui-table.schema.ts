import { UITableColumnTypes } from "@efficacy/constants"

export interface TableUISchema {
    title: string
    subtitle?: string
    showFilter?: boolean
    showAdd?: boolean
    addURL?: string
    editURL?: string
    deleteURL?: string
    defaultRowId?: string
    pageSizeOptions?: number[]
    properties: TableUISchemaProperties[]
}

export interface TableUISchemaProperties {
    field: string
    headerName: string
    flex?: number 
    align?: string, 
    headerAlign?: string, 
    type?: UITableColumnTypes
}