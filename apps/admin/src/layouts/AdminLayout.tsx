import { useState } from 'react'
import IconButton from '@mui/material/IconButton';
import CssBaseline from '@mui/material/CssBaseline';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Drawer, DrawerHeader } from '../components/ApplicationDrawer';
import NavigationList from '../components/NavigationList';

interface AdminLayoutProps {
    children: JSX.Element
}

function AdminLayout({ children }: AdminLayoutProps) {
    const theme = useTheme();
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
            <Drawer variant="permanent" open={open} sx={{ backgroundColor: '#393958' }}>
                <DrawerHeader>
                    {
                        open ?

                            <>
                                <img
                                    src="/efficacy-logo.svg"
                                    alt="App Icon"
                                    loading="lazy"
                                    height={40}
                                />
                                <Box sx={{ display: "flex", justifyContent: "space-between", width: "200px" }} />
                                <IconButton onClick={handleDrawerClose}>
                                    {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                                </IconButton>
                            </> :
                            <>
                                <IconButton
                                    color="inherit"
                                    aria-label="open drawer"
                                    onClick={handleDrawerOpen}
                                    sx={{
                                        ml: 4
                                    }}>
                                    <img
                                        src="/efficacy-logo.svg"
                                        alt="App Icon"
                                        loading="lazy"
                                        height={40}
                                    />
                                </IconButton>
                            </>
                    }
                </DrawerHeader>
                <NavigationList open={open} />
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, height: '100vh' }}>
                {children}
            </Box>
        </Box>
    );
}

export default AdminLayout