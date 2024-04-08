import { Roles } from "@efficacy/schemas";
import { BaseService } from "./base.service";
import { EFFICACY_SCHEMA, TABLE_ROLES, UITableColumnTypes } from "@efficacy/constants";
import { TableUISchema } from "@efficacy/interfaces";

export class RolesService extends BaseService<Roles> {

    constructor(email?: string) {
        super(`${EFFICACY_SCHEMA}.${TABLE_ROLES}`, 'Roles', email);
    }

    public getUITableSchema(): TableUISchema {
        const schema: TableUISchema = {
            title: "Roles",
            subtitle: "Permissions Management",
            showFilter: true,
            showAdd: true,
            addURL: '/roles/create',
            editURL: '/roles/{roleId}',
            deleteURL: '/api/roles/{roleId}',
            properties: [
                { field: 'id', headerName: 'ID', flex: 1, align: 'center', headerAlign: 'center' },
                { field: 'roleId', headerName: 'Role Id', flex: 1, align: 'center', headerAlign: 'center' },
                { field: 'displayName', headerName: 'Display Name', flex: 1, align: 'center', headerAlign: 'center' },
                { field: 'description', headerName: 'Description', flex: 1, align: 'center', headerAlign: 'center' },
                { field: 'adminAccess', headerName: 'Admin Access', flex: 1, align: 'center', headerAlign: 'center', type: UITableColumnTypes.BOOLEAN },
                { field: 'portalAccess', headerName: 'Portal Access', flex: 1, align: 'center', headerAlign: 'center', type: UITableColumnTypes.BOOLEAN },
                { field: 'appAccess', headerName: 'App Access', flex: 1, align: 'center', headerAlign: 'center', type: UITableColumnTypes.BOOLEAN },
                { field: 'status', headerName: 'App Access', flex: 1, align: 'center', headerAlign: 'center' },
                { field: 'createdAt', headerName: 'Created On', flex: 1, align: 'center', headerAlign: 'center', type: UITableColumnTypes.STRING },
                { field: 'updatedAt', headerName: 'Updated On', flex: 1, align: 'center', headerAlign: 'center', type: UITableColumnTypes.STRING },
            ]
        }
        return schema
    }
}