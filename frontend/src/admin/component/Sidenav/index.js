import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';

import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import HomeIcon from '@mui/icons-material/Home';
import ConnectingAirportsIcon from '@mui/icons-material/ConnectingAirports';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import PersonIcon from '@mui/icons-material/Person';
import Flight3D from '../../../asset/images/flight3d.png';

import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../../index';
// import { useState } from 'react';

import classNames from 'classnames/bind';
import styles from './Sidenav.module.scss';
// import CheckRevenue from '../../pages/Revenue/CheckRevenue';
import CheckRole from '../CheckRole';
// import CustomList from './CustomList';
const cx = classNames.bind(styles);

const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme),
    }),
}));

export default function Sidenav() {
    const theme = useTheme();
    const open = useAppStore((state) => state.dopen);

    const navigate = useNavigate();
    // const [isClicked,setIsClicked] = React.useState(true);

    // const handleClick = () => {
    //     setIsClicked(true);
    //     navigate(path);
    //   };

    const valueRole = CheckRole();
    console.log('In ra checkRole', valueRole);

    return (
        <Box sx={{ display: 'flex' }}>
            <Box height={64} />
            <CssBaseline />

            <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                    <IconButton>{theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}</IconButton>
                </DrawerHeader>

                {valueRole.Code !== 'AD' && (
                    <>
                        <Divider />
                        <List>
                            <ListItem
                                disablePadding
                                sx={{ display: 'block' }}
                                onClick={() => navigate('/admin')}
                                // className={isClicked ?  'clicked' : ''}
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
                                        <HomeIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Trang chủ" sx={{ opacity: open ? 1 : 0 }} />
                                </ListItemButton>
                            </ListItem>
                        </List>
                        <Divider />
                        <List>
                            <ListItem
                                disablePadding
                                sx={{ display: 'block' }}
                                onClick={() => navigate('/admin/flight')}
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
                                        <ConnectingAirportsIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Chuyến bay" sx={{ opacity: open ? 1 : 0 }} />
                                </ListItemButton>
                            </ListItem>
                        </List>
                        <List>
                            <ListItem disablePadding sx={{ display: 'block' }} onClick={() => navigate('/admin/users')}>
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
                                        <PersonIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Quản lý khách hàng" sx={{ opacity: open ? 1 : 0 }} />
                                </ListItemButton>
                            </ListItem>
                        </List>
                    </>
                )}

                {valueRole.Code === 'AD' && (
                    <List>
                        <ListItem
                            disablePadding
                            sx={{ display: 'block' }}
                            onClick={() => navigate('/admin/adminUsers')}
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
                                    <ManageAccountsIcon />
                                </ListItemIcon>
                                <ListItemText primary="Quản lý người dùng" sx={{ opacity: open ? 1 : 0 }} />
                            </ListItemButton>
                        </ListItem>
                    </List>
                )}
                <List>
                    <ListItem disablePadding sx={{ display: 'block' }} onClick={() => navigate('/admin/revenue')}>
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
                                <MonetizationOnIcon />
                            </ListItemIcon>
                            <ListItemText primary="Doanh thu" sx={{ opacity: open ? 1 : 0 }} />
                        </ListItemButton>
                    </ListItem>
                </List>
                <img src={Flight3D} alt="Máy bay" className={cx('image')} />
            </Drawer>
        </Box>
    );
}
