import { MenuItem } from '@efficacy/interfaces';
import Collapse from '@mui/material/Collapse';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';
import { useState } from 'react';
import MenuListItem from './MenuListItem';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

export interface CollapseableMenuListItem {
    data: MenuItem
}

function CollapseableMenuListItem({ data }: CollapseableMenuListItem) {
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <>
            <ListItemButton onClick={handleClick}>
                <ListItemIcon>
                    <i className={data.icon + " menu-item-icon"}></i>
                </ListItemIcon>
                <ListItemText primary={data.name} />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                {
                    data.children &&
                    <List>
                        {
                            data.children.map((item, index) => (
                                <MenuListItem data={item} key={index} />
                            ))
                        }
                    </List>
                }
            </Collapse>
        </>
    );
}

export default CollapseableMenuListItem