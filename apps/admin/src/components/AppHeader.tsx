import { Box, Typography, Fab, IconButton, Hidden } from "@mui/material";
import { useRouter } from "@tanstack/react-router";

interface AppHeader {
    title: string,
    subtitle?: string,
    handleDrawerOpen?: () => void
    showBack?: boolean,
    menuItem?: JSX.Element
}

function AppHeader({ subtitle, title, showBack, handleDrawerOpen, menuItem }: AppHeader) {
    const router = useRouter();

    const goBack = () => {
        router.history.back();
    }

    return (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginTop: 2, marginBottom: 2 }}>
            <Hidden lgUp>
                <IconButton aria-label="navigatio menu" sx={{ ml: 2 }} onClick={handleDrawerOpen}>
                    <i className="ti ti-layout-sidebar-left-expand menu-item-icon"></i>
                </IconButton>
            </Hidden>
            {
                showBack &&
                <IconButton
                    aria-label="back"
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
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', mr: 2 }}>
                {menuItem}
            </Box>
        </Box>
    );
}

export default AppHeader