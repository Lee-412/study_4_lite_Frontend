import React from 'react';
import { useForm, Controller, useFieldArray, Control } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { Box, Button, TextField, Typography, Container, Grid, FormControlLabel, Checkbox, Select, MenuItem } from '@mui/material';


interface IMultipleChoice {
  id: number;
  content: string;
  isCorrect: boolean;
}

interface IFilling {
  id: number;
  correctAnswer: string;
}

interface IQuestion {
  id: number;
  type: 'multiplechoice' | 'filling';
  content: string;
  multiplechoices: IMultipleChoice[];
  fillings: IFilling[];
}

interface IPassage {
  id: number;
  order: number;
  content: string;
  img: string;
  questions: IQuestion[];
}

interface ITest {
  id: number;
  name: string;
  start: Date;
  end: Date;
  duration: number;
  type: string;
  passages: IPassage[];
}

export const ReadingTab: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { control, handleSubmit, watch, setValue } = useForm<ITest>({
    defaultValues: {
      id: 0,
      name: '',
      start: new Date(),
      end: new Date(),
      duration: 0,
      type: '',
      passages: Array(3).fill({
        id: Math.random(),
        order: 0,
        content: '',
        img: '',
        questions: [],
      }).map((passage, index) => ({
        ...passage,
        order: index + 1,
      })),
    },
  });

  const { fields: passagesFields, append: appendPassage } = useFieldArray({
    control,
    name: 'passages'
  });

  const addQuestion = (passageIndex: number) => {
    const newQuestion: IQuestion = {
      id: Math.random(),
      type: 'multiplechoice',
      content: '',
      multiplechoices: [],
      fillings: [],
    };

    const updatedPassages = [...watch().passages];
    updatedPassages[passageIndex].questions.push(newQuestion);
    setValue('passages', updatedPassages);
  };

  const addMultipleChoice = (passageIndex: number, questionIndex: number) => {
    const newChoice: IMultipleChoice = {
      id: Math.random(),
      content: '',
      isCorrect: false,
    };

    const updatedPassages = [...watch().passages];
    updatedPassages[passageIndex].questions[questionIndex].multiplechoices.push(newChoice);
    setValue('passages', updatedPassages);
  };

  const addFilling = (passageIndex: number, questionIndex: number) => {
    const newFilling: IFilling = {
      id: Math.random(),
      correctAnswer: '',
    };

    const updatedPassages = [...watch().passages];
    updatedPassages[passageIndex].questions[questionIndex].fillings.push(newFilling);
    setValue('passages', updatedPassages);
  };

  const removeQuestion = (passageIndex: number, questionIndex: number) => {
    const updatedPassages = [...watch().passages];
    updatedPassages[passageIndex].questions.splice(questionIndex, 1);
    setValue('passages', updatedPassages);
  };

  const removeMultipleChoice = (passageIndex: number, questionIndex: number, choiceIndex: number) => {
    const updatedPassages = [...watch().passages];
    updatedPassages[passageIndex].questions[questionIndex].multiplechoices.splice(choiceIndex, 1);
    setValue('passages', updatedPassages);
  };

  const removeFilling = (passageIndex: number, questionIndex: number, fillingIndex: number) => {
    const updatedPassages = [...watch().passages];
    updatedPassages[passageIndex].questions[questionIndex].fillings.splice(fillingIndex, 1);
    setValue('passages', updatedPassages);
  };

  const renderQuestionFields = (question: IQuestion, passageIndex: number, questionIndex: number) => {
    switch (question.type) {
      case 'multiplechoice':
        return (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="subtitle1">Multiple Choice Options</Typography>
            </Grid>
            {question.multiplechoices.map((choice, choiceIndex) => (
              <Grid item xs={12} key={choice.id}>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                  <Controller
                    name={`passages.${passageIndex}.questions.${questionIndex}.multiplechoices.${choiceIndex}.content`}
                    control={control}
                    render={({ field }) => (
                      <TextField {...field} label={`Choice Content ${choiceIndex + 1}`} variant="outlined" fullWidth />
                    )}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={choice.isCorrect}
                        onChange={(e) => setValue(`passages.${passageIndex}.questions.${questionIndex}.multiplechoices.${choiceIndex}.isCorrect`, e.target.checked as boolean)}
                      />
                    }
                    label="Is Correct"
                  />
                  <Button
                    onClick={() => removeMultipleChoice(passageIndex, questionIndex, choiceIndex)}
                    variant="outlined"
                    color="error"
                  >
                    Remove
                  </Button>
                </Box>
              </Grid>
            ))}
            <Grid item xs={12}>
              <Button onClick={() => addMultipleChoice(passageIndex, questionIndex)} variant="contained">
                Add Multiple Choice Option
              </Button>
            </Grid>
          </Grid>
        );
      case 'filling':
        return (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="subtitle1">Filling Answers</Typography>
            </Grid>
            {question.fillings.map((filling, fillingIndex) => (
              <Grid item xs={12} key={filling.id}>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                  <Controller
                    name={`passages.${passageIndex}.questions.${questionIndex}.fillings.${fillingIndex}.correctAnswer`}
                    control={control}
                    render={({ field }) => (
                      <TextField {...field} label={`Correct Answer ${fillingIndex + 1}`} variant="outlined" fullWidth />
                    )}
                  />
                  <Button
                    onClick={() => removeFilling(passageIndex, questionIndex, fillingIndex)}
                    variant="outlined"
                    color="error"
                  >
                    Remove
                  </Button>
                </Box>
              </Grid>
            ))}
            <Grid item xs={12}>
              <Button onClick={() => addFilling(passageIndex, questionIndex)} variant="contained">
                Add Filling Answer
              </Button>
            </Grid>
          </Grid>
        );
      default:
        return null;
    }
  };

  const onSubmit = async (data: ITest) => {
    try {
      const response = await fetch('https://study4lite-backend.onrender.com/admin', {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      if (response.ok) {
        console.log('Test saved successfully!');
        alert('Test saved successfully!');
      } else {
        console.error('Failed to save test:', response.status);
        alert('Failed to save test.');
      }
    } catch (error) {
      console.error('Error saving test:', error);
      alert('Failed to save test.');
    }
  };
  

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>Edit Test</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        {passagesFields.map((passage, passageIndex) => (
          <Box key={passage.id} mb={4} border={1} borderColor="grey.300" borderRadius={4} p={3}>
            <Typography variant="h6" gutterBottom>Passage {passageIndex + 1}</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Controller
                  name={`passages.${passageIndex}.order`}
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} label="Order" variant="outlined" fullWidth />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name={`passages.${passageIndex}.content`}
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} label="Content" variant="outlined" fullWidth multiline rows={4} />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name={`passages.${passageIndex}.img`}
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} label="Image URL" variant="outlined" fullWidth />
                  )}
                />
              </Grid>
              {watch(`passages.${passageIndex}.questions`).map((question, questionIndex) => (
                <Box key={question.id} mb={3} border={1} borderColor="grey.200" borderRadius={4} p={2}>
                  <Typography variant="subtitle1" gutterBottom>Question {questionIndex + 1}</Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Controller
                        name={`passages.${passageIndex}.questions.${questionIndex}.content`}
                        control={control}
                        render={({ field }) => (
                          <TextField {...field} label="Question Content" variant="outlined" fullWidth />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Controller
                        name={`passages.${passageIndex}.questions.${questionIndex}.type`}
                        control={control}
                        render={({ field }) => (
                          <Select
                            {...field}
                            label="Question Type"
                            variant="outlined"
                            fullWidth
                          >
                            <MenuItem value="multiplechoice">Multiple Choice</MenuItem>
                            <MenuItem value="filling">Filling</MenuItem>
                          </Select>
                        )}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      {renderQuestionFields(question, passageIndex, questionIndex)}
                    </Grid>
                    <Grid item xs={12}>
                      <Button onClick={() => removeQuestion(passageIndex, questionIndex)} variant="outlined" color="error">
                        Remove Question
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              ))}
              <Grid item xs={12}>
                <Button onClick={() => addQuestion(passageIndex)} variant="contained">
                  Add Question
                </Button>
              </Grid>
            </Grid>
          </Box>
        ))}
        <Box mt={2}>
          <Button type="submit" variant="contained" color="primary">Save Test</Button>
        </Box>
      </form>
    </Container>
  );
}
