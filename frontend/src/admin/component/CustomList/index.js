import * as React from 'react';

import List from '@mui/material/List';

import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import './CustomList.module.scss';

// import HomeIcon from '@mui/icons-material/Home';
// import ConnectingAirportsIcon from '@mui/icons-material/ConnectingAirports';
// import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
// import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
// import PersonIcon from '@mui/icons-material/Person';
// import Flight3D from '../../asset/images/flight3d.png';
// import { styled, useTheme } from '@mui/material/styles';

import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../../index';

function CustomList({ path, icon, primary }) {
    // const theme = useTheme();
    const open = useAppStore((state) => state.dopen);

    const navigate = useNavigate();
    const [setIsClicked] = React.useState(false);

    const handleClick = () => {
        setIsClicked(true);
        navigate(path);
        console.log(primary);
    };

    return (
        <List>
            <ListItem
                disablePadding
                sx={{ display: 'block' }}
                onClick={handleClick}
                // className={isClicked ? 'clicked' : ''}
                className="clicked"
            >
                <ListItemButton
                    sx={{
                        minHeight: 48,
                        justifyContent: open ? 'initial' : 'center',
                        px: 2.5,
                    }}
                >
                    <ListItemIcon
                        sx={{
                            minWidth: 0,
                            mr: open ? 3 : 'auto',
                            justifyContent: 'center',
                        }}
                    >
                        {/* <HomeIcon /> */}
                        {icon}
                    </ListItemIcon>
                    <ListItemText primary={primary} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
            </ListItem>
        </List>
    );
}

export default CustomList;
