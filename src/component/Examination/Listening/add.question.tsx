import React, { useState, useEffect, useRef } from 'react';
import { Box, Button, TextField, IconButton, Select, MenuItem } from '@mui/material';
import { RemoveCircleOutline, AddCircleOutline } from '@mui/icons-material';
import { FormDataType } from './listening';

interface QuestionFormData {
    part: number;
    question: any[];
    formData: FormDataType;
    setFormData: (formData: FormDataType) => void;
}

const QuestionForm = (props: QuestionFormData) => {
    const { part, question, formData, setFormData } = props;
    const [questions, setQuestions] = useState(question || []);
    const [questionType, setQuestionType] = useState('');

    useEffect(() => {

        if (part == 1) {
            setFormData({
                ...formData,
                questions1: questions
            })
        }
        if (part == 2) {
            setFormData({
                ...formData,
                questions2: questions
            })
        }
        if (part == 3) {
            setFormData({
                ...formData,
                questions3: questions
            })
        }
        if (part == 4) {
            setFormData({
                ...formData,
                questions4: questions
            })
        }


    }, [questions, setFormData]);

    const handleQuestionTypeChange = (event: any) => {
        setQuestionType(event.target.value as string);
    };

    const handleAddQuestion = () => {
        setQuestions([...questions, { type: questionType, question: '', choices: [], correctChoice: '' }]);
    };

    const handleQuestionChange = (index: number, field: string, value: any) => {
        const newQuestions = questions.map((ques, i) =>
            i === index ? { ...ques, [field]: value } : ques
        );
        setQuestions(newQuestions);
    };

    const handleAddChoice = (index: number) => {
        const newQuestions = questions.map((ques, i) =>
            i === index ? { ...ques, choices: [...ques.choices, ''] } : ques
        );
        setQuestions(newQuestions);
    };

    const handleRemoveChoice = (questionIndex: number, choiceIndex: number) => {
        const newQuestions = questions.map((ques, i) =>
            i === questionIndex ? {
                ...ques,
                choices: ques.choices.filter((_: any, j: number) => j !== choiceIndex)
            } : ques
        );
        setQuestions(newQuestions);
    };

    const handleChoiceChange = (questionIndex: number, choiceIndex: number, value: string) => {
        const newQuestions = questions.map((ques, i) =>
            i === questionIndex ? {
                ...ques,
                choices: ques.choices.map((choice: any, j: number) =>
                    j === choiceIndex ? value : choice
                )
            } : ques
        );
        setQuestions(newQuestions);
    };

    const handleRemoveQuestion = (index: number) => {
        const newQuestions = questions.filter((_, i) => i !== index);
        setQuestions(newQuestions);
    };

    return (
        <Box>

            <>
                {questions.map((ques, index) => (
                    <Box key={index} sx={{ mb: 2, padding: '10px', border: '1px solid #ddd' }}>
                        <TextField
                            fullWidth
                            label={`Question ${index + 1}`}
                            value={ques.question}
                            onChange={(e: any) => handleQuestionChange(index, 'question', e.target.value)}
                            sx={{ mb: 2 }}
                        />

                        {ques.type === 'filling' && (
                            <>
                                <TextField
                                    fullWidth
                                    label="Answer"
                                    value={ques.answer || ''}
                                    onChange={(e: any) => handleQuestionChange(index, 'answer', e.target.value)}
                                    sx={{ mb: 2 }}
                                />
                            </>
                        )}

                        {ques.type === 'multiple choice' && (
                            <>
                                {ques.choices.map((choice: any, choiceIndex: any) => (
                                    <Box key={choiceIndex} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                        <TextField
                                            fullWidth
                                            label={`Choice ${choiceIndex + 1}`}
                                            value={choice}
                                            onChange={(e: any) => handleChoiceChange(index, choiceIndex, e.target.value)}
                                            sx={{ marginRight: 1 }}
                                        />
                                        <IconButton onClick={() => handleRemoveChoice(index, choiceIndex)} color="error">
                                            <RemoveCircleOutline />
                                        </IconButton>
                                    </Box>
                                ))}
                                <Button variant="outlined"
                                    onClick={() => handleAddChoice(index)}
                                    sx={{ mb: 2 }}>
                                    Add Choice
                                </Button>
                                <TextField
                                    fullWidth
                                    label="Correct Choice"
                                    value={ques.correctChoice || ''}
                                    onChange={(e: any) => handleQuestionChange(index, 'correctChoice', e.target.value)}
                                    sx={{ mb: 2 }}
                                />
                            </>
                        )}

                        <IconButton onClick={() => handleRemoveQuestion(index)} color="error">
                            <RemoveCircleOutline />
                        </IconButton>
                    </Box>
                ))}

                <Select
                    label="Question Type"
                    value={questionType}
                    onChange={handleQuestionTypeChange}
                    sx={{ mb: 2, width: '100%' }}
                >
                    <MenuItem value="filling">Filling</MenuItem>
                    <MenuItem value="multiple choice">Multiple Choice</MenuItem>
                </Select>

                <Button variant="contained" onClick={handleAddQuestion} sx={{ mb: 2 }}>
                    Add Question
                </Button>
            </>

        </Box>
    );
};

export default QuestionForm;
