import { JsonSchema } from "@jsonforms/core";

export const collectionSchema: JsonSchema = {
    type: "object",
    required: [
        "collectionId",
        "displayName",
        "tableName"
    ],
    properties: {
        collectionId: {
            type: "string",
            title: "Collection ID"
        },
        displayName: {
            type: "string",
            title: "Display Name"
        },
        tableName: {
            type: "string",
            title: "Table Name"
        },
        description: {
            type: "string",
            title: "Description"
        },
        permissions: {
            type: "array",
            title: "Permissions",
            items: {
                type: "string"
            }
        },
        isPublic: {
            type: "boolean",
            title: "Public"
        },
        useTimestamps: {
            type: "boolean",
            title: "Use Timestamps"
        }
    }
};

export const collectionUISchema = {
    "type": "VerticalLayout",
    "elements": [
        {
            "type": "HorizontalLayout",
            "elements": [
                {
                    type: "Control",
                    scope: "#/properties/collectionId"
                },
                {
                    type: "Control",
                    scope: "#/properties/displayName"
                },
                {
                    type: "Control",
                    scope: "#/properties/tableName"
                }
            ]
        },
        {
            "type": "HorizontalLayout",
            "elements": [
                {
                    type: "Control",
                    scope: "#/properties/description",
                    options: {
                        multi: true
                    }
                }
            ]
        },
        {
            "type": "HorizontalLayout",
            "elements": [
                {
                    type: "Control",
                    scope: "#/properties/isPublic"
                },
                {
                    type: "Control",
                    scope: "#/properties/useTimestamps"
                }
            ]
        },
        {
            "type": "HorizontalLayout",
            "elements": [
                {
                    type: "Control",
                    scope: "#/properties/permissions"
                }
            ]
        }
    ]
};
