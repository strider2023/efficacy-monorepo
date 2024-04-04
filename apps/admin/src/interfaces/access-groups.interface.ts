export interface IAccessGroup {
    id: string
    status: string
    createdAt: string
    updatedAt: string
    accessGroupId: string
    displayName: string
    description: string
}

export interface ICreateAccessGroup {
    roleId: string
    displayName: string
    description?: string
    adminAccess: boolean
    portalAccess: boolean
    appAccess: boolean
}