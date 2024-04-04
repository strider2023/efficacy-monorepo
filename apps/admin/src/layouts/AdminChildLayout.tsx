import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { useRouter } from '@tanstack/react-router';
import { Fab, Tooltip, Typography } from '@mui/material';
import SaveRoundedIcon from '@mui/icons-material/SaveRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import AdminLayout from './AdminLayout';

interface AdminChildLayoutProps {
    pageGroup: string
    pageName: string
    showSave?: string
    showEdit?: string
    showDelete?: string
    children: JSX.Element
    onDelete?: () => void
    onSave?: () => void
    onEdit?: () => void
}

function AdminChildLayout({ pageGroup, pageName, showSave, showEdit, showDelete, children, onDelete, onSave, onEdit }: AdminChildLayoutProps) {
    const router = useRouter();

    const goBack = () => {
        router.history.back();
    }

    return (
        <AdminLayout>
            <Box sx={{ p: 2, width: '100%' }}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="back"
                        sx={{ mr: 2 }}
                        onClick={goBack}>
                        <ArrowBackIcon />
                    </IconButton>
                    <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="overline" gutterBottom>
                            {pageGroup}
                        </Typography>
                        <Typography variant="h5" >
                            {pageName}
                        </Typography>
                    </Box>
                    {
                        showDelete &&
                        <Tooltip title={showDelete}>
                            <Fab
                                color="primary"
                                aria-label="delete"
                                sx={{ m: 1, backgroundColor: 'red' }}
                                onClick={onDelete}>
                                <DeleteRoundedIcon />
                            </Fab>
                        </Tooltip>
                    }
                    {
                        showEdit &&
                        <Tooltip title={showEdit}>
                            <Fab
                                color="primary"
                                aria-label="save"
                                sx={{ m: 1 }}
                                onClick={onEdit}>
                                <EditRoundedIcon />
                            </Fab>
                        </Tooltip>
                    }
                    {
                        showSave &&
                        <Tooltip title={showSave}>
                            <Fab
                                color="primary"
                                aria-label="save"
                                sx={{ m: 1 }}
                                onClick={onSave}>
                                <SaveRoundedIcon />
                            </Fab>
                        </Tooltip>
                    }
                </Box>
                <Box sx={{ p: 2 }}>
                    {children}
                </Box>
            </Box>
        </AdminLayout>
    );
}

export default AdminChildLayout