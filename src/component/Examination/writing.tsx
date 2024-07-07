import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import { Button, duration, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
type FormDataType = {
    task1: string;
    img1: File;
    task2: string;
    img2: File;
    duration: number;
    type: string;
    start_date: string;
    end_date: string;
};
const WritingTab = () => {
    const [uploadedImage1, setUploadedImage1] = React.useState<string | null>(null);
    const [uploadedImage2, setUploadedImage2] = React.useState<string | null>(null);

    const [formData, setFormData] = React.useState<FormDataType>({
        task1: '',
        img1: new File([""], "filename"),
        task2: '',
        img2: new File([""], "filename"),
        duration: 0,
        type: 'Writing',
        start_date: '',
        end_date: '',
    })

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

    const handleDurationChange = (event: any) => {
        const value = event.target.value as number;
        setFormData({ ...formData, duration: value });
    };

    const handleSubmit = () => {
        console.log(formData);

    }

    return (<Box>

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


        <Box>

            <Box sx={{ p: 2, display: 'flex', alignItems: 'center', mb: 2 }}>
                <AccessTimeIcon color="primary" />
                <span style={{ marginLeft: '8px' }}>Thời gian giới hạn: </span>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="select-duration-label">Thời gian (giây)</InputLabel>
                    <Select
                        value={formData.duration}
                        onChange={handleDurationChange}
                        label="Thời gian"
                    >
                        <MenuItem value={30}>30 giây</MenuItem>
                        <MenuItem value={60}>1 phút</MenuItem>
                        <MenuItem value={120}>2 phút</MenuItem>
                        <MenuItem value={300}>5 phút</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            <Button
                variant="outlined"
                onClick={handleSubmit}>
                Submit
            </Button>
        </Box>
    </Box >
    );
};

export default WritingTab;

