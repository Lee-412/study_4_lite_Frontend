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


export default function HeaderAppUser() {

    const { data: session } = useSession();


    return (

        <Box sx={{ flexGrow: 1 }}>
            <Avatar>

            </Avatar>

            <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{
                    display: { xs: 'none', sm: 'block' },
                    cursor: 'pointer'
                }}

            >
                Study
            </Typography>



        </Box >
    );

}