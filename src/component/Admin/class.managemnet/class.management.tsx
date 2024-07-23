

import * as React from 'react';
import { useState, useEffect } from 'react';
import {
    AppBar, Toolbar, Grid, TextField, Button, Tooltip, IconButton, Paper, Box, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Collapse
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import TestRow from './class.data';


const ClassManagement = () => {
    const [testData, setTestData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openLearnMore, setOpenLearnMore] = useState(false);
    const [dataLearnMore, setDataLearnMore] = useState({});
    // const [formTestData, setFormTestData] = useState({
    //     name: '',
    //     type: 'Reading', 
    //     description: '',
    // });

    const fetchData = async () => {
        setLoading(true);
        const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_LINK_API_URL}/tests?populate=*`, { cache: 'no-store' });
        const data = await response.json();
        console.log(data);

        setTestData(data.data);
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);



    const handleDeleteTest = async (id: any) => {
        await fetch(`${process.env.NEXT_PUBLIC_STRAPI_LINK_API_URL}/tests/${id}`, {
            method: 'DELETE',
        });
        fetchData();
    };

    const handleRefresh = () => {
        fetchData();
    };
    console.log(testData);
    console.log(loading);


    const handleLearnMore = (test: any) => {
        setDataLearnMore(test);
        setOpenLearnMore(true);
        alert("learn more")
        console.log(test);


    }
    return (
        <Paper sx={{ maxWidth: 936, margin: 'auto', overflow: 'hidden' }}>
            <AppBar
                position="static"
                color="default"
                elevation={0}
                sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}
            >
                <Toolbar>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item>
                            <SearchIcon color="inherit" sx={{ display: 'block' }} />
                        </Grid>
                        <Grid item xs>
                            <TextField
                                fullWidth
                                placeholder="Search tests by name or type"
                                InputProps={{
                                    disableUnderline: true,
                                    sx: { fontSize: 'default' },
                                }}
                                variant="standard"
                            />
                        </Grid>
                        <Grid item>
                            {/* <Button variant="contained" sx={{ mr: 1 }} onClick={handleAddTest}>
                                Add Test
                            </Button> */}
                            <Tooltip title="Refresh">
                                <IconButton onClick={handleRefresh}>
                                    <RefreshIcon color="inherit" sx={{ display: 'block' }} />
                                </IconButton>
                            </Tooltip>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <Box>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Test Name</TableCell>
                                <TableCell>Type</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {testData ?
                                (
                                    testData.map((test: any, index: any) => (
                                        <>

                                            <TestRow
                                                key={index}
                                                test={test}
                                                handleLearnMore={handleLearnMore}
                                                handleDeleteTest={handleDeleteTest}
                                            />
                                        </>

                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={4} align="center">
                                            {loading ? 'Loading...' : 'No tests available'}
                                        </TableCell>
                                    </TableRow>
                                )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>


        </Paper>
    );
};

export default ClassManagement;
