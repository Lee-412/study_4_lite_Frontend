import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import { duration, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import WritingTask1 from './task1.writing';
import WritingTask2 from './task2.writing';
import { FormDataType } from './writing';
import { error } from 'console';
export interface dataWritingProps {
    formData: FormDataType,
    setFormData: (formData: FormDataType) => void,
    openModalUploadTab: boolean,
    setOpenModalUploadTab: (openModalUploadTab: boolean) => void,
}

interface formDataImg {
    img1: File;
}

const WritingTabUpload = (props: any) => {


    const [currentTaskType, setCurrentTaskType] = useState<string | null>(null);
    const [uploadedImage1, setUploadedImage1] = useState<string | null>(null);
    const [uploadedImage2, setUploadedImage2] = useState<string | null>(null);

    const { formData, setFormData, openModalUploadTab, setOpenModalUploadTab } = props;

    const handleAddTask = (type: string) => {
        setCurrentTaskType(type);
    };

    const handleSubmit = async () => {
        console.log(formData);
        submitDataWrting(formData)
        const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_LINK_API_URL}/wrtings?sort=id:desc`);
        const data = await res.json();
        console.log(data.data[0]);


        //get last data
        // const latestUpdatedData = data.data.reduce((latest: any, current: any) => {
        //     return new Date(latest.attributes.updatedAt) > new Date(current.attributes.updatedAt) ? latest : current;
        // });

        uploadAndUpdate(data.data[0].id, formData.img1, formData.img2)
    };

    const submitDataWrting = async (formData: FormDataType) => {
        let dataToserver = {
            task1: formData.task1,
            task2: formData.task2,
        }
        const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_LINK_API_URL}/wrtings`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                data: dataToserver
            }),
        })

        if (res.status == 200) {
            alert("oke")

        }
        else {
            alert("vl")
        }

    }

    async function uploadImage(file: File): Promise<any> {
        const formData = new FormData();
        formData.append('files', file);

        try {
            const response = await fetch('http://localhost:1337/api/upload', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Failed to upload image');
            }

            const data = await response.json();
            return data[0]; // Giả sử bạn chỉ tải lên một ảnh
        } catch (error) {
            console.error('Error uploading image:', error);
            throw error;
        }
    }

    async function updateObjectWithImage(objectId: string, uploadedImage1: any, uploadedImage2: any): Promise<any> {
        try {
            console.log(objectId);

            const response = await fetch(`http://localhost:1337/api/wrtings/${objectId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    data: {
                        img1: uploadedImage1,
                        img2: uploadedImage2
                    },
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to update object with image');
            }

            const updatedObject = await response.json();
            return updatedObject;
        } catch (error) {
            console.error('Error updating object:', error);
            throw error;
        }
    }

    async function uploadAndUpdate(objectId: string, file1: File, file2: File): Promise<void> {
        try {
            const uploadedImage1 = await uploadImage(file1);
            const uploadedImage2 = await uploadImage(file2);
            const updatedObject = await updateObjectWithImage(objectId, uploadedImage1, uploadedImage2)

            console.log('Updated object:', updatedObject);
        } catch (error) {
            console.error('Error during upload and update:', error);
        }
    }


    const handleClose = () => {
        setOpenModalUploadTab(false);
        setCurrentTaskType(null);
    };

    const handleDurationChange = (event: any) => {
        const value = event.target.value as number;
        setFormData({ ...formData, duration: value });
    };


    const handleTimeChange = (event: any) => {
        setFormData({
            ...formData,
            start_date: event.target.value
        });
    };
    const handleTimeEndChange = (event: any) => {
        setFormData({
            ...formData,
            start_date: event.target.value
        });
    };

    const handleChange = (event: any) => {
        setFormData({
            ...formData,
            name: event.target.value
        });
    }
    return (
        <Modal
            open={openModalUploadTab}
            onClose={handleClose}
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Box
                sx={{
                    width: '80vw',
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 2,
                    maxHeight: '80vh',
                    overflowY: 'auto',
                }}
            >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Button variant="outlined" onClick={() => handleAddTask('task1')} disabled={currentTaskType === 'task1'}>
                        Add Task 1
                    </Button>
                    <Button variant="outlined" onClick={() => handleAddTask('task2')} disabled={currentTaskType === 'task2'}>
                        Add Task 2
                    </Button>
                </Box>

                {currentTaskType && (
                    <Box sx={{ mt: 2 }}>
                        {currentTaskType === 'task1' && (
                            <WritingTask1
                                formData={formData}
                                setFormData={setFormData}
                                uploadedImage1={uploadedImage1}
                                setUploadedImage1={setUploadedImage1}
                            />
                        )}
                        {currentTaskType === 'task2' && (
                            <WritingTask2
                                formData={formData}
                                setFormData={setFormData}
                                uploadedImage2={uploadedImage2}
                                setUploadedImage2={setUploadedImage2}
                            />
                        )}

                    </Box>
                )}

                <Box sx={{ p: 2, display: 'flex', alignItems: 'center', mb: 2, flexDirection: "column" }}>
                    <TextField
                        fullWidth
                        label="Test Duration"
                        name="testDuration"
                        value={formData.Duration}
                        onChange={handleDurationChange}
                        sx={{ mb: 2 }}
                    />

                    <TextField
                        fullWidth
                        label="Strat"
                        type="datetime-local"
                        name="start"
                        value={formData.time}
                        onChange={handleTimeChange}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        inputProps={{
                            step: 300, // 5 minutes
                        }}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        fullWidth
                        label="End"
                        type="datetime-local"
                        name="end"
                        value={formData.time}
                        onChange={handleTimeEndChange}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        inputProps={{
                            step: 300, // 5 minutes
                        }}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        fullWidth
                        label="Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        sx={{ mb: 2 }}
                    />
                </Box>
                <Box sx={{ mt: 2 }}>
                    <Button variant="outlined" onClick={handleSubmit}>
                        Submit
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default WritingTabUpload;
