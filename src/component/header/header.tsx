'use client'

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MoreIcon from '@mui/icons-material/MoreVert';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Link from 'next/link'
import { redirect, usePathname, useRouter } from 'next/navigation';
import { useSession, signIn, signOut } from "next-auth/react"
import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import UserManual from '../modal/user.manual.modal';
import LogoutIcon from '@mui/icons-material/Logout';
import Tooltip from '@mui/material/Tooltip';

import NotificationsIcon from '@mui/icons-material/Notifications';

export default function AppHeader() {

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

    const [language, setLanguage] = useState("Vietnamese");

    const router = useRouter();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
        useState<null | HTMLElement>(null);

    const [openManual, setOpenManual] = useState(false);


    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        "no thing to say"
    };

    return (

        <Box sx={{
            flexGrow: 1,
        }}>
            <AppBar position="static"
                sx={{
                    backgroundColor: 'white',
                    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
                    borderRadius: '3vw',
                    marginBottom: "3vh"

                }}
            >
                <Container sx={{
                    color: "black"
                }}>
                    <Toolbar>

                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{
                                display: { xs: 'none', sm: 'block' },
                                cursor: 'pointer'
                            }}
                        // onClick={() => handleRedirectHome()}
                        >
                            Study
                        </Typography>

                        <Box sx={{ flexGrow: 1 }} />
                        <Box sx={{
                            display: { xs: 'none', md: 'flex' },
                            gap: "15px",
                            alignItems: "center",
                            cursor: "pointer",
                            "> a": {
                                color: 'unset',
                                textDecoration: 'unset'
                            }
                        }}>
                            {
                                userData.userID === 0 ?
                                    <>

                                        <Button>
                                            {language}
                                        </Button>
                                        <Button onClick={() => {
                                            setOpenManual(true);
                                        }}>
                                            Hướng dẫn sử dụng
                                        </Button>

                                    </>
                                    :
                                    <>
                                        <Link href={"/course"}>
                                            Listening
                                        </Link>
                                        <Link href={"/course"}>
                                            Writing
                                        </Link>
                                        <Link href={"/course"}>
                                            Reading
                                        </Link>
                                        <Tooltip title="Alerts • No alerts">
                                            <IconButton color="inherit">
                                                <NotificationsIcon />
                                            </IconButton>
                                        </Tooltip>

                                        {/* <IconButton color="secondary" sx={{ p: 0.5 }} onClick={handleLogout}>
                                            <LogoutIcon />
                                        </IconButton> */}
                                        <Avatar
                                            onClick={handleLogout}
                                        >{userData.username.charAt(0)}</Avatar>
                                    </>

                            }

                        </Box>
                        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="show more"
                                aria-haspopup="true"
                                color="inherit"
                            >
                                <MoreIcon />
                            </IconButton>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            <UserManual openManual={openManual}
                setOpenManual={setOpenManual} />
        </Box >
    );

}