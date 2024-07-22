import React, { useEffect, useState } from 'react';
import { Box, Button, IconButton, MenuItem, Select, TextField, Typography } from '@mui/material';
import { FormDataType } from './listening';
import { Audiotrack, FilePresent, PhotoCamera } from '@mui/icons-material';
import { uploadImage } from '@/utils/api';
import QuestionForm from './add.question';


interface Part1ComponentProps {
    part: number;
    formData: FormDataType;
    setFormData: (formData: FormDataType) => void;
    initialImage?: string;
    initialAudio?: string;
    uploadedImage: File | null;
    uploadedAudio: File | null;
    setUploadedImage: (uploadImg: File | null) => void;
    setUploadedAudio: (uploadAudio: File | null) => void;
}

const PartComponent = (props: Part1ComponentProps) => {
    const { part, formData, setFormData, initialImage, uploadedImage, uploadedAudio, setUploadedImage, setUploadedAudio } = props;
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [audioPreview, setAudioPreview] = useState<string | null>(null);

    useEffect(() => {
        if (uploadedImage) {
            setImagePreview(URL.createObjectURL(uploadedImage));
        } else {
            setImagePreview(initialImage || null);
        }
    }, [initialImage, uploadedImage]);

    useEffect(() => {
        if (uploadedAudio) {
            setAudioPreview(URL.createObjectURL(uploadedAudio));
        } else {
            setAudioPreview(props.initialAudio || null);
        }
    }, [props.initialAudio, uploadedAudio]);

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setUploadedImage(file);
            if (part == 1) {
                setFormData({
                    ...formData,
                    img1: file
                })
            }
            if (part == 2) {
                setFormData({
                    ...formData,
                    img2: file
                })
            }
            if (part == 3) {
                setFormData({
                    ...formData,
                    img3: file
                })
            }
            if (part == 4) {
                setFormData({
                    ...formData,
                    img4: file
                })
            }
        }
        else {
            alert("image ko hợp lệ")
        }
    };

    const handleAudioUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setUploadedAudio(file);
            if (part == 1) {
                setFormData({
                    ...formData,
                    audio1: file
                })
            }
            if (part == 2) {
                setFormData({
                    ...formData,
                    audio2: file
                })
            }
            if (part == 3) {
                setFormData({
                    ...formData,
                    audio3: file
                })
            }
            if (part == 4) {
                setFormData({
                    ...formData,
                    audio4: file
                })
            }
        }
        else {
            alert("audio ko hợp lệ")
        }
    };

    const [questionType, setQuestionType] = useState<'filling' | 'multiple choice' | null>(null);
    const handleQuestionTypeChange = (event: any) => {
        setQuestionType(event.target.value as 'filling' | 'multiple choice');
    };

    const [newQuestionText, setNewQuestionText] = useState('');
    const [newAnswerText, setNewAnswerText] = useState('');
    const [newChoices, setNewChoices] = useState<string[]>(['']);
    const [newCorrectAnswer, setNewCorrectAnswer] = useState('');
    const handleChoiceChange = (index: number, value: string) => {
        const updatedChoices = [...newChoices];
        updatedChoices[index] = value;
        setNewChoices(updatedChoices);
    };

    const addChoice = () => {
        setNewChoices([...newChoices, '']);
    };

    const removeChoice = (index: number) => {
        setNewChoices(newChoices.filter((_, i) => i !== index));
    };

    const addQuestion = () => {
        alert(`Question added for Part ${part}`);
        setNewQuestionText('');
        setNewAnswerText('');
        setNewChoices(['']);
        setNewCorrectAnswer('');
    };
    return (
        <Box sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', mb: 2, mt: 5 }}>

                <Box
                    sx={{ display: 'flex', alignItems: 'center', mb: 2 }}
                >

                    <Box sx={{
                        display: 'flex', alignItems: 'center', mb: 2,
                        width: '30vw'

                    }}>
                        <IconButton
                            component="label"
                            color="primary"
                            sx={{ marginRight: 2 }}
                        >
                            <PhotoCamera />
                            <input
                                accept="image/*"
                                type="file"
                                hidden
                                onChange={handleImageUpload}
                            />
                        </IconButton>
                        <Typography variant="body1">   {uploadedImage ? uploadedImage.name : "Upload Image"}</Typography>
                    </Box>

                    {imagePreview && (
                        <Box sx={{
                            width: '30vw'

                        }}>
                            <img
                                src={imagePreview}
                                alt="Preview"
                                style={{ width: '100px', height: '100px', marginRight: '16px' }}
                            />
                        </Box>
                    )}


                </Box>
                <Box
                    sx={{ display: 'flex', alignItems: 'center', mb: 2 }}
                >
                    <Box sx={{
                        display: 'flex', alignItems: 'center', mb: 2,
                        width: '30vw'

                    }}>
                        <IconButton
                            component="label"
                            color="primary"
                            sx={{ marginRight: 2 }}
                        >
                            <Audiotrack />
                            <input
                                accept="audio/*"
                                type="file"
                                hidden
                                onChange={handleAudioUpload}
                            />
                        </IconButton>
                        <Typography variant="body1">   {uploadedAudio ? uploadedAudio.name : "Upload Audio"}</Typography>
                    </Box>

                    {audioPreview && (
                        <Box sx={{
                            width: '30vw'
                        }}>
                            <audio
                                controls
                                src={audioPreview}
                                style={{ marginRight: '16px' }}
                            />
                        </Box>
                    )}

                </Box>




            </Box>
            <Box>
                {/* Display current part */}

                {part === 1 && (
                    <>
                        <QuestionForm
                            part={part}
                            question={formData.questions1}
                            formData={formData}
                            setFormData={setFormData}
                        />

                    </>
                )}
                {part === 2 && (
                    <>
                        <QuestionForm
                            part={part}
                            question={formData.questions2}
                            formData={formData}
                            setFormData={setFormData}
                        />
                    </>
                )}

                {part === 3 && (
                    <>
                        <QuestionForm
                            part={part}
                            question={formData.questions3}
                            formData={formData}
                            setFormData={setFormData}
                        />
                    </>
                )}

                {part === 4 && (
                    <>
                        <QuestionForm
                            part={part}
                            question={formData.questions4}
                            formData={formData}
                            setFormData={setFormData}
                        />
                    </>
                )}

            </Box>
        </Box>
    );
};

export default PartComponent;
