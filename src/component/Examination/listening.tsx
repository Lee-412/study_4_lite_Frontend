import React from 'react';
import { ListeningTest } from '@/utils/postListening';
import { useState } from 'react';
import { Container, Button, TextField, Typography, Box, IconButton } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
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

interface Choice {
    id: number;
    value: string;
}
// export const ListeningTab: React.FC = () => {
//   const { id } = useParams<{ id: string }>();
//   const { control, handleSubmit, watch, setValue } = useForm<ITest>({
//     defaultValues: {
//       id: 0,
//       name: '',
//       start: new Date(),
//       end: new Date(),
//       duration: 0,
//       type: '',
//       passages: Array(3).fill({
//         id: Math.random(),
//         order: 0,
//         content: '',
//         img: '',
//         questions: [],
//       }).map((passage, index) => ({
//         ...passage,
//         order: index + 1,
//       })),
//     },
//   });

//   const { fields: passagesFields, append: appendPassage } = useFieldArray({
//     control,
//     name: 'passages'
//   });

//   const addQuestion = (passageIndex: number) => {
//     const newQuestion: IQuestion = {
//       id: Math.random(),
//       type: 'multiplechoice',
//       content: '',
//       multiplechoices: [],
//       fillings: [],
//     };

//     const updatedPassages = [...watch().passages];
//     updatedPassages[passageIndex].questions.push(newQuestion);
//     setValue('passages', updatedPassages);
//   };

//   const addMultipleChoice = (passageIndex: number, questionIndex: number) => {
//     const newChoice: IMultipleChoice = {
//       id: Math.random(),
//       content: '',
//       isCorrect: false,
//     };

//     const updatedPassages = [...watch().passages];
//     updatedPassages[passageIndex].questions[questionIndex].multiplechoices.push(newChoice);
//     setValue('passages', updatedPassages);
//   };

//   const addFilling = (passageIndex: number, questionIndex: number) => {
//     const newFilling: IFilling = {
//       id: Math.random(),
//       correctAnswer: '',
//     };

//     const updatedPassages = [...watch().passages];
//     updatedPassages[passageIndex].questions[questionIndex].fillings.push(newFilling);
//     setValue('passages', updatedPassages);
//   };

//   const removeQuestion = (passageIndex: number, questionIndex: number) => {
//     const updatedPassages = [...watch().passages];
//     updatedPassages[passageIndex].questions.splice(questionIndex, 1);
//     setValue('passages', updatedPassages);
//   };

//   const removeMultipleChoice = (passageIndex: number, questionIndex: number, choiceIndex: number) => {
//     const updatedPassages = [...watch().passages];
//     updatedPassages[passageIndex].questions[questionIndex].multiplechoices.splice(choiceIndex, 1);
//     setValue('passages', updatedPassages);
//   };

//   const removeFilling = (passageIndex: number, questionIndex: number, fillingIndex: number) => {
//     const updatedPassages = [...watch().passages];
//     updatedPassages[passageIndex].questions[questionIndex].fillings.splice(fillingIndex, 1);
//     setValue('passages', updatedPassages);
//   };

//   const renderQuestionFields = (question: IQuestion, passageIndex: number, questionIndex: number) => {
//     switch (question.type) {
//       case 'multiplechoice':
//         return (
//           <Grid container spacing={2}>
//             <Grid item xs={12}>
//               <Typography variant="subtitle1">Multiple Choice Options</Typography>
//             </Grid>
//             {question.multiplechoices.map((choice, choiceIndex) => (
//               <Grid item xs={12} key={choice.id}>
//                 <Box display="flex" alignItems="center" justifyContent="space-between">
//                   <Controller
//                     name={`passages.${passageIndex}.questions.${questionIndex}.multiplechoices.${choiceIndex}.content`}
//                     control={control}
//                     render={({ field }) => (
//                       <TextField {...field} label={`Choice Content ${choiceIndex + 1}`} variant="outlined" fullWidth />
//                     )}
//                   />
//                   <FormControlLabel
//                     control={
//                       <Checkbox
//                         checked={choice.isCorrect}
//                         onChange={(e) => setValue(`passages.${passageIndex}.questions.${questionIndex}.multiplechoices.${choiceIndex}.isCorrect`, e.target.checked as boolean)}
//                       />
//                     }
//                     label="Is Correct"
//                   />
//                   <Button
//                     onClick={() => removeMultipleChoice(passageIndex, questionIndex, choiceIndex)}
//                     variant="outlined"
//                     color="error"
//                   >
//                     Remove
//                   </Button>
//                 </Box>
//               </Grid>
//             ))}
//             <Grid item xs={12}>
//               <Button onClick={() => addMultipleChoice(passageIndex, questionIndex)} variant="contained">
//                 Add Multiple Choice Option
//               </Button>
//             </Grid>
//           </Grid>
//         );
//       case 'filling':
//         return (
//           <Grid container spacing={2}>
//             <Grid item xs={12}>
//               <Typography variant="subtitle1">Filling Answers</Typography>
//             </Grid>
//             {question.fillings.map((filling, fillingIndex) => (
//               <Grid item xs={12} key={filling.id}>
//                 <Box display="flex" alignItems="center" justifyContent="space-between">
//                   <Controller
//                     name={`passages.${passageIndex}.questions.${questionIndex}.fillings.${fillingIndex}.correctAnswer`}
//                     control={control}
//                     render={({ field }) => (
//                       <TextField {...field} label={`Correct Answer ${fillingIndex + 1}`} variant="outlined" fullWidth />
//                     )}
//                   />
//                   <Button
//                     onClick={() => removeFilling(passageIndex, questionIndex, fillingIndex)}
//                     variant="outlined"
//                     color="error"
//                   >
//                     Remove
//                   </Button>
//                 </Box>
//               </Grid>
//             ))}
//             <Grid item xs={12}>
//               <Button onClick={() => addFilling(passageIndex, questionIndex)} variant="contained">
//                 Add Filling Answer
//               </Button>
//             </Grid>
//           </Grid>
//         );
//       default:
//         return null;
//     }
//   };

//   const onSubmit = async (data: ITest) => {
//     try {
//       const response = await fetch('https://study4lite-backend.onrender.com/admin', {
//         method: 'POST', 
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(data),
//       });
  
//       if (response.ok) {
//         console.log('Test saved successfully!');
//         alert('Test saved successfully!');
//       } else {
//         console.error('Failed to save test:', response.status);
//         alert('Failed to save test.');
//       }
//     } catch (error) {
//       console.error('Error saving test:', error);
//       alert('Failed to save test.');
//     }
//   };

export const ListeningTab = () => {
const [question, setQuestion] = useState('');
const [answer, setAnswer] = useState('');
const [multipleChoiceQuestion, setMultipleChoiceQuestion] = useState('');
const [choices, setChoices] = useState<Choice[]>([{ id: 1, value: '' }]);
const [correctChoice, setCorrectChoice] = useState('');
const [audioFile, setAudioFile] = useState<File | null>(null);
const [imageFile, setImageFile] = useState<File | null>(null);
const [testId, setTestId] = useState<number | null>(null);

const lt = new ListeningTest();

const handleAddAudio = async () => {
    if (audioFile) {
      await lt.addAudio(audioFile);
    }
  };

  const handleAddImage = async () => {
    if (imageFile) {
      await lt.addImage(imageFile);
    }
  };

  const handleAddQuestion = () => {
    lt.addQuestion(question);
  };

  const handleAddFilling = () => {
    lt.addFilling(question, answer);
  };

  const handleAddMultipleChoice = () => {
    const choicesObject: { [key: string]: string } = choices.reduce((acc, choice) => {
      acc[`choice${choice.id}`] = choice.value;
      return acc;
    }, {} as { [key: string]: string });
    lt.addMultiplechoice(multipleChoiceQuestion, correctChoice, choicesObject);
  };

  const handleRemoveQuestion = () => {
    lt.removeQuestion(question);
  };

  const handleRemoveFilling = () => {
    lt.removeFilling(question);
  };

  const handleRemoveMultipleChoice = () => {
    lt.removeMultipleChoice(multipleChoiceQuestion);
  };

  const handleAddChoice = () => {
    setChoices([...choices, { id: choices.length + 1, value: '' }]);
  };

  const handleRemoveChoice = (id: number) => {
    setChoices(choices.filter(choice => choice.id !== id));
  };

  const handleChoiceChange = (id: number, value: string) => {
    setChoices(choices.map(choice => (choice.id === id ? { ...choice, value } : choice)));
  };

  const handleAddRelationTest = async () => {
    if (testId) {
      await lt.addRelationTest(testId);
    }
  };

  const handleSubmitForm = async () => {
    const response = await lt.submitForm();
    console.log(response);
  };



  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>Edit Test</Typography>
      <Box sx={{ mb: 2 }}>
        <Button variant="contained" component="label">
          Upload Audio
          <input type="file" hidden onChange={(e) => setAudioFile(e.target.files?.[0] || null)} />
        </Button>
        <Button variant="contained" color="primary" onClick={handleAddAudio}>Add Audio</Button>
      </Box>
      <Box sx={{ mb: 2 }}>
        <Button variant="contained" component="label">
          Upload Image
          <input type="file" hidden onChange={(e) => setImageFile(e.target.files?.[0] || null)} />
        </Button>
        <Button variant="contained" color="primary" onClick={handleAddImage}>Add Image</Button>
      </Box>
      <Box sx={{ mb: 2 }}>
        <h2>Question</h2>
        <TextField label="Question" fullWidth value={question} onChange={(e) => setQuestion(e.target.value)} />
        <Button variant="contained" color="primary" onClick={handleAddQuestion}>Add Question</Button>
        <Button variant="outlined" color="error" onClick={handleRemoveQuestion}>Remove Question</Button>
      </Box>
      <Box sx={{ mb: 2 }}>
        <TextField label="Filling Question" fullWidth value={question} onChange={(e) => setQuestion(e.target.value)} />
        <TextField label="Answer" fullWidth value={answer} onChange={(e) => setAnswer(e.target.value)} />
        <Button variant="contained" color="primary" onClick={handleAddFilling}>Add Filling</Button>
        <Button variant="outlined" color="error" onClick={handleRemoveFilling}>Remove Filling</Button>
      </Box>
      <Box sx={{ mb: 2 }}>
        <TextField label="Multiple Choice Question" fullWidth value={multipleChoiceQuestion} onChange={(e) => setMultipleChoiceQuestion(e.target.value)} />
        {choices.map((choice, index) => (
          <Box key={choice.id} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <TextField
              label={`Choice ${choice.id}`}
              fullWidth
              value={choice.value}
              onChange={(e) => handleChoiceChange(choice.id, e.target.value)}
            />
            <IconButton color="error" onClick={() => handleRemoveChoice(choice.id)}>
              <RemoveIcon />
            </IconButton>
          </Box>
        ))}
        <Button variant="contained" color="secondary" onClick={handleAddChoice}>
          <AddIcon /> Add Choice
        </Button>
        <TextField label="Correct Choice" fullWidth value={correctChoice} onChange={(e) => setCorrectChoice(e.target.value)} />
        <Button variant="contained" color="primary" onClick={handleAddMultipleChoice}>Add Multiple Choice</Button>
        <Button variant="outlined" color="error" onClick={handleRemoveMultipleChoice}>Remove Multiple Choice</Button>
      </Box>
      <Box sx={{ mb: 2 }}>
        <TextField label="Test ID" fullWidth type="number" value={testId ?? ''} onChange={(e) => setTestId(Number(e.target.value))} />
        <Button variant="contained" color="primary" onClick={handleAddRelationTest}>Add Relation Test</Button>
      </Box>
      <Button variant="contained" color="secondary" onClick={handleSubmitForm}>Submit Form</Button>
    </Container>
  );
};
