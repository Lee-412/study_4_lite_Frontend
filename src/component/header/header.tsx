'use client'

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MoreIcon from '@mui/icons-material/MoreVert';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Link from 'next/link'
import { redirect, useRouter } from 'next/navigation';
import { useSession, signIn, signOut } from "next-auth/react"
import { useState } from 'react';
import { Button } from '@mui/material';


export default function AppHeader() {

    const { data: session } = useSession();
    const [language, setLanguage] = useState("Vietnamese")

    const router = useRouter();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
        useState<null | HTMLElement>(null);

    const [checkSignout, setCheckSignout] = useState(false)
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const menuId = 'primary-search-account-menu';

    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            id={menuId}
            keepMounted
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem>
                <Link
                    href={`/`}
                    style={{
                        color: 'unset',
                        textDecoration: 'unset',
                    }}
                >
                    Thông tin tài khoản
                </Link>
            </MenuItem>
            <MenuItem>
                <Link
                    href={`/`}
                    style={{
                        color: 'unset',
                        textDecoration: 'unset',
                    }}
                >
                    Đổi mật khẩu
                </Link>
            </MenuItem>
            <MenuItem onClick={
                () => {
                    handleMenuClose();
                    setCheckSignout(true);
                    signOut();
                }

            }>Sign Out</MenuItem>

        </Menu >
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';

    const renderMobileMenu = (
        <>

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

            >
                <MenuItem>
                    <Link href={"/playlist"}>
                        Lớp học
                    </Link>
                </MenuItem>
                <MenuItem>
                    <Link href={"/examination"}>
                        Bài thi
                    </Link>

                </MenuItem>

                <MenuItem>
                    <Avatar
                        onClick={handleProfileMenuOpen}
                    >LD</Avatar>
                </MenuItem>
            </Menu>


        </>
    );


    const handleRedirectHome = () => {
        router.push('/');
    }

    return (

        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static"
                sx={{
                    backgroundColor: "#FFFFFF",
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
                            onClick={() => handleRedirectHome()}
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
                                session ?
                                    <>
                                        <Link href={"/playlist"}>
                                            Lớp học
                                        </Link>
                                        <Link href={"/examination"}>
                                            Bài thi
                                        </Link>

                                        <Avatar
                                            onClick={handleProfileMenuOpen}
                                        >{session.user?.name?.charAt(0)}</Avatar>
                                    </>
                                    :

                                    <>

                                        <Button>
                                            {language}
                                        </Button>
                                        <Button>
                                            Hướng dẫn sử dụng
                                        </Button>

                                    </>
                            }

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
                </Container>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
        </Box >
    );

}