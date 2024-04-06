import { MenuItem } from '@efficacy/interfaces';

export const adminMenuItems: MenuItem[] = [
    {
        name: "Collection Items",
        icon: "ti ti-augmented-reality",
        navigationURL: "/items",
        hasChildren: false
    },
    {
        name: "Collections",
        icon: "ti ti-database",
        navigationURL: "/collections",
        hasChildren: false
    },
    {
        name: "Assets",
        icon: "ti ti-folder",
        navigationURL: "/assets",
        hasChildren: false
    },
    {
        name: "User Management",
        icon: "ti ti-users-group",
        hasChildren: true,
        children: [
            {

                name: "Users",
                icon: "ti ti-user",
                navigationURL: "/users"

            },
            {

                name: "Roles and Permissions",
                icon: "ti ti-user-cog",
                navigationURL: "/roles"

            }
        ]
    }
]

export const portalUserMenuItems: MenuItem[] = [
    {
        name: "Collection Items",
        icon: "ti ti-augmented-reality",
        navigationURL: "/items",
        hasChildren: false
    },
    {
        name: "Collections",
        icon: "ti ti-database",
        navigationURL: "/collections",
        hasChildren: false
    },
    {
        name: "Assets",
        icon: "ti ti-folder",
        navigationURL: "/assets",
        hasChildren: false
    }
]