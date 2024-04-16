import { UITableColumnTypes } from "@efficacy/constants";
import { TableUISchema } from "@efficacy/interfaces";

export class TemplateService {

    public getUITableSchema(templateId: string): TableUISchema | undefined {
        switch (templateId) {
            case 'roles':
                return this.getRolesSchema();
            case 'users':
                return this.getUsersSchema();
            case 'collections':
                return this.getCollectionsSchema();
            case 'assets':
                return this.getAssetsSchema();
        }
    }

    private getAssetsSchema(): TableUISchema {
        return {
            title: "Assets",
            subtitle: "Asset Management",
            showFilter: true,
            addURL: '/assets/create',
            viewURL: '/assets/{assetId}',
            editURL: '/assets/{assetId}/edit',
            deleteURL: '/api/assets/{assetId}',
            properties: [
                { field: 'id', headerName: 'ID' },
                { field: 'assetId', headerName: 'Asset Id' },
                { field: 'filename', headerName: 'File Name' },
                { field: 'mimetype', headerName: 'MIME Type' },
                { field: 'destination', headerName: 'Destination' },
                { field: 'path', headerName: 'Path' },
                { field: 'filesize', headerName: 'Size' },
                { field: 'description', headerName: 'Description' },
                { field: 'tags', headerName: 'Tags' },
                { field: 'status', headerName: 'Status' },
                { field: 'createdAt', headerName: 'Created On', type: UITableColumnTypes.STRING },
                { field: 'updatedAt', headerName: 'Updated On', type: UITableColumnTypes.STRING },
            ]
        }
    }

    private getCollectionsSchema(): TableUISchema {
        return {
            title: "Collections",
            subtitle: "Entity Management",
            showFilter: true,
            addURL: '/collections/create',
            viewURL: '/collections/{collectionId}',
            editURL: '/collections/{collectionId}/edit',
            deleteURL: '/api/collections/{collectionId}',
            properties: [
                { field: 'id', headerName: 'ID' },
                { field: 'collectionId', headerName: 'Collection Id' },
                { field: 'displayName', headerName: 'Display Name' },
                { field: 'description', headerName: 'Description' },
                { field: 'schemaName', headerName: 'Schema Name' },
                { field: 'tableName', headerName: 'Table Name' },
                { field: 'isPublic', headerName: 'Is Public', type: UITableColumnTypes.BOOLEAN },
                { field: 'useTimestamps', headerName: 'Use Timestamps', type: UITableColumnTypes.BOOLEAN },
                { field: 'status', headerName: 'Status' },
                { field: 'createdAt', headerName: 'Created On', type: UITableColumnTypes.STRING },
                { field: 'updatedAt', headerName: 'Updated On', type: UITableColumnTypes.STRING },
            ]
        }
    }

    private getUsersSchema(): TableUISchema {
        return {
            title: "Users",
            subtitle: "User Management",
            showFilter: true,
            addURL: '/users/create',
            viewURL: '/users/{roleId}',
            editURL: '/users/{roleId}/edit',
            deleteURL: '/api/users/{roleId}',
            properties: [
                { field: 'id', headerName: 'ID' },
                { field: 'firstname', headerName: 'First Name' },
                { field: 'middlename', headerName: 'Middle Name' },
                { field: 'lastname', headerName: 'Last Name' },
                { field: 'phone', headerName: 'Phone' },
                { field: 'email', headerName: 'Email' },
                { field: 'status', headerName: 'Status' },
                { field: 'createdAt', headerName: 'Created On', type: UITableColumnTypes.STRING },
                { field: 'updatedAt', headerName: 'Updated On', type: UITableColumnTypes.STRING },
            ]
        }
    }

    private getRolesSchema(): TableUISchema {
        return {
            title: "Roles",
            subtitle: "Permissions Management",
            showFilter: true,
            addURL: '/roles/create',
            viewURL: '/users/{roleId}',
            editURL: '/roles/{roleId}/edit',
            deleteURL: '/api/roles/{roleId}',
            properties: [
                { field: 'id', headerName: 'ID' },
                { field: 'roleId', headerName: 'Role Id' },
                { field: 'displayName', headerName: 'Display Name' },
                { field: 'description', headerName: 'Description' },
                { field: 'adminAccess', headerName: 'Admin Access', type: UITableColumnTypes.BOOLEAN },
                { field: 'portalAccess', headerName: 'Portal Access', type: UITableColumnTypes.BOOLEAN },
                { field: 'appAccess', headerName: 'App Access', type: UITableColumnTypes.BOOLEAN },
                { field: 'status', headerName: 'Status' },
                { field: 'createdAt', headerName: 'Created On', type: UITableColumnTypes.STRING },
                { field: 'updatedAt', headerName: 'Updated On', type: UITableColumnTypes.STRING },
            ]
        }
    }
}