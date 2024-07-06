'use client'
import * as React from 'react';
import { useState, useEffect } from 'react';
import {
    Button,
    Card,
    CardContent,
    CardMedia,
    Grid,
    Typography,
    TextField,
    InputAdornment,
    IconButton,
    Checkbox,
    FormControlLabel,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useTheme } from '@mui/material/styles';
import { useSession } from 'next-auth/react';

const courses = [
    {
        id: 1,
        title: 'English for Beginners',
        description:
            'This course is designed for students who have no prior knowledge of English.',
        image: '/images/course1.jpg',
        instructor: 'John Smith',
        price: 100,
        rating: 4.5,
        reviews: 100,
        duration: '6 weeks',
        level: 'Beginner',
    },
    {
        id: 2,
        title: 'English for Intermediate Learners',
        description:
            'This course is designed for students who have some prior knowledge of English.',
        image: '/images/course2.jpg',
        instructor: 'Jane Doe',
        price: 150,
        rating: 4.8,
        reviews: 200,
        duration: '8 weeks',
        level: 'Intermediate',
    },
    {
        id: 3,
        title: 'English for Advanced Learners',
        description:
            'This course is designed for students who have a good command of English.',
        image: '/images/course3.jpg',
        instructor: 'Robert Jones',
        price: 200,
        rating: 5,
        reviews: 300,
        duration: '10 weeks',
        level: 'Advanced',
    },
];

const CourseCard = (course: any) => {
    const theme = useTheme();

    return (
        <Grid item xs={12} sm={6} md={4} lg={3}>
            <Card sx={{ maxWidth: 345, margin: '10px' }}>
                <CardMedia
                    component="img"
                    height="140"
                    image={course.image}
                    alt="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {course.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {course.description}
                    </Typography>
                </CardContent>
                <Grid container alignItems="center" justifyContent="space-between" sx={{ padding: '10px' }}>
                    <Grid item>
                        <Typography variant="body1" color="text.secondary">
                            Instructor: {course.instructor}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="body1" color="text.secondary">
                            Price: ${course.price}
                        </Typography>
                    </Grid>
                </Grid>
            </Card>
        </Grid>
    );
};

const TestPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredCourses, setFilteredCourses] = useState(courses);
    const [showFilter, setShowFilter] = useState(false);
    const [levelFilter, setLevelFilter] = useState('');


    const { data: session } = useSession();


    useEffect(() => {
        const filterCourses = courses.filter(
            (course) =>
                course.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
                (levelFilter === '' || course.level === levelFilter)
        );
        setFilteredCourses(filterCourses);
    }, [searchTerm, levelFilter]);

    const handleSearchChange = (event: any) => {
        setSearchTerm(event.target.value);
    };

    const handleLevelFilterChange = (event: any) => {
        setLevelFilter(event.target.checked ? event.target.value : '');
    };

    return (
        <div>
            <Typography variant="h4" align="center" gutterBottom>
                Welcome to our Online Learning Platform
            </Typography>
            <Typography variant="h4" align="center" gutterBottom>
            </Typography>
            <Grid container justifyContent="center" alignItems="center" sx={{ marginBottom: '20px' }}>
                <Grid item>
                    <TextField
                        label="Search Courses"
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

                <Grid item sx={{ marginLeft: '10px' }}>
                    <Button variant="contained" onClick={() => setShowFilter(!showFilter)}>
                        Filter Courses
                    </Button>
                </Grid>
            </Grid>

            {showFilter && (
                <Grid container justifyContent="center" alignItems="center" sx={{ marginBottom: '20px' }}>
                    <Grid item>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={levelFilter === 'Beginner'}
                                    onChange={handleLevelFilterChange}
                                    value="Beginner"
                                />
                            }
                            label="Beginner"
                        />
                    </Grid>
                    <Grid item>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={levelFilter === 'Intermediate'}
                                    onChange={handleLevelFilterChange}
                                    value="Intermediate"
                                />
                            }
                            label="Intermediate"
                        />
                    </Grid>
                    <Grid item>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={levelFilter === 'Advanced'}
                                    onChange={handleLevelFilterChange}
                                    value="Advanced"
                                />
                            }
                            label="Advanced"
                        />
                    </Grid>
                </Grid>
            )}

            <Grid container spacing={2}>
                {filteredCourses.map((course) => (
                    <CourseCard key={course.id} course={course} />
                ))}
            </Grid>
        </div>
    );
};

export default TestPage;