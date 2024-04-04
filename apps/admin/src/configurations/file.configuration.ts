import { JsonSchema } from "@jsonforms/core";

export const fileSchema: JsonSchema = {
    type: "object",
    required: [
        "filename"
    ],
    properties: {
        assetId: {
            type: "string",
            title: "Asset Id"
        },
        filename: {
            type: "string",
            title: "Filename"
        },
        mimetype: {
            type: "string",
            title: "Mime Type"
        },
        description: {
            type: "string",
            title: "Description"
        },
        filesize: {
            type: "string",
            title: "File Size"
        },
        tags: {
            type: "array",
            title: "Tags",
            items: {
                type: "string"
            }
        }
    }
};

export const fileUISchema = {
    type: "VerticalLayout",
    elements: [
        {
            type: "HorizontalLayout",
            elements: [
                {
                    type: "Control",
                    scope: "#/properties/assetId",
                    options: {
                        readonly: true
                    }
                },
                {
                    type: "Control",
                    scope: "#/properties/filename"
                }
            ]
        },
        {
            type: "HorizontalLayout",
            elements: [
                {
                    type: "Control",
                    scope: "#/properties/mimetype",
                    options: {
                        readonly: true
                    }
                },
                {
                    type: "Control",
                    scope: "#/properties/filesize",
                    options: {
                        readonly: true
                    }
                }
            ]
        },
        {
            type: "HorizontalLayout",
            elements: [
                {
                    type: "Control",
                    scope: "#/properties/description"
                }
            ]
        },
        {
            type: "HorizontalLayout",
            elements: [
                {
                    type: "Control",
                    scope: "#/properties/tags",
                    options: {
                        multi: true
                    }
                }
            ]
        }
    ]
};
