import { JsonSchema } from "@jsonforms/core";

export const collectionPropertySchema: JsonSchema = {
    type: "object",
    required: [
        "propertyName",
        "displayName",
        "type",
        "nullable"
    ],
    properties: {
        propertyName: {
            type: "string",
            title: "Property Name"
        },
        displayName: {
            type: "string",
            title: "Display Name"
        },
        type: {
            type: "string",
            title: "Type",
            oneOf: [
                {
                    const: 'string',
                    title: 'String'
                },
                {
                    const: 'text',
                    title: 'Text'
                },
                {
                    const: 'integer',
                    title: 'Integer'
                },
                {
                    const: 'big-integer',
                    title: 'Big Integer'
                },
                {
                    const: 'float',
                    title: 'Float'
                },
                {
                    const: 'decimal',
                    title: 'Decimal'
                },
                {
                    const: 'boolean',
                    title: 'Boolean'
                },
                {
                    const: 'date',
                    title: 'Date'
                },
                {
                    const: 'date-time',
                    title: 'Date Time'
                },
                {
                    const: 'timestamp',
                    title: 'Timestamp'
                },
                {
                    const: 'time',
                    title: 'Time'
                },
                {
                    const: 'json',
                    title: 'JSON'
                },
                {
                    const: 'object',
                    title: 'Object'
                },
                {
                    const: 'array',
                    title: 'Array'
                },
                {
                    const: 'string-enum',
                    title: 'String Enum'
                },
                {
                    const: 'asset',
                    title: 'Asset'
                },
                {
                    const: 'hash',
                    title: 'Hash'
                }
            ]
        },
        nullable: {
            type: "boolean",
            title: "Required"
        },
        isUnique: {
            type: "boolean",
            title: "Unique"
        },
        default: {
            type: "string",
            title: "Default Value"
        },
        description: {
            type: "string",
            title: "Description"
        },
        regex: {
            type: "string",
            title: "Regex"
        },
        stringOneOf: {
            type: "array",
            title: "String One Of",
            items: {
                type: "string"
            }
        },
        stringNoneOf: {
            type: "array",
            title: "String None Of",
            items: {
                type: "string"
            }
        },
        stringLengthCheckOperator: {
            type: "string",
            title: "String Length Check Operator",
            oneOf: [
                {
                    const: '=',
                    title: 'Equals'
                },
                {
                    const: '!=',
                    title: 'Not Equals'
                },
                {
                    const: '<=',
                    title: 'Lesser Than Equals'
                },
                {
                    const: '<',
                    title: 'Lesser Than'
                },
                {
                    const: '>=',
                    title: 'Greater Than Equals'
                },
                {
                    const: '>',
                    title: 'Greater Than'
                }
            ]
        },
        stringLengthCheck: {
            type: "boolean",
            title: "String Length Check"
        },
        setNumberPositive: {
            type: "boolean",
            title: "Set Number Positive"
        },
        setNumberNegative: {
            type: "boolean",
            title: "Set Number Negative"
        },
        minimum: {
            type: "integer",
            title: "Minimum"
        },
        maximum: {
            type: "integer",
            title: "Maximum"
        },
        checkNumberRange: {
            type: "boolean",
            title: "Check Number Range"
        },
        numericPrecision: {
            type: "integer",
            title: "Numeric Precision"
        },
        numericScale: {
            type: "integer",
            title: "Numeric Scale"
        },
        enumValues: {
            type: "array",
            title: "Enum Values",
            items: {
                type: "string"
            }
        },
        dateFormat: {
            type: "string",
            title: "Date Format"
        },
        foreignKeyColumn: {
            type: "string",
            title: "Foreign Key Column"
        },
        foreignKeySchema: {
            type: "string",
            title: "Foreign Key Schema"
        },
        foreignKeyTable: {
            type: "string",
            title: "Foreign Key Table"
        }
    }
};

export const collectionPropertyUISchema = {
    type: "VerticalLayout",
    elements: [
        {
            type: "VerticalLayout",
            elements: [
                {
                    type: "HorizontalLayout",
                    elements: [
                        {
                            type: "Control",
                            scope: "#/properties/propertyName"
                        },
                        {
                            type: "Control",
                            scope: "#/properties/displayName"
                        },
                        {
                            type: "Control",
                            scope: "#/properties/type"
                        }
                    ]
                },
                {
                    type: "Control",
                    scope: "#/properties/description",
                    options: {
                        multi: true
                    }
                },
                {
                    type: "HorizontalLayout",
                    elements: [
                        {
                            type: "Control",
                            scope: "#/properties/nullable"
                        },
                        {
                            type: "Control",
                            scope: "#/properties/isUnique"
                        },
                        {
                            type: "Control",
                            scope: "#/properties/default"
                        }
                    ]
                },
                {
                    type: "Group",
                    label: "String Properties",
                    rule: {
                        effect: "SHOW",
                        condition: {
                            scope: "#/properties/type",
                            schema: { enum: ["string", "text"] }
                        }
                    },
                    elements: [
                        {
                            type: "VerticalLayout",
                            elements: [
                                {
                                    type: "HorizontalLayout",
                                    elements: [
                                        {
                                            type: "Control",
                                            scope: "#/properties/regex"
                                        },
                                        {
                                            type: "Control",
                                            scope: "#/properties/stringLengthCheckOperator"
                                        },
                                        {
                                            type: "Control",
                                            scope: "#/properties/stringLengthCheck"
                                        }
                                    ]
                                },
                                {
                                    type: "HorizontalLayout",
                                    elements: [
                                        {
                                            type: "Control",
                                            scope: "#/properties/minimum"
                                        },
                                        {
                                            type: "Control",
                                            scope: "#/properties/maximum"
                                        }
                                    ]
                                },
                                {
                                    type: "HorizontalLayout",
                                    elements: [
                                        {
                                            type: "Control",
                                            scope: "#/properties/stringOneOf"
                                        }
                                    ]
                                },
                                {
                                    type: "HorizontalLayout",
                                    elements: [
                                        {
                                            type: "Control",
                                            scope: "#/properties/stringNoneOf"
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    type: "Group",
                    label: "Number Properties",
                    rule: {
                        effect: "SHOW",
                        condition: {
                            scope: "#/properties/type",
                            schema: { enum: ["integer", "big-integer", "float", "decimal"] }
                        }
                    },
                    elements: [
                        {
                            type: "VerticalLayout",
                            elements: [
                                {
                                    type: "HorizontalLayout",
                                    elements: [
                                        {
                                            type: "Control",
                                            scope: "#/properties/setNumberPositive"
                                        },
                                        {
                                            type: "Control",
                                            scope: "#/properties/setNumberNegative"
                                        }
                                    ]
                                },
                                {
                                    type: "HorizontalLayout",
                                    elements: [
                                        {
                                            type: "Control",
                                            scope: "#/properties/minimum"
                                        },
                                        {
                                            type: "Control",
                                            scope: "#/properties/maximum"
                                        },
                                        {
                                            type: "Control",
                                            scope: "#/properties/checkNumberRange"
                                        }
                                    ]
                                },
                                {
                                    type: "HorizontalLayout",
                                    rule: {
                                        effect: "SHOW",
                                        condition: {
                                            scope: "#/properties/type",
                                            schema: { enum: ["float", "decimal"] }
                                        }
                                    },
                                    elements: [
                                        {
                                            type: "Control",
                                            scope: "#/properties/numericPrecision",
                                        },
                                        {
                                            type: "Control",
                                            scope: "#/properties/numericScale"
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    type: "Group",
                    label: "Object or Array Properties",
                    rule: {
                        effect: "SHOW",
                        condition: {
                            scope: "#/properties/type",
                            schema: { enum: ["object", "array"] }
                        }
                    },
                    elements: [
                        {
                            type: "HorizontalLayout",
                            elements: [
                                {
                                    type: "Control",
                                    scope: "#/properties/foreignKeyColumn"
                                },
                                {
                                    type: "Control",
                                    scope: "#/properties/foreignKeySchema"
                                },
                                {
                                    type: "Control",
                                    scope: "#/properties/foreignKeyTable"
                                }
                            ]
                        }
                    ]
                },
                {
                    type: "Group",
                    label: "Date Properties",
                    rule: {
                        effect: "SHOW",
                        condition: {
                            scope: "#/properties/type",
                            schema: { enum: ["date", "date-time"] }
                        }
                    },
                    elements: [
                        {
                            type: "HorizontalLayout",
                            elements: [
                                {
                                    type: "Control",
                                    scope: "#/properties/dateFormat"
                                }
                            ]
                        }
                    ]
                },
                {
                    type: "Group",
                    label: "String Enum Properties",
                    rule: {
                        effect: "SHOW",
                        condition: {
                            scope: "#/properties/type",
                            schema: { const: "string-enum" }
                        }
                    },
                    elements: [
                        {
                            type: "HorizontalLayout",
                            elements: [
                                {
                                    type: "Control",
                                    scope: "#/properties/enumValues"
                                }
                            ]
                        }
                    ]
                }
            ]
        }

    ]
};
