'use client'

import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import HeaderAppAdmin from '@/component/header/header.admin';
import NavigatorApp from '@/component/Navigator/navigator';
import StudentManagement from '@/component/Admin/student.management/student.management';
import ContactAdmin from '@/component/Admin/contact.admin';
import ClassManagement from '@/component/Admin/class.management';
import ExamManagement from '@/component/Admin/exam.management';
import Logout from '@/component/Admin/logout.admin';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';


function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="#">
                nothing to say
            </Link>{' '}
            {new Date().getFullYear()}.
        </Typography>
    );
}

let theme = createTheme({
    palette: {
        primary: {
            light: '#63ccff',
            main: '#009be5',
            dark: '#006db3',
        },
    },
    typography: {
        h5: {
            fontWeight: 500,
            fontSize: 26,
            letterSpacing: 0.5,
        },
    },
    shape: {
        borderRadius: 8,
    },
    components: {
        MuiTab: {
            defaultProps: {
                disableRipple: true,
            },
        },
    },
    mixins: {
        toolbar: {
            minHeight: 48,
        },
    },
});

theme = {
    ...theme,
    components: {
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    backgroundColor: '#081627',
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                },
                contained: {
                    boxShadow: 'none',
                    '&:active': {
                        boxShadow: 'none',
                    },
                },
            },
        },
        MuiTabs: {
            styleOverrides: {
                root: {
                    marginLeft: theme.spacing(1),
                },
                indicator: {
                    height: 3,
                    borderTopLeftRadius: 3,
                    borderTopRightRadius: 3,
                    backgroundColor: theme.palette.common.white,
                },
            },
        },
        MuiTab: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    margin: '0 16px',
                    minWidth: 0,
                    padding: 0,
                    [theme.breakpoints.up('md')]: {
                        padding: 0,
                        minWidth: 0,
                    },
                },
            },
        },
        MuiIconButton: {
            styleOverrides: {
                root: {
                    padding: theme.spacing(1),
                },
            },
        },
        MuiTooltip: {
            styleOverrides: {
                tooltip: {
                    borderRadius: 4,
                },
            },
        },
        MuiDivider: {
            styleOverrides: {
                root: {
                    backgroundColor: 'rgb(255,255,255,0.15)',
                },
            },
        },
        MuiListItemButton: {
            styleOverrides: {
                root: {
                    '&.Mui-selected': {
                        color: '#4fc3f7',
                    },
                },
            },
        },
        MuiListItemText: {
            styleOverrides: {
                primary: {
                    fontSize: 14,
                    fontWeight: theme.typography.fontWeightMedium,
                },
            },
        },
        MuiListItemIcon: {
            styleOverrides: {
                root: {
                    color: 'inherit',
                    minWidth: 'auto',
                    marginRight: theme.spacing(2),
                    '& svg': {
                        fontSize: 20,
                    },
                },
            },
        },
        MuiAvatar: {
            styleOverrides: {
                root: {
                    width: 32,
                    height: 32,
                },
            },
        },
    },
};

const drawerWidth = 256;

export default function Paperbase() {
    const router = useRouter();
    // state lưu trữ data user
    const [userData, setUserData] = React.useState();

    useEffect(() => {
        const userDataString = sessionStorage.getItem('userData');
        if (!userDataString) {
            router.push('/');
        }
        else {
            const dataServer = JSON.parse(userDataString);
            console.log(dataServer.user.authen);

            if (dataServer.user.authen == 'Admin') {
                setUserData(dataServer)
            } else {
                sessionStorage.clear();
                router.push('/');
            }
        }
    }, []);

    // state lưu trữ data user

    console.log(userData);

    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [activeComponent, setActiveComponent] = React.useState('Quản lý học viên');
    const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const renderContent = () => {
        switch (activeComponent) {
            case 'Quản lý học viên':
                return <StudentManagement />;
            case 'Quản lý lớp học':
                return <ClassManagement />;
            case 'Quản lý đề thi':
                return <ExamManagement />;
            case 'Liên hệ với người quản trị':
                return <ContactAdmin />;
            case 'Đăng xuất':
                return <Logout />;
            default:
                return <Typography>Chọn một chức năng từ menu.</Typography>;
        }
    };

    return (
        <>
            {userData ?

                <ThemeProvider theme={theme}>
                    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
                        <CssBaseline />
                        <Box
                            component="nav"
                            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                        >
                            {isSmUp ? null : (
                                <NavigatorApp
                                    PaperProps={{ style: { width: drawerWidth } }}
                                    variant="temporary"
                                    open={mobileOpen}
                                    onClose={handleDrawerToggle}
                                    setActiveComponent={setActiveComponent}
                                />
                            )}
                            <NavigatorApp
                                PaperProps={{ style: { width: drawerWidth } }}
                                sx={{ display: { sm: 'block', xs: 'none' } }}
                                setActiveComponent={setActiveComponent}
                            />
                        </Box>
                        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                            <HeaderAppAdmin onDrawerToggle={handleDrawerToggle} />
                            <Box component="main" sx={{ flex: 1, py: 6, px: 4, bgcolor: '#eaeff1' }}>
                                {renderContent()}
                            </Box>
                            <Box component="footer" sx={{ p: 2, bgcolor: '#eaeff1' }}>
                                <Copyright />
                            </Box>
                        </Box>
                    </Box>
                </ThemeProvider>
                :
                <> </>
            }


        </>

    );
}
