import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import WritingTask1 from './task1.writing';
import WritingTask2 from './task2.writing';
import { FormDataType, ImageType } from './writing';
import { submitDataTests, submitDataWrting, submitEditDataTests, submitEditDataWriting, updateRelationtoWriting, uploadAndUpdate } from '@/utils/api';

export interface dataWritingProps {
    formData: FormDataType,
    setFormData: (formData: FormDataType) => void,
    openModalEditTab: boolean,
    setOpenModalEditTab: (openModalEditTab: boolean) => void,
    dataEdit: any,
    setDataEdit: (dataEdit: any) => void,
    fetchTasks: () => void
}

interface formDataImg {
    img1: ImageType | null;
    img2: ImageType | null;
}

const WritingTabEdit = (props: dataWritingProps) => {
    const { formData, setFormData, openModalEditTab, setOpenModalEditTab, dataEdit, setDataEdit, fetchTasks } = props;
    const [currentTaskType, setCurrentTaskType] = useState<string | null>(null);
    const [uploadedImage1, setUploadedImage1] = useState<string | null>(null);
    const [uploadedImage2, setUploadedImage2] = useState<string | null>(null);
    console.log(dataEdit);
    console.log(formData);

    useEffect(() => {
        if (dataEdit) {
            setFormData({
                id: dataEdit.id,
                name: dataEdit.test.data.attributes.name,
                task1: dataEdit.task1,
                img1: dataEdit.img1,
                img2: dataEdit.img2,
                task2: dataEdit.task2,
                duration: dataEdit.test.data.attributes.Duration,
                type: dataEdit.test.data.attributes.type,
                start_date: dataEdit.test.data.attributes.Start,
                end_date: dataEdit.test.data.attributes.End,
            });
            setCurrentTaskType(dataEdit.currentTaskType || null);
        }
    }, [dataEdit, setFormData]);
    console.log(formData);

    const handleSaveTask = async () => {
        try {
            // Update existing data
            console.log(formData);

            // check data validation FE => Update check validation BE sau
            if (!formData.task1 && !formData.task2) {
                alert("Vui lòng tạo ít nhất 1 task.");
                return;
            }

            if (!formData.name) {
                alert("Vui lòng nhập nội dung name Test.");
                return;
            }

            if (!formData.duration || isNaN(formData.duration)) {
                alert("Vui lòng nhập thời gian làm bài là một số.");
                return;
            }

            const wrtingId = await submitEditDataWriting(formData);
            const testId = await submitEditDataTests(formData, dataEdit);

            if (wrtingId && testId) {
                await updateRelationtoWriting(testId, wrtingId);
                // Update images
                if (formData.img1 && formData.img2) {
                    console.log(formData.img1);
                    console.log(formData.img2);
                    console.log(formData.img1 as unknown as File);


                    await uploadAndUpdate(wrtingId as unknown as string, formData.img1 as unknown as File, formData.img2 as unknown as File);
                }
            }

            setOpenModalEditTab(false);
            fetchTasks();
        } catch (error) {
            console.error('Error saving task:', error);
        }
    };

    const handleClose = () => {
        setOpenModalEditTab(false);
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
            end_date: event.target.value
        });
    };

    const handleChange = (event: any) => {
        setFormData({
            ...formData,
            name: event.target.value
        });
    };

    return (
        <Modal
            open={openModalEditTab}
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
                    <Button variant="outlined" onClick={() => setCurrentTaskType('task1')} disabled={currentTaskType === 'task1'}>
                        Edit Task 1
                    </Button>
                    <Button variant="outlined" onClick={() => setCurrentTaskType('task2')} disabled={currentTaskType === 'task2'}>
                        Edit Task 2
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
                        value={formData.duration}
                        onChange={handleDurationChange}
                        sx={{ mb: 2 }}
                    />

                    <TextField
                        fullWidth
                        label="Start"
                        type="datetime-local"
                        name="start"
                        value={formData.start_date}
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
                        value={formData.end_date}
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
                    <Button variant="outlined" onClick={handleSaveTask}>
                        Save
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default WritingTabEdit;
