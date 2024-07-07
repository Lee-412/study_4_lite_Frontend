import * as React from 'react';
import Divider from '@mui/material/Divider';
import Drawer, { DrawerProps } from '@mui/material/Drawer';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PeopleIcon from '@mui/icons-material/People';
import SchoolIcon from '@mui/icons-material/School';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ContactMailIcon from '@mui/icons-material/ContactMail';

const categories = [
    {
        id: 'Quản lý',
        children: [
            {
                id: 'Quản lý học viên',
                icon: <PeopleIcon />,
                active: true,
            },
            {
                id: 'Quản lý lớp học',
                icon: <SchoolIcon />,
                active: true,
            },
            {
                id: 'Quản lý đề thi',
                icon: <AssignmentIcon />,
                active: true,
            },
        ],
    },
    {
        id: 'Hệ thống',
        children: [
            { id: 'Đăng xuất', icon: <ExitToAppIcon /> },
            { id: 'Liên hệ với người quản trị', icon: <ContactMailIcon /> },
        ],
    },
];

const item = {
    py: '2px',
    px: 3,
    color: 'rgba(255, 255, 255, 0.7)',
    '&:hover, &:focus': {
        bgcolor: 'rgba(255, 255, 255, 0.08)',
    },
};

const itemCategory = {
    boxShadow: '0 -1px 0 rgb(255,255,255,0.1) inset',
    py: 1.5,
    px: 3,
};

const NavigatorApp = (props: DrawerProps & { setActiveComponent: (component: string) => void }) => {
    const { setActiveComponent, ...other } = props;

    return (
        <Drawer variant="permanent" {...other}>
            <List disablePadding>
                <ListItem sx={{ ...item, ...itemCategory, fontSize: 22, color: '#fff' }}>
                    Paperbase
                </ListItem>
                {categories.map(({ id, children }) => (
                    <Box key={id} sx={{ bgcolor: '#101F33' }}>
                        <ListItem sx={{ py: 2, px: 3 }}>
                            <ListItemText sx={{ color: '#fff' }}>{id}</ListItemText>
                        </ListItem>
                        {children.map(({ id: childId, icon }) => (
                            <ListItem disablePadding key={childId}>
                                <ListItemButton
                                    sx={item}
                                    onClick={() => setActiveComponent(childId)}
                                >
                                    <ListItemIcon>{icon}</ListItemIcon>
                                    <ListItemText>{childId}</ListItemText>
                                </ListItemButton>
                            </ListItem>
                        ))}
                        <Divider sx={{ mt: 2 }} />
                    </Box>
                ))}
            </List>
        </Drawer>
    );
};

export default NavigatorApp;
