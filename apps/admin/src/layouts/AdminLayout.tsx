import { useState } from 'react'
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import NavigationList from '../components/NavigationList';
import Drawer from '@mui/material/Drawer';
import { Hidden } from '@mui/material';
import AppHeader from '../components/AppHeader';

interface AdminLayoutProps {
    title: string
    subtitle?: string
    showBack?: boolean
    menuItem?: JSX.Element
    children: JSX.Element
}

function AdminLayout({ title, subtitle, showBack, menuItem, children }: AdminLayoutProps) {
    const [open, setOpen] = useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Hidden lgDown>
                <NavigationList />

            </Hidden>
            <Hidden lgUp>
                <Drawer open={open} onClose={handleDrawerClose} sx={{ backgroundColor: '#393958' }}>
                    <NavigationList />
                </Drawer>
            </Hidden>
            <Box component="main" sx={{ flexGrow: 1, height: '100vh', overflow: 'auto' }}>
                <AppHeader title={title} subtitle={subtitle} showBack={showBack} menuItem={menuItem} handleDrawerOpen={handleDrawerOpen} />
                {children}
            </Box>
        </Box>
    );
}

export default AdminLayout