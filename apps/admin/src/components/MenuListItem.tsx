import { useNavigate } from '@tanstack/react-router';
import { MenuItem } from '@efficacy/interfaces';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

export interface MenuListItem {
    data: MenuItem
}

function MenuListItem({ data }: MenuListItem) {
    const navigate = useNavigate();

    return (
        <ListItemButton onClick={() => navigate({ to: data.navigationURL })}>
            <ListItemIcon>
                <i className={data.icon + " menu-item-icon"}></i>
            </ListItemIcon>
            <ListItemText primary={data.name} />
        </ListItemButton>
    );
}

export default MenuListItem