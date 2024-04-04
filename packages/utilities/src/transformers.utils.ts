import { CollectionProperty } from "@efficacy/schemas";
import { JsonSchema } from "@efficacy/interfaces";

export class Transformers {
    
    public async generateCollectionJSONSchema(properties: CollectionProperty[]): Promise<JsonSchema|undefined> {
        try {
            const requiredFields: string[] = [];
            let schemaProperties: any = {};
            for (const p of properties) {
                let jsonSchemaObj: any = {
                    type: this.jsonSchemType(p.type),
                    title: p.displayName,
                    nullable: p.nullable
                };
                if (!p.nullable) {
                    requiredFields.push(p.propertyName)
                }
                if (p.maximum) {
                    jsonSchemaObj['maxLength'] = p.maximum;
                }
                if (p.minimum) {
                    jsonSchemaObj['minLength'] = p.minimum;
                }
                if (p.type == 'string-enum') {
                    jsonSchemaObj['enum'] = p.enumValues;
                }
                schemaProperties[p.propertyName] = { ...jsonSchemaObj };
            }
            return {
                type: "object",
                required: requiredFields,
                properties: schemaProperties
            };
        } catch (e) {
            console.error(e);
            return undefined;
        }
    }

    // 'json',
    // 'object',
    // 'array',
    // 'asset',
    // 'hash'
    private jsonSchemType(type: string): string {
        if (type == 'integer' || type == 'big-integer') {
            return 'integer';
        }
        if (type == 'float' || type == 'decimal') {
            return 'number';
        }
        if (type == 'string' || type == 'string-enum' || type == 'text') {
            return 'string';
        }
        if (type == 'timestamp') {
            return 'time';
        }
        return type;
    }
}