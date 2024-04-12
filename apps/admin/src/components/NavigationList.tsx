import List from '@mui/material/List';
import { useNavigate } from '@tanstack/react-router';
import Box from '@mui/material/Box';
import { useCookies } from 'react-cookie';
import Avatar from '@mui/material/Avatar';
import { MenuItem } from '@efficacy/interfaces';
import { useEffect, useState } from 'react';
import CollapseableMenuListItem from './CollapseableMenuListItem';
import MenuListItem from './MenuListItem';
import { adminMenuItems, portalUserMenuItems } from '../configurations';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import { red } from '@mui/material/colors';
import Divider from '@mui/material/Divider';

function NavigationList() {
    const [cookies] = useCookies(["efficacy_user"]);
    const [listItems, setListItems] = useState<MenuItem[]>()
    const navigate = useNavigate();

    useEffect(() => {
        if (cookies.efficacy_user.adminAccess) {
            setListItems(adminMenuItems);
        } else {
            setListItems(portalUserMenuItems);
        }
    }, [cookies.efficacy_user])

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', background: '#181825', width: 270 }}>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <img
                    src="/efficacy-logo.svg"
                    alt="App Icon"
                    loading="lazy"
                    className="menu-header-logo"
                />
                <Typography variant="h5">
                    Efficacy Admin
                </Typography>
            </Box>
            <Divider />
            {
                listItems &&
                <List>
                    {
                        listItems.map((item, index) => (
                            <>
                                {
                                    item.hasChildren ? <CollapseableMenuListItem data={item} key={index}/> : <MenuListItem data={item} key={index}/>
                                }
                            </>
                        ))
                    }
                </List>
            }
            <Box sx={{ marginBottom: 'auto' }} />
            <Card sx={{ maxWidth: 260, marginLeft: 1, marginTop: 'auto', marginRight: 1, marginBottom: 1 }}>
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                            {cookies.efficacy_user.firstname.charAt(0) + cookies.efficacy_user.lastname.charAt(0)}
                        </Avatar>
                    }
                    title={cookies.efficacy_user.firstname + " " + cookies.efficacy_user.lastname}
                    subheader={cookies.efficacy_user.email}
                />
                <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                        <i className="ti ti-logout menu-item-icon"></i>
                    </IconButton>
                    <IconButton aria-label="share">
                        <i className="ti ti-user-edit menu-item-icon"></i>
                    </IconButton>
                </CardActions>
            </Card>
        </Box>
    );
}

export default NavigationList