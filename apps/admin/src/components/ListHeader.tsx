import { Box, Typography, Fab, IconButton } from "@mui/material";
import { useRouter } from "@tanstack/react-router";

interface ListHeader {
    title: string,
    subtitle: string,
    showBack?: boolean,
    navigateTo: () => void
}

function ListHeader({ subtitle, title, showBack, navigateTo }: ListHeader) {
    const router = useRouter();

    const goBack = () => {
        router.history.back();
    }

    return (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
            {
                showBack &&
                <IconButton
                    color="inherit"
                    aria-label="back"
                    sx={{ mr: 2 }}
                    onClick={goBack}>
                    <i className="ti ti-arrow-left menu-item-icon"></i>
                </IconButton>
            }
            <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center', flexDirection: 'column', flexGrow: 1, ml: 1 }}>
                <Typography variant="h5" >
                    {title}
                </Typography>
                <Typography variant="overline" gutterBottom>
                    {subtitle}
                </Typography>
            </Box>
            <Box>
                <Fab color="primary" aria-label="add" variant="extended" sx={{ m: 1 }}>
                    <i className="ti ti-adjustments menu-item-icon"></i>
                    Filter
                </Fab>
                <Fab color="primary" aria-label="add" size="medium" sx={{ m: 1 }} onClick={navigateTo}>
                    <i className="ti ti-plus menu-item-icon"></i>
                </Fab>
            </Box>
        </Box>
    );
}

export default ListHeader