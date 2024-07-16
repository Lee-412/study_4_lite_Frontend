'use client'

import * as React from 'react';
import { useState, useEffect } from 'react';
import {
    Grid,
    Typography,
    TextField,
    InputAdornment,
    IconButton
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import TestCard from '@/component/TestCard/TestCard';
import { Test } from '@/utils/type';
import { useRouter } from 'next/navigation';


function TestContainer({ tests, userid}: any) {

    const router = useRouter();

    // state lưu trữ data user

    const [userData, setUserData] = React.useState();

    useEffect(() => {
        const userDataString = sessionStorage.getItem('userData');

        if (!userDataString) {
            sessionStorage.clear();
            router.push('/');
        }
        else {
            console.log(userDataString);

            setUserData(JSON.parse(userDataString))
        }
    }, []);
    // state lưu trữ data user

    console.log(userData);


    const [searchTerm, setSearchTerm] = useState('');
    const [filteredTests, setFilteredTests] = useState(tests);

    //console.log(tests);


    useEffect(() => {
        const filterCourses = tests.filter(
            (test: Test) =>
                test.attributes.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredTests(filterCourses);
    }, [searchTerm]);

    const handleSearchChange = (event: any) => {
        setSearchTerm(event.target.value);
    };

    return (
        <div>
            <Typography variant="h4" align="center" gutterBottom>
                Welcome to IELTS online mock test!
            </Typography>
            <Typography variant="h4" align="center" gutterBottom>
            </Typography>
            <Grid container justifyContent="center" alignItems="center" sx={{ marginBottom: '20px' }}>
                <Grid item>
                    <TextField
                        label="Search test"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton>
                                        <SearchIcon />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>
            </Grid>


            <Grid container spacing={2}>
                {filteredTests.map((test: Test) => (
                    <TestCard key={test.id} test={test} userid={userid}/>
                ))}
            </Grid>
        </div>
    );
}

export default TestContainer