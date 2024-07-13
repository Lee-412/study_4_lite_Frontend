'use client'
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import { Button, duration, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';


const WritingTask2 = (props: any) => {

    const { formData, setFormData, uploadedImage2, setUploadedImage2 } = props;

    React.useEffect(() => {
        if (formData.img2 && formData.img2.data && formData.img2.data.length > 0) {
            const imageUrl = formData.img2.data[0].attributes.formats ?
                formData.img2.data[0].attributes.formats.thumbnail.url :
                formData.img2.data[0].attributes.url;
            setUploadedImage2(`${process.env.NEXT_PUBLIC_STRAPI_LINK_URL}${imageUrl} `);
        }
    }, [formData, setUploadedImage2]);

    const handleFileChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
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


    return (
        <>
            <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
                <Box sx={{ width: 'calc(50% - 16px)' }}>
                    <TextField
                        label="Task 2"
                        value={formData.task2}
                        onChange={(e) => setFormData({ ...formData, task2: e.target.value })}
                        multiline
                        rows={6}
                        variant="outlined"
                        fullWidth
                        sx={{ mb: 2 }}
                    />
                    <label htmlFor="upload-photo2">
                        <input
                            style={{ display: 'none' }}
                            id="upload-photo2"
                            name="upload-photo2"
                            type="file"
                            onChange={handleFileChange2}
                        />
                        <IconButton color="primary" aria-label="upload picture" component="span">
                            <PhotoCameraIcon />
                        </IconButton>
                    </label>
                    <span style={{ marginLeft: '8px', color: 'rgba(0, 0, 0, 0.54)' }}>
                        Tải lên ảnh Task 2
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
                    {uploadedImage2 && (
                        <img
                            style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                            src={uploadedImage2}
                            alt="Uploaded"
                        />
                    )}
                </Box>

            </Box>



        </>
    )
}
export default WritingTask2;