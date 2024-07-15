import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Part1 from './part1';
import Part2 from './part2';
import Part3 from './part3';
import Part4 from './part4';
import { FormDataType, ImageType } from './listening';
import {submitEditDataTests, submitEditDataWriting, updateRelationtoWriting, uploadAndUpdate } from '@/utils/api';

export interface ListeningDataProps {
    formData: any,
    setFormData: (formData: any) => void,
    openModalEditTab: boolean,
    setOpenModalEditTab: (openModalEditTab: boolean) => void,
    dataEdit: any,
    setDataEdit: (dataEdit: any) => void,
    fetchTasks: () => void
}

const ListeningTabEdit = (props: ListeningDataProps) => {
    const { formData, setFormData, openModalEditTab, setOpenModalEditTab, dataEdit} = props;
    const [currentTaskType, setCurrentTaskType] = useState<string | null>(null);
    const [uploadedImage1, setUploadedImage1] = useState<string | null>(null);
    const [uploadedImage2, setUploadedImage2] = useState<string | null>(null);
    const [uploadedImage3, setUploadedImage3] = useState<string | null>(null);
    const [uploadedImage4, setUploadedImage4] = useState<string | null>(null);
    const [uploadAudio1, setUploadAudio1] = useState<string | null>(null);
    const [uploadAudio2, setUploadAudio2] = useState<string | null>(null);
    const [uploadAudio3, setUploadAudio3] = useState<string | null>(null);
    const [uploadAudio4, setUploadAudio4] = useState<string | null>(null);

    console.log(dataEdit);
    console.log(formData);

    useEffect(() => {
        if (dataEdit) {
            setFormData({
                id: dataEdit.id,
                name: dataEdit.test.data.attributes.name,
                task1: dataEdit.task1,
                img1: dataEdit.img1,
                audio1: dataEdit.audio1,
                question1: dataEdit.question1,
                task2: dataEdit.task2,
                img2: dataEdit.img2,
                audio2: dataEdit.audio2,
                question2: dataEdit.question2,
                task3: dataEdit.task3,
                img3: dataEdit.img3,
                audio3: dataEdit.audio3,
                question3: dataEdit.question3,
                task4: dataEdit.task4,
                img4: dataEdit.img4,
                audio4: dataEdit.audio4,
                question4: dataEdit.question4,
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
            if (!formData.task1 && !formData.task2 && !formData.task3 && !formData.task4) {
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

            // const listenId = await submitEditDataWriting(formData);
            // const testId = await submitEditDataTests(formData, dataEdit);

            // if (wrtingId && testId) {
            //     await updateRelationtoWriting(testId, wrtingId);
            //     // Update images
            //     if (formData.img1 && formData.img2) {
            //         console.log(formData.img1);
            //         console.log(formData.img2);
            //         console.log(formData.img1 as unknown as File);


            //         await uploadAndUpdate(wrtingId as unknown as string, formData.img1 as unknown as File, formData.img2 as unknown as File);
            //     }
            // }

            setOpenModalEditTab(false);
            // fetchTasks();
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
                        Edit part 1
                    </Button>
                    <Button variant="outlined" onClick={() => setCurrentTaskType('task2')} disabled={currentTaskType === 'task2'}>
                        Edit part 2
                    </Button>
                    <Button variant="outlined" onClick={() => setCurrentTaskType('task3')} disabled={currentTaskType === 'task3'}>
                        Edit part 3
                    </Button>
                    <Button variant="outlined" onClick={() => setCurrentTaskType('task4')} disabled={currentTaskType === 'task4'}>
                        Edit part 4
                    </Button>

                </Box>

                {currentTaskType && (
                    <Box sx={{ mt: 2 }}>
                        {currentTaskType === 'task1' && (
                            <Part1
                                formData={formData}
                                setFormData={setFormData}
                                uploadedImage1={uploadedImage1}
                                setUploadedImage1={setUploadedImage1}
                                uploadAudio1={uploadAudio1}
                                setUploadAudio1={setUploadAudio1}
                            />
                        )}
                        {currentTaskType === 'task2' && (
                            <Part2
                                formData={formData}
                                setFormData={setFormData}
                                uploadedImage2={uploadedImage2}
                                setUploadedImage2={setUploadedImage2}
                                uploadAudio2={uploadAudio2}
                                setUploadAudio2={setUploadAudio2}
                            />
                        )}
                        {currentTaskType === 'task3' && (
                            <Part3
                                formData={formData}
                                setFormData={setFormData}
                                uploadedImage3={uploadedImage3}
                                setUploadedImage3={setUploadedImage3}
                                uploadAudio3={uploadAudio3}
                                setUploadAudio3={setUploadAudio3}
                            />
                        )}
                        {currentTaskType === 'task4' && (
                            <Part4
                                formData={formData}
                                setFormData={setFormData}
                                uploadedImage4={uploadedImage4}
                                setUploadedImage4={setUploadedImage4}
                                uploadAudio4={uploadAudio4}
                                setUploadAudio4={setUploadAudio4}
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

export default ListeningTabEdit;
