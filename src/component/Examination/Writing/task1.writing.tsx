'use client'
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import { Button, duration, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';



const WritingTask1 = (props: any) => {

    const { formData, setFormData, uploadedImage1, setUploadedImage1 } = props;

    React.useEffect(() => {
        if (formData.img1 && formData.img1.data && formData.img1.data.length > 0) {
            const imageUrl = formData.img1.data[0].attributes.formats ?
                formData.img1.data[0].attributes.formats.thumbnail.url :
                formData.img1.data[0].attributes.url;
            setUploadedImage1(`${process.env.NEXT_PUBLIC_STRAPI_LINK_URL}${imageUrl} `);
        }
    }, [formData, setUploadedImage1]);

    const handleFileChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setUploadedImage1(reader.result as string);
            };
            reader.readAsDataURL(file);
            setFormData({ ...formData, img1: file });
        }
    };


    return (
        <>

            <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
                <Box sx={{ width: 'calc(50% - 16px)' }}>
                    <TextField
                        label="Task 1"
                        value={formData.task1}
                        onChange={(e) => setFormData({ ...formData, task1: e.target.value })}
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
                        Tải lên ảnh Task 1
                    </span>
                </Box>
                <Box
                    sx={{
                        width: '50%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    {uploadedImage1 && (
                        <img
                            style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                            src={uploadedImage1}
                            alt="Uploaded"
                        />
                    )}
                </Box>

            </Box>
        </>
    )
}
export default WritingTask1;