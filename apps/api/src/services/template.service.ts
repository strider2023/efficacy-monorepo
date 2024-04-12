import { UITableColumnTypes } from "@efficacy/constants";
import { TableUISchema } from "@efficacy/interfaces";

export class TemplateService {

    public getUITableSchema(templateId: string): TableUISchema {
        const schema: TableUISchema = {
            title: "Roles",
            subtitle: "Permissions Management",
            showFilter: true,
            showAdd: true,
            addURL: '/roles/create',
            editURL: '/roles/{roleId}',
            deleteURL: '/api/roles/{roleId}',
            properties: [
                { field: 'id', headerName: 'ID' },
                { field: 'roleId', headerName: 'Role Id' },
                { field: 'displayName', headerName: 'Display Name' },
                { field: 'description', headerName: 'Description' },
                { field: 'adminAccess', headerName: 'Admin Access', type: UITableColumnTypes.BOOLEAN },
                { field: 'portalAccess', headerName: 'Portal Access', type: UITableColumnTypes.BOOLEAN },
                { field: 'appAccess', headerName: 'App Access', type: UITableColumnTypes.BOOLEAN },
                { field: 'status', headerName: 'App Access' },
                { field: 'createdAt', headerName: 'Created On', type: UITableColumnTypes.STRING },
                { field: 'updatedAt', headerName: 'Updated On', type: UITableColumnTypes.STRING },
            ]
        }
        return schema
    }
}