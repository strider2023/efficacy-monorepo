import { getProccessedString } from "@efficacy/ui-utilities";
import { Box, Typography, Fab } from "@mui/material";
import { GridPaginationModel, GridCallbackDetails, DataGrid, GridActionsCellItem, GridToolbar, gridClasses } from "@mui/x-data-grid";
import { useNavigate } from "@tanstack/react-router";
import axios from "axios";
import Notiflix from "notiflix";
import { useCallback } from "react";
import Cookies from 'js-cookie';

interface AppTable {
    offset: unknown,
    limit: unknown,
    pageConfig: any,
    rows: any,
}

function AppTable({ offset, limit, pageConfig, rows }: AppTable) {
    const navigate = useNavigate();

    const deleteItem = useCallback(
        (params: any) => () => {
            Notiflix.Confirm.show(
                pageConfig?.deleteHeader ?? 'Delete',
                pageConfig?.deleteDescription ?? 'Are you sure you want to delete this item?',
                'Delete',
                'Cancel',
                function okCb() {
                    axios.delete(`${import.meta.env.VITE_BASE_URL}${getProccessedString(pageConfig.deleteURL, params.row)}`,
                        {
                            headers: {
                                Authorization: `${Cookies.get('efficacy_token')}`,
                            },
                        }).then(() => {
                            location.reload();
                        })
                }
            );
        },
        [pageConfig?.deleteDescription, pageConfig?.deleteHeader, pageConfig.deleteURL],
    );

    const viewItem = useCallback(
        (params: any) => () => {
            navigate({ to: getProccessedString(pageConfig.viewURL, params.row) });
        },
        [navigate, pageConfig.viewURL],
    );

    const editItem = useCallback(
        (params: any) => () => {
            navigate({ to: getProccessedString(pageConfig.editURL, params.row) });
        },
        [navigate, pageConfig.editURL],
    );

    const duplicateItem = useCallback(
        (params: any) => () => {
            navigate({ to: getProccessedString(pageConfig.duplicateURL, params.row) });
        },
        [navigate, pageConfig.duplicateURL],
    );

    const setPaginationModel = (model: GridPaginationModel, details: GridCallbackDetails<any>): void => {
        navigate({
            search: () => ({ offset: model.page, limit: model.pageSize }),
        })
    }

    const setAdditionalPropertyConfigs = (properties: any) => {
        const apiProperties = [];
        for (const prop of properties) {
            apiProperties.push({ ...prop, ...{ flex: 1, align: 'center', headerAlign: 'center' } });
        }
        return apiProperties;
    }

    const populateActions = (params: unknown) => {
        const actions = [];
        if (Object.prototype.hasOwnProperty.call(pageConfig, 'viewURL')) {
            actions.push(<GridActionsCellItem
                icon={<i className="ti ti-eye menu-item-icon"></i>}
                label="View"
                onClick={viewItem(params)}
                showInMenu
            />)
        }
        if (Object.prototype.hasOwnProperty.call(pageConfig, 'editURL')) {
            actions.push(<GridActionsCellItem
                icon={<i className="ti ti-edit menu-item-icon"></i>}
                label="Edit"
                onClick={editItem(params)}
                showInMenu
            />)
        }
        if (Object.prototype.hasOwnProperty.call(pageConfig, 'deleteURL')) {
            actions.push(<GridActionsCellItem
                icon={<i className="ti ti-trash menu-item-icon"></i>}
                label="Delete"
                onClick={deleteItem(params)}
                showInMenu
            />)
        }
        if (Object.prototype.hasOwnProperty.call(pageConfig, 'duplicateURL')) {
            actions.push(<GridActionsCellItem
                icon={<i className="ti ti-copy menu-item-icon"></i>}
                label="Duplicate"
                onClick={duplicateItem(params)}
                showInMenu
            />)
        }
        return actions;
    }

    return (
        <Box sx={{ p: 2 }}>
            <DataGrid
                autoHeight
                disableRowSelectionOnClick
                rows={rows.result}
                columns={[...setAdditionalPropertyConfigs(pageConfig.properties), {
                    field: 'actions',
                    type: 'actions',
                    flex: 1, align: 'center', headerAlign: 'center',
                    getActions: (params: unknown) => populateActions(params)
                }]}
                sx={{
                    '&, [class^=MuiDataGrid]': { border: 'none' },
                    [`& .${gridClasses.cell}:focus, & .${gridClasses.cell}:focus-within`]: {
                        outline: 'none',
                    },
                    [`& .${gridClasses.columnHeader}:focus, & .${gridClasses.columnHeader}:focus-within`]:
                    {
                        outline: 'none',
                    },
                }}
                rowCount={Number(rows.count[0].count ?? 0)}
                paginationModel={{
                    pageSize: Number(offset ?? 50),
                    page: Number(limit ?? 0),
                }}
                onPaginationModelChange={setPaginationModel}
                paginationMode="server"
                pageSizeOptions={[50, 75, 100]}
                slots={{ toolbar: GridToolbar }}
                slotProps={{
                    toolbar: {
                        showQuickFilter: true,
                    },
                }}
                initialState={{
                    columns: {
                        columnVisibilityModel: {
                            id: false,
                            status: false,
                            createdAt: false,
                            updatedAt: false,
                        },
                    },
                }}
            />
        </Box>
    )
}

export default AppTable