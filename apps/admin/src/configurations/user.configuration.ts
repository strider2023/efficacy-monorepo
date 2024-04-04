import { JsonSchema } from "@jsonforms/core";

export const userSchema: JsonSchema = {
    type: "object",
    properties: {
        firstname: {
            type: "string",
            title: "First Name"
        },
        middlename: {
            type: "string",
            title: "Middle Name"
        },
        lastname: {
            type: "string",
            title: "Last Name"
        },
        phone: {
            type: "string",
            title: "Phone"
        },
        email: {
            type: "string",
            title: "Email",
            format: "email"
        },
        password: {
            type: "string",
            title: "Default Password"
        },
        rePassword: {
            type: "string",
            title: "Re-Enter Password"
        },
        dob: {
            type: "string",
            format: "date"
        },
        role: {
            type: "string",
            oneOf: [
                {
                    const: 'admin',
                    title: 'Admin'
                },
                {
                    const: 'portal_user',
                    title: 'Portal User'
                },
                {
                    const: 'app_user',
                    title: 'Application User'
                }
            ]
        }
    },
    required: [
        "firstname",
        "lastname",
        "email",
        "password",
        "rePassword",
        "role"
    ]
};

export const userUISchema = {
    type: "VerticalLayout",
    elements: [
        {
            type: "HorizontalLayout",
            elements: [
                {
                    type: "Control",
                    scope: "#/properties/firstname"
                },
                {
                    type: "Control",
                    scope: "#/properties/middlename"
                },
                {
                    type: "Control",
                    scope: "#/properties/lastname"
                }
            ]
        },
        {
            type: "HorizontalLayout",
            elements: [
                {
                    type: "Control",
                    scope: "#/properties/dob"
                },
                {
                    type: "Control",
                    scope: "#/properties/role"
                }
            ]
        },
        {
            type: "HorizontalLayout",
            elements: [
                {
                    type: "Control",
                    scope: "#/properties/phone"
                },
                {
                    type: "Control",
                    scope: "#/properties/email"
                }
            ]
        },
        {
            type: "HorizontalLayout",
            elements: [
                {
                    type: "Control",
                    scope: "#/properties/password",
                    options: {
                        format: "password"
                    }
                },
                {
                    type: "Control",
                    scope: "#/properties/rePassword",
                    options: {
                        format: "password"
                    }
                }
            ]
        }
    ]
};
