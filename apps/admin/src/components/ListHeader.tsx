import { Box, Typography, Fab } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

export interface ListHeader {
    pageGroup: string,
    pageName: string,
    navigateTo: () => void
}

function ListHeader({ pageGroup, pageName, navigateTo }: ListHeader) {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
            <Box sx={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'center',
                flexDirection: 'column',
                flexGrow: 1
            }}>
                <Typography variant="overline" gutterBottom>
                    {pageGroup}
                </Typography>
                <Typography variant="h5" >
                    {pageName}
                </Typography>
            </Box>
            <Fab color="primary" aria-label="add" onClick={navigateTo}>
                <AddIcon />
            </Fab>
        </Box>
    );
}

export default ListHeader