export interface IFile {
    id: string
    status: string
    createdAt: string
    updatedAt: string
    assetId: string
    filename: string
    mimetype: string
    description: string
    tags: string[]
    filesize: number
}