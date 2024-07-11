import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import { FormDataType, TaskType } from './writing';


type TestDataAttributes = {
    name: string;
    Start: string;
    End: string;
    Duration: number;
    type: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
};

type TestData = {
    id: number;
    attributes: TestDataAttributes;
};



type WritingTabEditProps = {
    formData: FormDataType;
    setFormData: React.Dispatch<React.SetStateAction<FormDataType>>;
    openModalEditTab: boolean;
    setOpenModalEditTab: React.Dispatch<React.SetStateAction<boolean>>;
    handleSaveTask: () => void;
    dataEdit: TaskType;
    setDataEdit: (dataEdit: any) => void;
};

const WritingTabEdit = (props: WritingTabEditProps) => {

    const { formData, setFormData, openModalEditTab, setOpenModalEditTab, handleSaveTask, dataEdit, setDataEdit } = props;



    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, imgType: 'img1' | 'img2') => {
        const file = e.target.files?.[0];
        if (file) {
            setFormData((prevFormData) => ({
                ...prevFormData,
                [imgType]: file,
            }));
        }
    };
    const handleChange = (e: any) => {

    }
    const handleClose = () => {
        setOpenModalEditTab(false);
    };
    const formtest = {
        task1: 'test',
        task2: 'test2',
        img1: '/png',
        img2: '/png',
        test: dataEdit.test,
    }
    const handleSubmit = async () => {
        if (!dataEdit) return;
        try {
            await saveWritingData(formtest);
            // await saveTestData(dataEdit.test.data);
            handleSaveTask();
            handleClose();
        } catch (error) {
            console.error('Error saving data:', error);
        }
    };

    const saveWritingData = async (writingData: any) => {
        const apiUrl = `${process.env.NEXT_PUBLIC_STRAPI_LINK_API_URL}/writings/1`;
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                task1: writingData.task1,
                task2: writingData.task2,
                img1: writingData.img1,
                img2: writingData.img2,
                test: writingData.id,
            }),
        };
        const response = await fetch(apiUrl, requestOptions);
        if (!response.ok) {
            throw new Error('Failed to save Writing data');
        }
    };

    const saveTestData = async (testData: TestData) => {
        const apiUrl = `${process.env.NEXT_PUBLIC_STRAPI_LINK_API_URL}/tests/${testData.id}`;
        const requestOptions = {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: testData.attributes.name,
                Start: testData.attributes.Start,
                End: testData.attributes.End,
                type: testData.attributes.type,
                Duration: testData.attributes.Duration,
            }),
        };
        const response = await fetch(apiUrl, requestOptions);
        if (!response.ok) {
            throw new Error('Failed to save Test data');
        }
    };

    return (
        <Modal
            open={openModalEditTab}
            onClose={handleClose}
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflowY: 'auto',
            }}
        >
            <Box sx={{ width: 800, bgcolor: 'background.paper', p: 4, borderRadius: 2 }}>
                {dataEdit ? (
                    <Box sx={{ maxHeight: '80vh', overflowY: 'auto' }}>
                        <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between' }}>
                            <TextField
                                fullWidth
                                label="Task 1"
                                name="task1"
                                value={dataEdit.task1}
                                onChange={handleChange}
                                sx={{ mb: 2, mr: 2 }}
                            />
                            <Box>
                                <IconButton color="primary" component="label">
                                    <PhotoCameraIcon />
                                    <input
                                        type="file"
                                        hidden
                                        onChange={(e) => handleImageUpload(e, 'img1')}
                                    />
                                </IconButton>
                                {formData.img1 && (
                                    <Box sx={{ mt: 2 }}>
                                        <img
                                            src=''
                                            alt="Uploaded"
                                            style={{ maxWidth: '100%', maxHeight: '200px' }}
                                        />
                                    </Box>
                                )}
                            </Box>
                        </Box>
                        <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between' }}>
                            <TextField
                                fullWidth
                                label="Task 2"
                                name="task2"
                                value={dataEdit.task2}
                                onChange={handleChange}
                                sx={{ mb: 2, mr: 2 }}
                            />
                            <Box>
                                <IconButton color="primary" component="label">
                                    <PhotoCameraIcon />
                                    <input
                                        type="file"
                                        hidden
                                        onChange={(e) => handleImageUpload(e, 'img2')}
                                    />
                                </IconButton>
                                {formData.img2 && (
                                    <Box sx={{ mt: 2 }}>
                                        <img
                                            src=''
                                            alt="Uploaded"
                                            style={{ maxWidth: '100%', maxHeight: '200px' }}
                                        />
                                    </Box>
                                )}
                            </Box>
                        </Box>

                        <Box sx={{ mb: 2 }}>
                            <TextField
                                fullWidth
                                label="Test Name"
                                name="testName"
                                value={dataEdit.test.data.attributes.name}
                                onChange={handleChange}
                                sx={{ mb: 2 }}
                            />
                        </Box>
                        <Box sx={{ mb: 2 }}>
                            <TextField
                                fullWidth
                                label="Start Time"
                                name="startTime"
                                value={dataEdit.test.data.attributes.Start}
                                onChange={handleChange}
                                sx={{ mb: 2 }}
                            />
                        </Box>
                        <Box sx={{ mb: 2 }}>
                            <TextField
                                fullWidth
                                label="End Time"
                                name="endTime"
                                value={dataEdit.test.data.attributes.End}
                                onChange={handleChange}
                                sx={{ mb: 2 }}
                            />
                        </Box>

                        <Box sx={{ mb: 2 }}>
                            <TextField
                                fullWidth
                                label="Type"
                                name="type"
                                value={dataEdit.test.data.attributes.type}
                                onChange={handleChange}
                                sx={{ mb: 2 }}
                            />
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Button variant="outlined" onClick={handleSubmit}>
                                Save
                            </Button>
                        </Box>
                    </Box>
                ) : (
                    <Box sx={{ textAlign: 'center' }}>
                        <p>Không có gì để chỉnh sửa</p>
                    </Box>
                )}
            </Box>
        </Modal>
    );
};

export default WritingTabEdit;
