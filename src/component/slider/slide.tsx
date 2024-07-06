
'use client'


import { useState } from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

const ImageSlider = (props: any) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrev = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? props.sliderData.length - 1 : prevIndex - 1
        );
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === props.sliderData.length - 1 ? 0 : prevIndex + 1
        );
    };

    const renderImages = () => {
        const imagesToShow = [];

        for (let i = 0; i < 3; i++) {
            const index = (currentIndex + i) % props.sliderData.length;
            imagesToShow.push(
                <Grid item xs={12} sm={4} key={props.sliderData[index].id} sx={{ padding: 1 }}>
                    <img
                        src={props.sliderData[index].img}
                        alt=""
                        style={{
                            width: '27vw',
                            height: '40vh',
                            objectFit: "cover",
                            borderRadius: "1vw"
                        }}
                    />
                </Grid>
            );
        }

        return imagesToShow;
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: "center" }}>
            <Typography sx={{
                display: 'flex',
                marginTop: "30px",
                marginBottom: "20px",
                fontWeight: "bold",
                width: "80vw",
                justifyContent: "center",
                height: "10vh",
                fontSize: "5vh",
                alignItems: 'center',
                color: "#09366E"
            }}>
                Những hình ảnh về lớp học
            </Typography>
            <Grid container spacing={2} justifyContent="center">
                {renderImages()}
            </Grid>

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    marginBottom: '1%',
                    marginTop: '1%',
                }}
            >
                <Button onClick={handlePrev}><ArrowBackIosNewIcon /></Button>
                <Button onClick={handleNext}><ArrowForwardIosIcon /></Button>
            </Box>
        </Box>
    );
};

export default ImageSlider;
