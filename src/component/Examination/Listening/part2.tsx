'use client'
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useEffect, useState } from 'react';
import { ListeningTest } from '@/utils/postListening';
import DeleteIcon from '@mui/icons-material/Delete';

const Part2 = (props: any) => {
    const { formData, setFormData, uploadedImage2, setUploadedImage2, uploadedAudio2, setUploadedAudio2 } = props;
    const [questions, setQuestions] = useState<{ type: string, content: string, answer: string, choices?: { [key: string]: string } }[]>([]);

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
            const audioUrl = formData.audio1.data[0].attributes.url;
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

    const addQuestion = () => {
        setQuestions([...questions, { type: 'filling', content: '', answer: '', choices: {} }]);
    };

    const handleQuestionChange = (index: number, field: string, value: string) => {
        const newQuestions = questions.map((question, qIndex) =>
            qIndex === index ? { ...question, [field]: value } : question
        );
        setQuestions(newQuestions);
        setFormData({ ...formData, questions: newQuestions });
    };

    const handleChoiceChange = (index: number, choice: string, value: string) => {
        const newQuestions = questions.map((question, qIndex) => 
            qIndex === index ? { ...question, choices: { ...question.choices, [choice]: value } } : question
        );
        setQuestions(newQuestions);
        setFormData({ ...formData, questions: newQuestions });
    };

    const renderChoices = (questionIndex: number) => (
        <Box>
            {['A', 'B', 'C', 'D'].map(choice => (
                <TextField
                    key={choice}
                    fullWidth
                    label={`Choice ${choice}`}
                    value={questions[questionIndex].choices?.[choice] || ''}
                    onChange={(e) => handleChoiceChange(questionIndex, choice, e.target.value)}
                    sx={{ mb: 2 }}
                />
            ))}
        </Box>
    );

    const removeQuestion = (index: number) => {
        const newQuestions = questions.filter((_, qIndex) => qIndex !== index);
        setQuestions(newQuestions);
        setFormData({ ...formData, questions: newQuestions });
    };

    const lt = new ListeningTest();

    const handleSubmit = async () => {
        for (const question of questions) {
            if (question.type === 'filling') {
                lt.addFilling(question.content, question.answer);
            } else if (question.type === 'multiplechoice') {
                lt.addMultiplechoice(question.content, question.answer, question.choices);
            }
        }
        await lt.submitForm();
    };

    return (
        <>
            <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
                <Box sx={{ width: 'calc(50% - 16px)' }}>
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
                <Box sx={{
                    width: '60%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                }}>
                    {uploadedImage2 && (
                        <img
                            style={{ maxWidth: '90%', maxHeight: '65%', objectFit: 'contain' }}
                            src={uploadedImage2}
                            alt="Uploaded"
                        />
                    )}
                    {uploadedAudio2 && (
                        <audio controls>
                            <source src={uploadedAudio2} type="audio/ogg" />
                        </audio>
                    )}
                </Box>
            </Box>
            <Box
                sx={{
                    p: 2,
                    display: 'flex',
                    alignItems: 'center',
                    mb: 2,
                    flexDirection: 'column',
                }}
            >
                {questions.map((question, index) => (
                    <Box key={index} sx={{ mb: 2, width: '100%', position: 'relative' }}>
                      <TextField
                            fullWidth
                            label={`Question ${index + 1}`}
                            name={`question-${index}`}
                            value={question.content}
                            onChange={(e) => handleQuestionChange(index, 'content', e.target.value)}
                            sx={{ mb: 2 }}
                        />
                        <IconButton
                            onClick={() => removeQuestion(index)}
                            sx={{ position: 'absolute', right: 0, top: 0 }}
                        >
                            <DeleteIcon />
                        </IconButton>
                        <Select
                            value={question.type}
                            onChange={(e) => handleQuestionChange(index, 'type', e.target.value as string)}
                            fullWidth
                            sx={{ mb: 2 }}
                        >
                            <MenuItem value="filling">Filling</MenuItem>
                            <MenuItem value="multiplechoice">Multiple Choice</MenuItem>
                        </Select>
                        {question.type === 'multiplechoice' && renderChoices(index)}
                        <TextField
                            fullWidth
                            label="Answer"
                            name={`answer-${index}`}
                            value={question.answer}
                            onChange={(e) => handleQuestionChange(index, 'answer', e.target.value)}
                            sx={{ mb: 2 }}
                        />
                    </Box>
                ))}
                <Button variant="contained" onClick={addQuestion} sx={{ mb: 2 }}>
                    Add Question
                </Button>
                <Button variant="contained" onClick={handleSubmit}>
                    Submit
                </Button>
            </Box>
        </>
    );
}
export default Part2;
