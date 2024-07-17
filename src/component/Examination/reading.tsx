
import React from 'react';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { Box, Button, TextField, Typography, Container, Select, MenuItem, FormControlLabel, Checkbox, Grid } from '@mui/material';
import { readingTest } from '@/utils/postReading';
import { createTest } from '@/utils/api';

export type FormDataReading = {
  name: string;
  start: string;
  end: string;
  duration: number;
  type: string;
  passages: {
    content: string;
    imgFile: File | null; // Updated type for imgFile to File | null
    questionair: string;
    questions: {
      type: string;
      content: string;
      choices?: { content: string; isCorrect: boolean }[];
      fillings?: string[];
    }[];
  }[];
};

export const ReadingTab: React.FC = () => {
  const { control, handleSubmit, watch, setValue } = useForm<FormDataReading>({
    defaultValues: {
      name: '',
      start: new Date().toISOString().split('T')[0],
      end: new Date().toISOString().split('T')[0],
      duration: 0,
      type: 'Reading',
      passages: Array(3).fill({
        content: '',
        imgFile: null, // Initialize imgFile to null
        questionair: '',
        questions: []
      })
    }
  });

  const { fields: passagesFields } = useFieldArray({
    control,
    name: 'passages'
  });

  const addQuestion = (passageIndex: number) => {
    const updatedPassages = [...watch('passages')];
    updatedPassages[passageIndex].questions.push({ type: 'multiplechoice', content: '', choices: [], fillings: [] });
    setValue('passages', updatedPassages);
  };

  const removeQuestion = (passageIndex: number, questionIndex: number) => {
    const updatedPassages = [...watch('passages')];
    updatedPassages[passageIndex].questions.splice(questionIndex, 1);
    setValue('passages', updatedPassages);
  };

  const addMultipleChoiceOption = (passageIndex: number, questionIndex: number) => {
    const updatedPassages = [...watch('passages')];
    updatedPassages[passageIndex].questions[questionIndex].choices?.push({ content: '', isCorrect: false });
    setValue('passages', updatedPassages);
  };

  const removeMultipleChoiceOption = (passageIndex: number, questionIndex: number, choiceIndex: number) => {
    const updatedPassages = [...watch('passages')];
    updatedPassages[passageIndex].questions[questionIndex].choices?.splice(choiceIndex, 1);
    setValue('passages', updatedPassages);
  };

  const addFilling = (passageIndex: number, questionIndex: number) => {
    const updatedPassages = [...watch('passages')];
    updatedPassages[passageIndex].questions[questionIndex].fillings?.push('');
    setValue('passages', updatedPassages);
  };

  const removeFilling = (passageIndex: number, questionIndex: number, fillingIndex: number) => {
    const updatedPassages = [...watch('passages')];
    updatedPassages[passageIndex].questions[questionIndex].fillings?.splice(fillingIndex, 1);
    setValue('passages', updatedPassages);
  };

  const onSubmit = async (data: FormDataReading) => {
    const saData = JSON.parse(JSON.stringify(data));
    console.log('Form Data:', saData);

    try {

      const testID = await createTest(data);

      const rt = new readingTest();

      for (let i = 0; i < data.passages.length; i++) {
        const passage = data.passages[i];

        rt.addParagraph(passage.content);
        if (passage.imgFile) {
          await rt.addImage(passage.imgFile); // Assuming addImage method in readingTest class
        }

        rt.addQuestionair(passage.questionair);

        for (let j = 0; j < passage.questions.length; j++) {
          const question = passage.questions[j];
          let acc = {};
          if (question.type === 'multiplechoice') {
            const choices = question.choices?.map((choice, index) => {
              const item = {
                [String.fromCharCode(65 + index)]: choice.content
              };
              acc = { ...acc, ...item };
            });

            console.log('acc:', acc);

            const correctChoice = question.choices?.find(choice => choice.isCorrect)?.content;

            rt.addMultiplechoiceQuestion(question.content, acc, correctChoice);
          } else if (question.type === 'filling') {
            question.fillings?.forEach((filling) => {

              rt.addFillingQuestion(question.content, filling);
            });
          }
        }
      }

      await rt.addRelationTest(testID); // Assuming 0 is a placeholder, change as needed
      await rt.submitForm();

      console.log('Reading Test created successfully');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h4" gutterBottom>
          Reading Test
        </Typography>
        <Box mb={2}>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="Test Name" fullWidth required />
            )}
          />
        </Box>
        <Box mb={2}>
          <Controller
            name="start"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="Start Date" type="date" fullWidth required />
            )}
          />
        </Box>
        <Box mb={2}>
          <Controller
            name="end"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="End Date" type="date" fullWidth required />
            )}
          />
        </Box>
        <Box mb={2}>
          <Controller
            name="duration"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="Duration (minutes)" type="number" fullWidth required />
            )}
          />
        </Box>
        <Box mb={2}>
          <Typography variant="subtitle1" gutterBottom>
            Type: {watch('type')}
          </Typography>
        </Box>
        {passagesFields.map((passage, passageIndex) => (
          <Box key={passageIndex} mb={4} p={2} border={1} borderRadius={5} borderColor="grey.300">
            <Typography variant="h6" gutterBottom>
              Passage {passageIndex + 1}
            </Typography>
            <Controller
              name={`passages.${passageIndex}.questionair`}
              control={control}
              render={({ field }) => (
                <TextField {...field} label="Questionair" fullWidth multiline rows={4} />
              )}
            />
            <Box mt={2}>
              <Controller
                name={`passages.${passageIndex}.content`}
                control={control}
                render={({ field }) => (
                  <TextField {...field} label="Content" fullWidth multiline rows={4} />
                )}
              />
            </Box>
            <Box mt={2}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={6}>
                  <input
                    accept="image/*"
                    id={`passage-${passageIndex}-image-upload`}
                    type="file"
                    onChange={(e) => {
                      const file = e.target.files && e.target.files[0];
                      setValue(`passages.${passageIndex}.imgFile`, file || null);
                    }}
                    style={{ display: 'none' }}
                  />
                  <label htmlFor={`passage-${passageIndex}-image-upload`}>
                    <Button variant="contained" color="primary" component="span">
                      Upload Image
                    </Button>
                  </label>
                </Grid>
                <Grid item xs={6}>
                  {watch(`passages.${passageIndex}.imgFile`) && (
                    <img
                      src={URL.createObjectURL(watch(`passages.${passageIndex}.imgFile`))}
                      alt="Uploaded"
                      style={{ maxWidth: '100px', maxHeight: '100px', marginLeft: '10px' }}
                    />
                  )}
                </Grid>
              </Grid>
            </Box>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => addQuestion(passageIndex)}
              style={{ borderColor: 'blue', marginTop: '10px' }}
            >
              Add Question
            </Button>
            {watch(`passages.${passageIndex}.questions`).map((question, questionIndex) => (
              <Box key={questionIndex} mt={2} p={2} border={1} borderRadius={5} borderColor="grey.300">
                <Typography variant="subtitle1" gutterBottom>
                  Question {questionIndex + 1}
                </Typography>
                <Controller
                  name={`passages.${passageIndex}.questions.${questionIndex}.content`}
                  control={control}
                  render={({ field }) => (
                    <TextField {...field}
                      label="Question Content"
                      fullWidth
                      multiline
                      rows={2}
                    />
                  )}
                />
                <Controller
                  name={`passages.${passageIndex}.questions.${questionIndex}.type`}
                  control={control}
                  render={({ field }) => (
                    <Select {...field} label="Question Type" fullWidth>
                      <MenuItem value="multiplechoice">Multiple Choice</MenuItem>
                      <MenuItem value="filling">Filling</MenuItem>
                    </Select>
                  )}
                />
                {question.type === 'multiplechoice' && (
                  <Box mt={2}>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => addMultipleChoiceOption(passageIndex, questionIndex)}
                      style={{ borderColor: 'blue', marginBottom: '10px' }}
                    >
                      Add Option
                    </Button>
                    {question.choices?.map((choice, choiceIndex) => (
                      <Box key={choiceIndex} mt={2} p={2} border={1} borderRadius={5} borderColor="grey.300">
                        <Controller
                          name={`passages.${passageIndex}.questions.${questionIndex}.choices.${choiceIndex}.content`}
                          control={control}
                          render={({ field }) => (
                            <TextField {...field} label={`Option ${choiceIndex + 1}`} fullWidth />
                          )}
                        />
                        <FormControlLabel
                          control={
                            <Controller
                              name={`passages.${passageIndex}.questions.${questionIndex}.choices.${choiceIndex}.isCorrect`}
                              control={control}
                              render={({ field }) => (
                                <Checkbox {...field} color="primary" />
                              )}
                            />
                          }
                          label="Correct"
                        />
                        <Button
                          variant="outlined"
                          color="secondary"
                          onClick={() => removeMultipleChoiceOption(passageIndex, questionIndex, choiceIndex)}
                          style={{ borderColor: 'red', marginLeft: '10px' }}
                        >
                          Remove Option
                        </Button>
                      </Box>
                    ))}
                  </Box>
                )}
                {question.type === 'filling' && (
                  <Box mt={2}>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => addFilling(passageIndex, questionIndex)}
                      style={{ borderColor: 'blue', marginBottom: '10px' }}
                    >
                      Add Filling
                    </Button>
                    {question.fillings?.map((filling, fillingIndex) => (
                      <Box key={fillingIndex} mt={2} p={2} border={1} borderRadius={5} borderColor="grey.300">
                        <Controller
                          name={`passages.${passageIndex}.questions.${questionIndex}.fillings.${fillingIndex}`}
                          control={control}
                          render={({ field }) => (
                            <TextField {...field} label={`Filling ${fillingIndex + 1}`} fullWidth />
                          )}
                        />
                        <Button
                          variant="outlined"
                          color="secondary"
                          onClick={() => removeFilling(passageIndex, questionIndex, fillingIndex)}
                          style={{ borderColor: 'red', marginLeft: '10px' }}
                        >
                          Remove Filling
                        </Button>
                      </Box>
                    ))}
                  </Box>
                )}
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => removeQuestion(passageIndex, questionIndex)}
                  style={{ borderColor: 'red', marginTop: '10px' }}
                >
                  Remove Question
                </Button>
              </Box>
            ))}
          </Box>
        ))}
        <Button variant="contained" color="primary" type="submit" fullWidth>
          Submit
        </Button>
      </form>
    </Container>
  );
};

