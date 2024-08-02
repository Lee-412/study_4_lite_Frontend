'use client'

import * as React from 'react';
import { PaletteMode } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import { Avatar, Box, Button, Grid, IconButton, Tooltip, Typography } from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { usePathname, useRouter } from 'next/navigation';
import LogoutIcon from '@mui/icons-material/Logout';
import { log } from 'console';
const logoStyle = {
    width: '140px',
    height: 'auto',
    cursor: 'pointer',
};

interface AppAppBarProps {
    mode: PaletteMode;
    toggleColorMode: () => void;
}

function AppAppBar(props: any) {
    const [open, setOpen] = useState(false);
    const route = useRouter();
    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };
    const [userData, setUserData] = useState({
        token: '',
        userID: 0,
        username: '',
        email: '',
        authen: ''
    })

    console.log(userData);

    useEffect(() => {

        const userDataString = sessionStorage.getItem('userData');
        console.log(userDataString);

        if (!userDataString) {
            // route.push('/');
            console.log("no data");
            route.push('/')
        }
        else {
            const dataServer = JSON.parse(userDataString);
            console.log(dataServer);

            setUserData({
                token: dataServer.token,
                userID: dataServer.user.id,
                email: dataServer.user.email,
                username: dataServer.user.username,
                authen: 'user'
            })

        }
    }, []);
    console.log(userData);

    const handleLogout = () => {
        if (window.confirm('Bạn có muốn đăng xuất không?')) {
            sessionStorage.clear();
            route.push('/');
            setUserData({
                token: '',
                userID: 0,
                username: '',
                email: '',
                authen: ''
            })
        };

    }

    const pathname = usePathname()
    console.log(pathname);

    return (

        <AppBar
            position="static"
            sx={{
                boxShadow: 0,
                bgcolor: 'transparent',
                backgroundImage: 'none',
                mt: 2,
            }}
        >
            <Container maxWidth="lg">
                <Toolbar
                    variant="regular"
                    sx={(theme) => ({
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexShrink: 0,
                        borderRadius: '999px',
                        bgcolor:
                            theme.palette.mode === 'light'
                                ? 'rgba(255, 255, 255, 0.4)'
                                : 'rgba(0, 0, 0, 0.4)',
                        backdropFilter: 'blur(24px)',
                        maxHeight: 40,
                        border: '1px solid',
                        borderColor: 'divider',
                        boxShadow:
                            theme.palette.mode === 'light'
                                ? `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
                                : '0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)',
                    })}
                >
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: 'flex',
                            alignItems: 'center',
                            ml: '-18px',
                            px: 0,
                        }}
                    >
                        {/* <img
                            src={
                            }
                            style={logoStyle}
                            alt="logo of company"
                        /> */}
                        <Typography sx={{
                            color: "black"
                        }}>STUDY</Typography>
                        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                            <MenuItem

                                sx={{ py: '6px', px: '12px' }}
                            >
                                <Typography variant="body2" color="text.primary">
                                    Features
                                </Typography>
                            </MenuItem>
                            <MenuItem
                                sx={{ py: '6px', px: '12px' }}
                            >
                                <Typography variant="body2" color="text.primary">
                                    Testimonials
                                </Typography>
                            </MenuItem>
                            <MenuItem
                                sx={{ py: '6px', px: '12px' }}
                            >
                                <Typography variant="body2" color="text.primary">
                                    Highlights
                                </Typography>
                            </MenuItem>

                            <MenuItem
                                sx={{ py: '6px', px: '12px' }}
                            >
                                <Typography variant="body2" color="text.primary">
                                    FAQ
                                </Typography>
                            </MenuItem>
                        </Box>
                    </Box>
                    <Box>


                        <>
                            {console.log("có userData")
                            }
                            <Grid container spacing={1} alignItems="center">
                                <Grid sx={{ display: { sm: 'none', xs: 'block' } }} item>
                                    <IconButton
                                        color="secondary"
                                        aria-label="open drawer"
                                        edge="start"
                                    >
                                        <MenuIcon />
                                    </IconButton>
                                </Grid>
                                <Grid item xs />
                                <Grid item>

                                </Grid>
                                <Grid item>
                                    <Tooltip title="Alerts • No alerts">
                                        <IconButton color="secondary">
                                            <NotificationsIcon />
                                        </IconButton>
                                    </Tooltip>
                                </Grid>
                                <Grid item>
                                    <IconButton color="secondary" sx={{ p: 0.5 }} onClick={handleLogout}>
                                        <LogoutIcon />
                                    </IconButton>
                                </Grid>

                                <Grid item>
                                    <IconButton color="secondary" sx={{ p: 0.5 }}>
                                        <Avatar src="" alt="" />
                                    </IconButton>
                                </Grid>

                            </Grid>

                        </>


                    </Box>
                    <Box sx={{ display: { sm: '', md: 'none' } }}>
                        <Button
                            variant="text"
                            color="primary"
                            aria-label="menu"
                            onClick={toggleDrawer(true)}
                            sx={{ minWidth: '30px', p: '4px' }}
                        >
                            <MenuIcon />
                        </Button>

                    </Box>
                </Toolbar>
            </Container>
        </AppBar>

    );
}

export default AppAppBar;