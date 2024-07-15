'use client'
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import { Button, duration, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useEffect } from 'react';



const Part2 = (props: any) => {

    const { formData, setFormData, uploadedImage2, setUploadedImage2, uploadedAudio2, setUploadedAudio2 } = props;

    useEffect(() => {
        if (formData.img2 && formData.img2.data && formData.img2.data.length > 0) {
            const imageUrl = formData.img2.data[0].attributes.formats ?
                formData.img2.data[0].attributes.formats.thumbnail.url :
                formData.img2.data[0].attributes.url;
            setUploadedImage2(`${process.env.NEXT_PUBLIC_STRAPI_LINK_URL}${imageUrl} `);
        }
    }, [formData, setUploadedImage2]);

     
    useEffect(() => {
        if (formData.audio2 && formData.audio2.data && formData.audio2.data.length > 0) {
            const audioUrl = formData.audio1.data[0].attributes.formats ?
                formData.audio2.data[0].attributes.formats.thumbnail.url :
                formData.audio2.data[0].attributes.url;
            setUploadedAudio2(`${process.env.NEXT_PUBLIC_STRAPI_LINK_URL}${audioUrl} `);
        }
    }, [formData, setUploadedAudio2]);




    const handleFileChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setUploadedImage2(reader.result as string);
            };
            reader.readAsDataURL(file);
            setFormData({ ...formData, img2: file });
        }
    };

    const handleAudioChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setUploadedAudio2(reader.result as string);
            };
            reader.readAsDataURL(file);
            setFormData({ ...formData, audio2: file });
        }
    };


    return (
        <>

            <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
                <Box sx={{ width: 'calc(50% - 16px)' }}>
                    <TextField
                        label="Question"
                        value={formData.task2}
                        onChange={(e) => setFormData({ ...formData, task2: e.target.value })}
                        multiline
                        rows={6}
                        variant="outlined"

                        
                        fullWidth
                        sx={{ mb: 2 }}
                    />
                    <label htmlFor="upload-photo1">
                        <input
                            style={{ display: 'none' }}
                            id="upload-photo1"
                            name="upload-photo1"
                            type="file"
                            onChange={handleFileChange1}
                        />
                        <IconButton color="primary" aria-label="upload picture" component="span">
                            <PhotoCameraIcon />
                        </IconButton>
                    </label>
                    <span style={{ marginLeft: '8px', color: 'rgba(0, 0, 0, 0.54)' }}>
                        Upload image
                    </span>
                    <br />
                    <label htmlFor="upload-audio2">
                        <input
                            style={{ display: 'none' }}
                            id="upload-audio2"
                            name="upload-audio2"
                            type="file"
                            accept="audio/*"
                            onChange={handleAudioChange1}
                        />
                        <IconButton color="primary" aria-label="upload audio" component="span">
                            <AudiotrackIcon />
                        </IconButton>
                    </label>
                    <span style={{ marginLeft: '8px', color: 'rgba(0, 0, 0, 0.54)' }}>
                        Upload audio 
                    </span>
                </Box>
                <Box
                    sx={{
                        width: '60%',
                        display: 'flex',
                        justifyContent: 'up',
                        alignItems: 'up',
                        flexDirection: 'column',
                    }}
                >
                    {uploadedImage2 && (
                        <img
                            style={{ maxWidth: '90%', maxHeight: '65%', objectFit: 'contain' }}
                            src={uploadedImage2}
                            alt="Uploaded"
                        />
                    )}
                </Box>

            </Box>
        </>
    )
}
export default Part2;