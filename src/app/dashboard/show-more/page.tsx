'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
    Container,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TextField,
    Typography,
    Box,
    Button,
    IconButton,
    Tooltip
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import './test.css'

const ShowMore = () => {
    const searchParams = useSearchParams();
    const data = searchParams.get('data');
    const [testData, setTestData] = useState<any>(null);
    const [searchTerm, setSearchTerm] = useState<string>('');


    useEffect(() => {
        if (data) {
            try {
                const decodedData = decodeURIComponent(data);
                const parsedData = JSON.parse(decodedData);
                setTestData(parsedData);
                console.log(parsedData);

            } catch (e) {
                console.error('Invalid JSON data', e);
            }
        }
    }, [data, setTestData]);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value.toLowerCase());
    };

    const filteredData = testData?.data.filter((item: any) => item.name.toLowerCase().includes(searchTerm));
    console.log(testData);



    const handleDownloadFile = (item: any) => {
        const title = testData.title;

        const content = `
Title: ${title}

Name: ${item.name}

Task 1 Answer: ${item.answer_task1}

Task 2 Answer: ${item.answer_task2}
`;

        const blob = new Blob([content], { type: 'text/plain' });

        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `${item.name}.txt`;

        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);
    };

    return (
        <Container>


            <Box my={4}>
                <Typography variant="h4" component="h1" gutterBottom>
                    {testData ? testData.title : 'Ielts test'}

                </Typography>
                <TextField
                    fullWidth
                    label="Search"
                    variant="outlined"
                    value={searchTerm}
                    onChange={handleSearch}
                    margin="normal"
                />
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                {testData?.type === 'writing' ? (
                                    <>
                                        <TableCell>Task 1 Answer</TableCell>
                                        <TableCell>Task 2 Answer</TableCell>
                                    </>
                                ) : (
                                    <>
                                        <TableCell>Score</TableCell>
                                        <TableCell>Answers</TableCell>
                                    </>
                                )}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {testData ? (
                                testData.data.length > 0 ? (
                                    filteredData?.map((item: any, index: number) => (
                                        <TableRow key={index}>
                                            <TableCell>{item.name}</TableCell>
                                            {testData.type === 'writing' ? (
                                                <>
                                                    <TableCell>{item.answer_task1}</TableCell>
                                                    <TableCell>{item.answer_task2}</TableCell>
                                                    <TableCell>
                                                        <Tooltip title="Download file answer">

                                                            <IconButton color="warning" aria-label="Download file" onClick={(e) => { handleDownloadFile(item) }}>
                                                                <DownloadIcon />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </TableCell>
                                                </>
                                            ) : (
                                                <>
                                                    <TableCell>{item.score}</TableCell>

                                                    <TableCell>
                                                        {Object.keys(item.answer_data).map(key => (
                                                            <div key={key} className="answer-container">
                                                                <div className={`circle ${item.answer_data[key].correct ? 'correct' : 'incorrect'}`}>
                                                                    {key}
                                                                </div>
                                                                <div className="answer-text">
                                                                    {item.answer_data[key].answer}
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </TableCell>


                                                </>
                                            )}
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={testData.type === 'writing' ? 3 : 3}>
                                            <Typography>No users have taken the test.</Typography>
                                        </TableCell>
                                    </TableRow>
                                )
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={testData?.type === 'writing' ? 3 : 3}>
                                        <Typography>Loading...</Typography>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>

        </Container>
    );
};

export default ShowMore;
