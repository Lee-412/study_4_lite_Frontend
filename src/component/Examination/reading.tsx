import React from 'react';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { Box, Button, TextField, Typography, Container, Grid, FormControlLabel, Checkbox, Select, MenuItem } from '@mui/material';

interface IMultipleChoice {
  id: number;
  content: string;
  isCorrect: boolean;
  question: IQuestion;
}

interface IFilling {
  id: number;
  correctAnswer: string;
  question: IQuestion;
}

interface IQuestion {
  id: number;
  type: string;
  content: string;
  passage: IPassage;
  multiplechoices: IMultipleChoice[];
  fillings: IFilling[];
}

interface IPassage {
  id: number;
  order: number;
  content: string;
  img: string;
  test: ITest;
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
  const { control, handleSubmit, watch } = useForm<ITest>({
    defaultValues: {
      id: 0,
      name: '',
      start: new Date(),
      end: new Date(),
      duration: 0,
      type: 'Reading',
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

  const { fields: passagesFields, append: appendPassage, remove: removePassage } = useFieldArray({
    control,
    name: 'passages'
  });

  const addQuestion = (passageIndex: number) => {
    const passage = watch(`passages.${passageIndex}`);
    passage.questions.push({
      id: Math.random(),
      type: '',
      content: '',
      multiplechoices: [],
      fillings: []
    });
  };

  const removeQuestion = (passageIndex: number, questionIndex: number) => {
    const passage = watch(`passages.${passageIndex}`);
    passage.questions.splice(questionIndex, 1);
  };

  const addMultipleChoice = (passageIndex: number, questionIndex: number) => {
    const question = watch(`passages.${passageIndex}.questions.${questionIndex}`);
    question.multiplechoices.push({
      id: Math.random(),
      content: '',
      isCorrect: false
    });
  };

  const removeMultipleChoice = (passageIndex: number, questionIndex: number, choiceIndex: number) => {
    const question = watch(`passages.${passageIndex}.questions.${questionIndex}`);
    question.multiplechoices.splice(choiceIndex, 1);
  };

  const addFilling = (passageIndex: number, questionIndex: number) => {
    const question = watch(`passages.${passageIndex}.questions.${questionIndex}`);
    question.fillings.push({
      id: Math.random(),
      correctAnswer: ''
    });
  };

  const removeFilling = (passageIndex: number, questionIndex: number, fillingIndex: number) => {
    const question = watch(`passages.${passageIndex}.questions.${questionIndex}`);
    question.fillings.splice(fillingIndex, 1);
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
                <Controller
                  name={`passages.${passageIndex}.questions.${questionIndex}.multiplechoices.${choiceIndex}.content`}
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} label={`Choice Content ${choiceIndex + 1}`} variant="outlined" fullWidth />
                  )}
                />
                <Controller
                  name={`passages.${passageIndex}.questions.${questionIndex}.multiplechoices.${choiceIndex}.isCorrect`}
                  control={control}
                  render={({ field }) => (
                    <FormControlLabel
                      control={<Checkbox {...field} checked={field.value} />}
                      label="Is Correct"
                    />
                  )}
                />
                <Button onClick={() => removeMultipleChoice(passageIndex, questionIndex, choiceIndex)} variant="contained" color="secondary">
                  Remove Multiple Choice Option
                </Button>
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
                <Controller
                  name={`passages.${passageIndex}.questions.${questionIndex}.fillings.${fillingIndex}.correctAnswer`}
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} label={`Correct Answer ${fillingIndex + 1}`} variant="outlined" fullWidth />
                  )}
                />
                <Button onClick={() => removeFilling(passageIndex, questionIndex, fillingIndex)} variant="contained" color="secondary">
                  Remove Filling Answer
                </Button>
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
      console.log('Saving test data:', data);

      // Create the test
      const testResponse = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_LINK_API_URL}/tests`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          data: {
            name: data.name,
            Start: data.start.toISOString(),
            End: data.end.toISOString(),
            Duration: data.duration,
            type: 'Reading',
          }
        }),
      });

      if (!testResponse.ok) {
        throw new Error('Failed to create test');
      }

      const testData = await testResponse.json();
      const testId = testData.data.id;

      // Create passages and questions
      for (const passage of data.passages) {
        const passageResponse = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_LINK_API_URL}/passages`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            data: {
              order: passage.order,
              content: passage.content,
              img: passage.img,
              test: testId,
            }
          }),
        });

        if (!passageResponse.ok) {
          throw new Error('Failed to create passage');
        }

        const passageData = await passageResponse.json();
        const passageId = passageData.data.id;

        for (const question of passage.questions) {
          const questionResponse = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_LINK_API_URL}/questions`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              data: {
                type: question.type,
                content: question.content,
                passage: passageId,
              }
            }),
          });

          if (!questionResponse.ok) {
            throw new Error('Failed to create question');
          }

          const questionData = await questionResponse.json();
          const questionId = questionData.data.id;

          if (question.type === 'multiplechoice') {
            for (const choice of question.multiplechoices) {
              await fetch(`${process.env.NEXT_PUBLIC_STRAPI_LINK_API_URL}/multiplechoices`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  data: {
                    content: choice.content,
                    isCorrect: choice.isCorrect,
                    question: questionId,
                  }
                }),
              });
            }
          } else if (question.type === 'filling') {
            for (const filling
