export interface ICollectionItems {
    count: number;
    attributes: ICollectionAttributes[];
    result: unknown[];
}

export interface ICollectionAttributes {
    propertyName: string
    displayName: string
    type: string
}