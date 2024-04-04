import { JsonSchema } from "@jsonforms/core";

export const roleSchema: JsonSchema = {
    type: "object",
    required: [
        "roleId",
        "displayName",
        "adminAccess",
        "portalAccess",
        "appAccess"
    ],
    properties: {
        roleId: {
            type: "string",
            title: "Role ID"
        },
        displayName: {
            type: "string",
            title: "Display Name"
        },
        description: {
            type: "string",
            title: "Description"
        },
        adminAccess: {
            type: "boolean",
            title: "Admin Access"
        },
        portalAccess: {
            type: "boolean",
            title: "Protal Access"
        },
        appAccess: {
            type: "boolean",
            title: "App Access"
        }
    }
};

export const roleUISchema = {
    type: "VerticalLayout",
    elements: [
        {
            type: "HorizontalLayout",
            elements: [
                {
                    type: "Control",
                    scope: "#/properties/roleId"
                },
                {
                    type: "Control",
                    scope: "#/properties/displayName"
                }
            ]
        },
        {
            type: "HorizontalLayout",
            elements: [
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
            type: "HorizontalLayout",
            elements: [
                {
                    type: "Control",
                    scope: "#/properties/adminAccess"
                },
                {
                    type: "Control",
                    scope: "#/properties/portalAccess"
                },
                {
                    type: "Control",
                    scope: "#/properties/appAccess"
                }
            ]
        }
    ]
};

export const updateRoleSchema: JsonSchema = {
    type: "object",
    required: [
        "displayName"
    ],
    properties: {
        displayName: {
            type: "string",
            title: "Display Name"
        },
        description: {
            type: "string",
            title: "Description"
        },
        adminAccess: {
            type: "boolean",
            title: "Admin Access"
        },
        portalAccess: {
            type: "boolean",
            title: "Protal Access"
        },
        appAccess: {
            type: "boolean",
            title: "App Access"
        }
    }
};

export const updateRoleUISchema = {
    type: "VerticalLayout",
    elements: [
        {
            type: "HorizontalLayout",
            elements: [
                {
                    type: "Control",
                    scope: "#/properties/displayName"
                }
            ]
        },
        {
            type: "HorizontalLayout",
            elements: [
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
            type: "HorizontalLayout",
            elements: [
                {
                    type: "Control",
                    scope: "#/properties/adminAccess"
                },
                {
                    type: "Control",
                    scope: "#/properties/portalAccess"
                },
                {
                    type: "Control",
                    scope: "#/properties/appAccess"
                }
            ]
        }
    ]
};
