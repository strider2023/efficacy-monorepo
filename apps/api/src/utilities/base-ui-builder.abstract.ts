import { CollectionProperty } from "@efficacy/schemas";

export abstract class BaseUIBuilder {
    public abstract getUIConfig(properties: CollectionProperty[]): any;
}