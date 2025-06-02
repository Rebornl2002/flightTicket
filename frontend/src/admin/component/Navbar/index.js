import * as React from 'react';
import { styled } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import MoreIcon from '@mui/icons-material/MoreVert';
import { Helmet } from 'react-helmet';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAppStore } from '../../index';
// import { useState,useEffect } from 'react';
import Divider from '@mui/material/Divider';

import AvatarPeople from '../AvatarPeople';
// import NotificationsIcon from '@mui/icons-material/Notifications';
// import classNames from 'classnames/bind';
// import styles from './Navbar.module.scss';
// import ShowNotifyCancel from '../ShowNotifyCancel';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { useNavigate } from 'react-router-dom';

// const cx = classNames.bind(styles);

const AppBar = styled(
    MuiAppBar,
    {},
)(({ theme }) => ({
    zIndex: theme.zIndex.drawer + 1,
}));

export default function Navbar() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const updateOpen = useAppStore((state) => state.updateOpen);
    const dopen = useAppStore((state) => state.dopen);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };
    const navigate = useNavigate();

    const handleLogout = () => {
        // navigate('/');
        window.location.href = '/';
        localStorage.removeItem('Login');
    };

    const handleProfile = () => {
        navigate('/admin/myaccount');
    };

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
            sx={{ top: '38px' }}
            PaperProps={{
                sx: {
                    overflow: 'hidden', // Corrected property name
                },
            }}
        >
            {/* <MenuItem onClick={handleMenuClose}> */}

            <MenuItem onClick={handleProfile} sx={{ height: '30px' }}>
                Tài khoản
                <IconButton
                    size="large"
                    edge="end"
                    aria-label="account of current user"
                    aria-controls={menuId}
                    aria-haspopup="true"
                    // onClick={handleLogout}
                    color="inherit"
                >
                    <AccountBoxIcon />
                </IconButton>
            </MenuItem>

            <Divider />
            <MenuItem onClick={handleLogout} sx={{ height: '30px' }}>
                Đăng xuất
                <IconButton
                    size="large"
                    edge="end"
                    aria-label="account of current user"
                    aria-controls={menuId}
                    aria-haspopup="true"
                    // onClick={handleLogout}
                    color="inherit"
                >
                    <LogoutIcon />
                </IconButton>
            </MenuItem>
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        ></Menu>
    );

    const getName = JSON.parse(localStorage.getItem('Login')).Name;

    // const [quantityNotify, setQuantityNotify] = useState(0);
    // const [data, setData] = useState();

    // const fetchAPI = async () => {
    //     try {
    //         let response = await fetch(`http://localhost:4000/cancel`);

    //         if (!response.ok) {
    //             throw new Error('Failed to fetch data');
    //         }

    //         let data1 = await response.json();
    //         setQuantityNotify(data1.data.length);
    //         setData(data1.data);
    //         return data1.data;
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };

    // useEffect(() => {
    //     fetchAPI();
    // }, [quantityNotify]);

    // const [clickNotify, setClickNotify] = useState(false);

    // const handleClickNotify = () => {
    //     setClickNotify(!clickNotify);
    // };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Helmet>
                <title>Admin</title>
            </Helmet>
            <AppBar position="fixed">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{ mr: 2 }}
                        onClick={() => updateOpen(!dopen)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div" sx={{ display: { xs: 'none', sm: 'block' } }}>
                        Flynow
                    </Typography>

                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        {/* <div
                            style={{ display: 'flex', alignItems: 'center', marginRight: '100px' }}
                            onClick={handleClickNotify}
                        >
                            <NotificationsIcon />
                            {quantityNotify !== 0 && <span className={cx('quantity')}>{quantityNotify}</span>}

                            {clickNotify && (
                                <div className={cx('notify')} onClick={(e) => e.stopPropagation()}>
                                    {data.slice(0, quantityNotify).map((item, index) => (
                                        <ShowNotifyCancel key={index} data={item} />
                                    ))}
                                </div>
                            )}
                        </div> */}

                        <span className="d-flex align-items-center ">{getName}</span>
                        <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            <AvatarPeople string={getName} />
                        </IconButton>
                    </Box>
                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
        </Box>
    );
}
