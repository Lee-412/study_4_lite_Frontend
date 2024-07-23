import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useEffect } from 'react';

const ClassManagement = () => {

    const fetchData = async () => {

        const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_LINK_API_URL}/tests?populate=*`, { cache: 'no-store' });
        const data = await response.json();
        console.log(data);

    };
    useEffect(() => {
        fetchData();
    }, []);
    return (
        <>
            Quản lý lớp học
        </>
    );
}
export default ClassManagement
