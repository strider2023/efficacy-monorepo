import { Status } from "@efficacy/constants"

export interface BaseSchema {
    id: string
    status: Status
    createdAt: Date
    updatedAt: Date
}