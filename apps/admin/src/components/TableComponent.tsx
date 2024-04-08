import { Box } from "@mui/material";
import { GridRowParams, MuiEvent, GridCallbackDetails, DataGrid, GridToolbar, GridColDef, GridValidRowModel } from "@mui/x-data-grid";
import NoDatFound from "./NoDataFound";

export interface TableComponent {
    gridRowClick: (params: GridRowParams, event: MuiEvent, details: GridCallbackDetails) => void,
    columns: GridColDef[],
    rows: GridValidRowModel[],
    emptyMessage?: string
}

function TableComponent({ gridRowClick, columns, rows, emptyMessage }: TableComponent) {
    return (
        <>
            {
                rows.length > 0 ? (
                    <Box sx={{ p: 3, width: '100%' }}>
                        <DataGrid
                            autoHeight
                            disableColumnFilter
                            disableColumnSelector
                            disableDensitySelector
                            rows={rows}
                            columns={columns}
                            sx={{ '&, [class^=MuiDataGrid]': { border: 'none' } }}
                            initialState={{
                                pagination: {
                                    paginationModel: { page: 0, pageSize: 10 },
                                },
                            }}
                            pageSizeOptions={[25, 50, 100]}
                            onRowClick={gridRowClick}
                            slots={{ toolbar: GridToolbar }}
                            slotProps={{
                                toolbar: {
                                    showQuickFilter: true,
                                },
                            }}
                        />
                    </Box>
                ) :
                    <NoDatFound message={emptyMessage || 'No data found.'} />
            }
        </>
    );
}

export default TableComponent