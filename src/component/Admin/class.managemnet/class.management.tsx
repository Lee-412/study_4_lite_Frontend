

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

    const [dataShowMore, setDataShowMore] = useState([]);
    const [dataWritingShowMore, setDataWritingShowMore] = useState([]);

    const fetchData = async () => {
        setLoading(true);
        const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_LINK_API_URL}/tests?populate=*`, { cache: 'no-store' });
        const data = await response.json();
        // console.log(data);

        setTestData(data.data);
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);



    const handleDeleteTest = async (id: any) => {


        if (window.confirm('Bạn có muốn xoá bài test này khỏi hệ thống không?')) {
            await fetch(`${process.env.NEXT_PUBLIC_STRAPI_LINK_API_URL}/tests/${id}`, {
                method: 'DELETE',
            });
            fetchData();
        };

    };

    const handleRefresh = () => {
        fetchData();
    };


    const handleShowMore = async (test: any) => {
        //  console.log(test.attributes.type);

        if (test.attributes.type === 'Wrting') {
            //   console.log(test);

            const writingId = test.attributes.wrting.data.id;
            const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_LINK_API_URL}/wrtings/${writingId}?populate=*`);
            const data_writing = await response.json();

            const updatedData: any = await Promise.all(data_writing.data.attributes.answer_wrtings.data.map(async (answer_wrting: any) => {
                const userId = answer_wrting.id;
                const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_LINK_API_URL}/answer-wrtings/${userId}?populate=*`);
                const userData = await res.json();

                return {
                    name: userData.data.attributes.users_permissions_user.data ?userData.data.attributes.users_permissions_user.data.attributes.fullname : undefined,
                    answer_task1: userData.data.attributes.task1Answer,
                    answer_task2: userData.data.attributes.task2Answer
                };
            }));

            setDataWritingShowMore(updatedData);

            const data_show_writing = {
                title: test.attributes.name,
                data: updatedData,
                type: 'writing'
            };

            // console.log(data_show_writing);

            const url = `/dashboard/show-more?data=${encodeURIComponent(JSON.stringify(data_show_writing))}`;
            window.open(url, "_blank", "width=800,height=600");


        } else {
            //   console.log(test);

            const data_student_tests = test.attributes.student_tests.data;
            const updatedData: any = await Promise.all(data_student_tests.map(async (student_test: any) => {
                const userId = student_test.id;
                const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_LINK_API_URL}/student-tests/${userId}?populate=*`);
                const userData = await res.json();

                return {
                    name: userData.data.attributes.user?.data.attributes.fullname,
                    score: userData.data.attributes.score,
                    answer_data: userData.data.attributes.answer_data
                };
            }));

            setDataShowMore(updatedData);

            const data_show = {
                title: test.attributes.name,
                data: updatedData,
                type: 'not_writing'
            };

            // console.log(data_show);

            const url = `/dashboard/show-more?data=${encodeURIComponent(JSON.stringify(data_show))}`;
            window.open(url, "_blank", "width=600,height=400");
        }
    };

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
                                                handleLearnMore={handleShowMore}
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
