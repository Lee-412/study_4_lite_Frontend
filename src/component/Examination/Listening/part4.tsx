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



const Part4 = (props: any) => {

    const { formData, setFormData, uploadedImage4, setUploadedImage4, uploadedAudio4, setUploadedAudio4 } = props;

    useEffect(() => {
        if (formData.img4 && formData.img4.data && formData.img4.data.length > 0) {
            const imageUrl = formData.img4.data[0].attributes.formats ?
                formData.img4.data[0].attributes.formats.thumbnail.url :
                formData.img4.data[0].attributes.url;
            setUploadedImage4(`${process.env.NEXT_PUBLIC_STRAPI_LINK_URL}${imageUrl} `);
        }
    }, [formData, setUploadedImage4]);

     
    useEffect(() => {
        if (formData.audio4 && formData.audio4.data && formData.audio4.data.length > 0) {
            const audioUrl = formData.audio4.data[0].attributes.formats ?
                formData.audio4.data[0].attributes.formats.thumbnail.url :
                formData.audio4.data[0].attributes.url;
            setUploadedAudio4(`${process.env.NEXT_PUBLIC_STRAPI_LINK_URL}${audioUrl} `);
        }
    }, [formData, setUploadedAudio4]);




    const handleFileChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setUploadedImage4(reader.result as string);
            };
            reader.readAsDataURL(file);
            setFormData({ ...formData, img4: file });
        }
    };

    const handleAudioChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setUploadedAudio4(reader.result as string);
            };
            reader.readAsDataURL(file);
            setFormData({ ...formData, audio4: file });
        }
    };


    return (
        <>

            <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
                <Box sx={{ width: 'calc(50% - 16px)' }}>
                    <TextField
                        label="Question"
                        value={formData.task1}
                        onChange={(e) => setFormData({ ...formData, task4: e.target.value })}
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
                    <label htmlFor="upload-audio1">
                        <input
                            style={{ display: 'none' }}
                            id="upload-audio1"
                            name="upload-audio1"
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
                    {uploadedImage4 && (
                        <img
                            style={{ maxWidth: '90%', maxHeight: '65%', objectFit: 'contain' }}
                            src={uploadedImage4}
                            alt="Uploaded"
                        />
                    )}
                </Box>

            </Box>
        </>
    )
}
export default Part4;