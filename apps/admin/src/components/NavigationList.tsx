import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import Groups2RoundedIcon from '@mui/icons-material/Groups2Rounded';
import TableChartIcon from '@mui/icons-material/TableChart';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import Inventory2RoundedIcon from '@mui/icons-material/Inventory2Rounded';
import ArticleRoundedIcon from '@mui/icons-material/ArticleRounded';

import { useNavigate } from '@tanstack/react-router';
import Box from '@mui/material/Box';
import { useCookies } from 'react-cookie';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Logout from '@mui/icons-material/Logout';

interface ListItem {
    name: string;
    icon: JSX.Element;
    path: string;
}

const listItems: ListItem[] = [
    {
        name: "Collection Items",
        icon: <ArticleRoundedIcon />,
        path: "/items"
    },
    {
        name: "Collections",
        icon: <TableChartIcon />,
        path: "/collections"
    },
    {
        name: "assets",
        icon: <Inventory2RoundedIcon />,
        path: "/assets"
    },
    {
        name: "User Management",
        icon: <SupervisedUserCircleIcon />,
        path: "/users"
    },
    {
        name: "Roles",
        icon: <Groups2RoundedIcon />,
        path: "/roles"
    },
]

interface NavigationListProps {
    open: boolean
}

function NavigationList({ open }: NavigationListProps) {
    const [cookies] = useCookies(["efficacy_user"]);
    const navigate = useNavigate();

    const navigateTo = (url: string) => {
        navigate({ to: url });
    };

    return (
        <>
            <List>
                {listItems.map((item, index) => (
                    <ListItem key={index} disablePadding sx={{ display: 'block' }} onClick={() => navigateTo(item.path)}>
                        <ListItemButton
                            sx={{
                                minHeight: 72,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                            }}>
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                }}>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText primary={item.name} sx={{ opacity: open ? 1 : 0 }} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                height: '100%'
            }}>
                <List>
                    <ListItem disablePadding sx={{ display: 'block' }}>
                        <ListItemButton
                            sx={{
                                minHeight: 72,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                            }}>
                            <ListItemAvatar>
                                <Avatar sx={{
                                    bgcolor: "#ffeb3b",
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    ml: open ? 'auto' : 1,
                                    justifyContent: 'center',
                                }}>
                                    {cookies.efficacy_user.firstname.charAt(0) + cookies.efficacy_user.lastname.charAt(0)}
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="My Account" sx={{ opacity: open ? 1 : 0 }} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding sx={{ display: 'block' }}>
                        <ListItemButton
                            sx={{
                                minHeight: 72,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                            }}>
                            <ListItemIcon sx={{
                                minWidth: 0,
                                mr: open ? 3 : 'auto',
                                justifyContent: 'center',
                            }}>
                                <Logout />
                            </ListItemIcon>
                            <ListItemText primary="Logout" sx={{ opacity: open ? 1 : 0 }} />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Box>
        </>
    );
}

export default NavigationList