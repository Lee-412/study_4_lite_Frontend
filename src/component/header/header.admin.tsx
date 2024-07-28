import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
const lightColor = 'rgba(255, 255, 255, 0.7)';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useRouter } from 'next/navigation';

interface HeaderProps {
    onDrawerToggle: () => void;
}

export default function HeaderAppAdmin(props: HeaderProps) {

    const userDataString = sessionStorage.getItem('userData');
    console.log(userDataString);


    const { onDrawerToggle } = props;
    const route = useRouter();

    const handleLogout = () => {
        if (window.confirm('Bạn có muốn đăng xuất không?')) {
            sessionStorage.clear();
            route.push('/')
        };

        // alert("đăng xuất")
    }
    return (
        <React.Fragment>
            <AppBar color="primary" position="sticky" elevation={0}>
                <Toolbar>
                    <Grid container spacing={1} alignItems="center">
                        <Grid sx={{ display: { sm: 'none', xs: 'block' } }} item>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                onClick={onDrawerToggle}
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
                                <IconButton color="inherit">
                                    <NotificationsIcon />
                                </IconButton>
                            </Tooltip>
                        </Grid>
                        <Grid item>
                            <IconButton color="inherit" sx={{ p: 0.5 }} onClick={handleLogout}>
                                <ExitToAppIcon />
                            </IconButton>
                        </Grid>

                        <Grid item>
                            <IconButton color="inherit" sx={{ p: 0.5 }}>
                                <Avatar src="" alt="" />
                            </IconButton>
                        </Grid>

                    </Grid>
                </Toolbar>
            </AppBar>


        </React.Fragment>
    );
}