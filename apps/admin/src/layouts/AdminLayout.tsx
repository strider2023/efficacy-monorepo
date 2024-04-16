import { useState } from 'react'
import CssBaseline from '@mui/material/CssBaseline';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import NavigationList from '../components/NavigationList';
import Drawer from '@mui/material/Drawer';
import { Hidden } from '@mui/material';

interface AdminLayoutProps {
    children: JSX.Element
}

function AdminLayout({ children }: AdminLayoutProps) {
    const theme = useTheme();
    const [open, setOpen] = useState(true);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Hidden mdDown>
                <NavigationList />
            </Hidden>
            <Hidden mdUp>
                <Drawer open={open} onClose={handleDrawerClose} sx={{ backgroundColor: '#393958' }}>
                    <NavigationList />
                </Drawer>
            </Hidden>
            <Box component="main" sx={{ flexGrow: 1, height: '100vh', overflow: 'auto' }}>
                {children}
            </Box>
        </Box>
    );
}

export default AdminLayout