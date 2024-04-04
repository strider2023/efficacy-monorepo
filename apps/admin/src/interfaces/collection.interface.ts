export interface ICollection {
    id: string
    status: string
    collectionId: string
    displayName: string
    description: string
    schemaName: string
    tableName: string
    createAccessType: string
    readAccessType: string
    updateAccessType: string
    deleteAccessType: string
}

export interface ICollectionProperties {
    id?: string
    status: string
    createdAt?: Date
    updatedAt?: Date
    deletedAt?: Date
    propertyName: string
    displayName: string
    description?: string
    propertyType: string
    required: boolean
    isUnique: boolean
    default?: string
    maximum?: number
    minimum?: number
    pattern?: string
    isEnum?: boolean
    enumValues?: string[]
}