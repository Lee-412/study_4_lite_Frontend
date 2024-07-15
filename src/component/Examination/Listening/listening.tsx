import React, { useEffect } from 'react';
import { ListeningTest } from '@/utils/postListening';
import { useState } from 'react';
import { Button, Box} from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import ListeningTabUpload from './listening.upload';
import ListeningTabEdit from './listening.edit';

export type FormDataType = {

  id: number;
  name: string;
  task1: string;
  img1: ImageType | null | File;
  audio1: ImageType | null | File;
  question1: QuestionType | null; 
  task2: string; 
  img2: ImageType | null | File;
  audio2: ImageType | null | File;
  question2: QuestionType | null;
  task3: string;
  img3: ImageType | null | File;
  audio3: ImageType | null | File;
  question3: QuestionType | null;
  task4: string;
  img4: ImageType | null | File;
  audio4: ImageType | null | File;
  question4: QuestionType | null;
  duration: number;
  type: string;
  start_date: string;
  end_date: string;
};

//change task,image,audio

export type ImageType = {
  data: {
      id: number;
      attributes: {
          name: string;
          alternativeText: string | null;
          caption: string | null;
          width: number;
          height: number;
          formats: {
              thumbnail: {
                  url: string;
              };
              small: {
                  url: string;
              };
              medium: {
                  url: string;
              };
              large: {
                  url: string;
              };
          };
          hash: string;
          ext: string;
          mime: string;
          size: number;
          url: string;
          previewUrl: string | null;
          provider: string;
          provider_metadata: any | null;
          createdAt: string;
          updatedAt: string;
      };
  }[];
};
//change task,image,audio

export type QuestionType = {
  id: number;
  type: 'multiplechoice' | 'filling';
  content: string;
  multiplechoices: IMultipleChoice[];
  fillings: IFilling[];
};

interface IFilling {
    id: number;
    correctAnswer: string;
  }
interface IMultipleChoice {
    id: number;
    content: string;
    isCorrect: boolean;
  }

export type TaskType = {
  id: number;
  task1: string,
  task2: string,
  task3: string,
  task4: string,
  img1: ImageType | null;
  img2: ImageType | null;
  img3: ImageType | null;
  img4: ImageType | null;
  audio1: ImageType | null;
  audio2: ImageType | null;
  audio3: ImageType | null;
  audio4: ImageType | null;
  test: {
      data: {
          id: number,
          attributes: {
              name: string,
              Start: string,
              End: string,
              Duration: number,
              type: string,
              createdAt: string,
              updatedAt: string,
              publishedAt: string
          }
      }
  }
};
// change task,image, audio

export const ListeningTab = () => {
const [question, setQuestion] = useState('');
const [answer, setAnswer] = useState('');
const [multipleChoiceQuestion, setMultipleChoiceQuestion] = useState('');
// const [choices, setChoices] = useState<Choice[]>([{ id: 1, value: '' }]);
const [correctChoice, setCorrectChoice] = useState('');
const [audioFile, setAudioFile] = useState<File | null>(null);
const [imageFile, setImageFile] = useState<File | null>(null);
const [testId, setTestId] = useState<number | null>(null);

const [tasks, setTasks] = React.useState<TaskType[]>([]);
const [editingTask, setEditingTask] = React.useState<TaskType | null>(null);

const [openModalEditTab, setOpenModalEditTab] = React.useState(false);
const [openModalUploadTab, setOpenModalUploadTab] = React.useState(false)
const [formData, setFormData] = React.useState<FormDataType>({

  id: 0,
  name: '',
  task1: '',
  img1: null,
  audio1: null,
  question1: null,
  task2: '',
  img2: null,
  audio2: null,
  question2: null,
  task3: '',
  img3: null,
  audio3: null,
  question3: null,
  task4: '',
  img4: null,
  audio4: null,
  question4: null,
  duration: 0,
  type: 'Writing',
  start_date: '',
  end_date: '',
});

const [dataEdit, setDataEdit] = React.useState<TaskType>({
  id: 0,
  task1: '',
  task2: '',
  task3: '',
  task4: '',
  img1: null,
  img2: null,
  img3: null,
  img4: null,
  audio1: null,
  audio2: null,
  audio3: null,
  audio4: null,
  test: {
      data: {
          id: 0,
          attributes: {
              name: '',
              Start: '',
              End: '',
              Duration: 0,
              type: '',
              createdAt: '',
              updatedAt: '',
              publishedAt: ''
          }
      }
  }
})
const lt = new ListeningTest();

const handleAddTask = (type: string) => {
  setOpenModalUploadTab(true);
}

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

  // const handleAddMultipleChoice = () => {
  //   const choicesObject: { [key: string]: string } = choices.reduce((acc, choice) => {
  //     acc[`choice${choice.id}`] = choice.value;
  //     return acc;
  //   }, {} as { [key: string]: string });
  //   lt.addMultiplechoice(multipleChoiceQuestion, correctChoice, choicesObject);
  // };

  const handleRemoveQuestion = () => {
    lt.removeQuestion(question);
  };

  const handleRemoveFilling = () => {
    lt.removeFilling(question);
  };

  const handleRemoveMultipleChoice = () => {
    lt.removeMultipleChoice(multipleChoiceQuestion);
  };

  // const handleAddChoice = () => {
  //   setChoices([...choices, { id: choices.length + 1, value: '' }]);
  // };

  // const handleRemoveChoice = (id: number) => {
  //   setChoices(choices.filter(choice => choice.id !== id));
  // };

  // const handleChoiceChange = (id: number, value: string) => {
  //   setChoices(choices.map(choice => (choice.id === id ? { ...choice, value } : choice)));
  // };

  const handleAddRelationTest = async () => {
    if (testId) {
      await lt.addRelationTest(testId);
    }
  };

  const handleSubmitForm = async () => {
    const response = await lt.submitForm();
    console.log(response);
  };

  const handleEditTask = (task: TaskType, id: number) => {
    console.log(task);
    setDataEdit(task);
    console.log(dataEdit);
    setOpenModalEditTab(true);

};
const fetchTasks = async () => {
  try {

      const testsRes = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_LINK_API_URL}/tests?populate=*`, { cache: "no-store" });
      const dataTests = await testsRes.json();
      console.log(dataTests);

      const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_LINK_API_URL}/wrtings?populate=*`, { cache: "no-store" });
      const data = await response.json();
      console.log(data);

      setTasks(data.data.map((item: any) => ({
          id: item.id,
          task1: item.attributes.task1,
          task2: item.attributes.task2,
          task3: item.attributes.task3,
          task4: item.attributes.task4,
          img1: item.attributes.img1,
          img2: item.attributes.img2,
          img3: item.attributes.img3,
          img4: item.attributes.img4,
          audio1: item.attributes.audio1,
          audio2: item.attributes.audio2,
          audio3: item.attributes.audio3,
          audio4: item.attributes.audio4,
          test: item.attributes.test
      })));
      console.log(tasks);


  } catch (error) {
      console.error('Error fetching tasks:', error);
  }
};

useEffect(() => {
  fetchTasks();
}, []);

const handleDeleteTask = async (taskId: number) => {
  try {

      if (!window.confirm("Muốn xoá thật không")) return;

      console.log(taskId);


      const taskResponse = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_LINK_API_URL}/wrtings/${taskId}?populate=*`, {
          headers: {
              'Content-Type': 'application/json',
          },
      });

      if (!taskResponse.ok) {
          throw new Error('Failed to fetch the wrting task');
      }

      const taskData = await taskResponse.json();
      const testId = taskData.data.attributes.test.data.id;

      const deleteWrtingResponse = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_LINK_API_URL}/wrtings/${taskId}`, {
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/json',
          },
      });

      if (!deleteWrtingResponse.ok) {
          throw new Error('Failed to delete the wrting task');
      }

      const deleteTestResponse = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_LINK_API_URL}/tests/${testId}`, {
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/json',
          },
      });

      if (!deleteTestResponse.ok) {
          throw new Error('Failed to delete the test');
      }


      setTasks(tasks.filter(task => task.id !== taskId));

      const data = await deleteTestResponse.json();
      console.log('Task and associated test deleted successfully:', data);

  } catch (error) {
      console.error('Error deleting task and associated test:', error);
  }
};
// fix the api 


  return (
    <Box>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>

        </Box>
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Task Title</TableCell>

                        <TableCell
                            sx={{
                                display: 'flex',
                            }}>
                            <span>Start Date</span>
                            {/* <Button sx={{
                                width: '1px',

                            }} onClick={handleSortTasks}>
                                <SwapVertIcon />
                            </Button> */}
                        </TableCell>
                        <TableCell>End Date</TableCell>
                        {/* <TableCell>Task 1</TableCell>
                        <TableCell>Task 2</TableCell>
                        <TableCell>Task 3</TableCell>
                        <TableCell>Task 4</TableCell> */}
                        <TableCell>Actions</TableCell>
                        <TableCell>
                            <Button sx={{ flexWrap: 'nowrap', textWrap: 'nowrap' }} variant="contained" onClick={() => handleAddTask('task1')}>
                                Add new Task
                            </Button>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {tasks.map((task, index) => (
                            task.test.data ? (
                                <TableRow key={task.id}>
                                    <TableCell>{task.test.data.attributes.name}</TableCell>
                                    <TableCell>{task.test.data.attributes.Start}</TableCell>
                                    <TableCell>{task.test.data.attributes.End}</TableCell>
                                    <TableCell>{task.task1}</TableCell>
                                    <TableCell>{task.task2}</TableCell>
                                    <TableCell>
                                        <IconButton onClick={() => handleEditTask(task, task.id)}>
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton onClick={() => handleDeleteTask(task.id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ) : null
                        ))}
                </TableBody>
            </Table>
        </TableContainer>
        <ListeningTabUpload
            formData={formData}
            setFormData={setFormData}
            setOpenModalUploadTab={setOpenModalUploadTab}
            openModalUploadTab={openModalUploadTab}
            fetchTasks={fetchTasks}
        />
        <ListeningTabEdit
            dataEdit={dataEdit}
            setDataEdit={setDataEdit}
            formData={formData}
            setFormData={setFormData}
            setOpenModalEditTab={setOpenModalEditTab}
            openModalEditTab={openModalEditTab}
            fetchTasks={fetchTasks}
        />
      </Box>  
    );
};


    // <Container>
    //   <Typography variant="h4" component="h1" gutterBottom>Edit Test</Typography>
    //     <Box>
    //         <h1> Task 1</h1>
    //         <Box sx={{ mb: 2 }}>
    //             <Button variant="contained" component="label">
    //             Upload Audio
    //             <input type="file" hidden onChange={(e) => setAudioFile(e.target.files?.[0] || null)} />
    //             </Button>
    //             <Button variant="contained" color="primary" onClick={handleAddAudio}>Add Audio</Button>
    //         </Box>
    //         <Box sx={{ mb: 2 }}>
    //             <Button variant="contained" component="label">
    //             Upload Image
    //             <input type="file" hidden onChange={(e) => setImageFile(e.target.files?.[0] || null)} />
    //             </Button>
    //             <Button variant="contained" color="primary" onClick={handleAddImage}>Add Image</Button>
    //         </Box>
    //         <Box sx={{ mb: 2 }}>
    //             <TextField label="Question" fullWidth value={question} onChange={(e) => setQuestion(e.target.value)} />
    //             <Button variant="contained" color="primary" onClick={handleAddQuestion}>Add Question</Button>
    //             <Button variant="outlined" color="error" onClick={handleRemoveQuestion}>Remove Question</Button>
    //         </Box>
    //         <Box sx={{ mb: 2 }}>
    //             <TextField label="Filling Question" fullWidth value={question} onChange={(e) => setQuestion(e.target.value)} />
    //             <TextField label="Answer" fullWidth value={answer} onChange={(e) => setAnswer(e.target.value)} />
    //             <Button variant="contained" color="primary" onClick={handleAddFilling}>Add Filling</Button>
    //             <Button variant="outlined" color="error" onClick={handleRemoveFilling}>Remove Filling</Button>
    //         </Box>
    //         <Box sx={{ mb: 2 }}>
    //             <TextField label="Multiple Choice Question" fullWidth value={multipleChoiceQuestion} onChange={(e) => setMultipleChoiceQuestion(e.target.value)} />
    //             {choices.map((choice, index) => (
    //             <Box key={choice.id} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
    //                 <TextField
    //                 label={`Choice ${choice.id}`}
    //                 fullWidth
    //                 value={choice.value}
    //                 onChange={(e) => handleChoiceChange(choice.id, e.target.value)}
    //                 />
    //                 <IconButton color="error" onClick={() => handleRemoveChoice(choice.id)}>
    //                 <RemoveIcon />
    //                 </IconButton>
    //             </Box>
    //             ))}
    //             <Button variant="contained" color="secondary" onClick={handleAddChoice}>
    //             <AddIcon /> Add Choice
    //             </Button>
    //             <TextField label="Correct Choice" fullWidth value={correctChoice} onChange={(e) => setCorrectChoice(e.target.value)} />
    //             <Button variant="contained" color="primary" onClick={handleAddMultipleChoice}>Add Multiple Choice</Button>
    //             <Button variant="outlined" color="error" onClick={handleRemoveMultipleChoice}>Remove Multiple Choice</Button>
    //         </Box>
    //         <Box sx={{ mb: 2 }}>
    //             <TextField label="Test ID" fullWidth type="number" value={testId ?? ''} onChange={(e) => setTestId(Number(e.target.value))} />
    //             <Button variant="contained" color="primary" onClick={handleAddRelationTest}>Add Relation Test</Button>
    //         </Box>
    //         <Button variant="contained" color="secondary" onClick={handleSubmitForm}>Submit Form</Button>
    //     </Box>
    //     <Box>
    //         <h1> Task 2</h1>
    //         <Box sx={{ mb: 2 }}>
    //             <Button variant="contained" component="label">
    //             Upload Audio
    //             <input type="file" hidden onChange={(e) => setAudioFile(e.target.files?.[0] || null)} />
    //             </Button>
    //             <Button variant="contained" color="primary" onClick={handleAddAudio}>Add Audio</Button>
    //         </Box>
    //         <Box sx={{ mb: 2 }}>
    //             <Button variant="contained" component="label">
    //             Upload Image
    //             <input type="file" hidden onChange={(e) => setImageFile(e.target.files?.[0] || null)} />
    //             </Button>
    //             <Button variant="contained" color="primary" onClick={handleAddImage}>Add Image</Button>
    //         </Box>
    //         <Box sx={{ mb: 2 }}>
    //             <TextField label="Question" fullWidth value={question} onChange={(e) => setQuestion(e.target.value)} />
    //             <Button variant="contained" color="primary" onClick={handleAddQuestion}>Add Question</Button>
    //             <Button variant="outlined" color="error" onClick={handleRemoveQuestion}>Remove Question</Button>
    //         </Box>
    //         <Box sx={{ mb: 2 }}>
    //             <TextField label="Filling Question" fullWidth value={question} onChange={(e) => setQuestion(e.target.value)} />
    //             <TextField label="Answer" fullWidth value={answer} onChange={(e) => setAnswer(e.target.value)} />
    //             <Button variant="contained" color="primary" onClick={handleAddFilling}>Add Filling</Button>
    //             <Button variant="outlined" color="error" onClick={handleRemoveFilling}>Remove Filling</Button>
    //         </Box>
    //         <Box sx={{ mb: 2 }}>
    //             <TextField label="Multiple Choice Question" fullWidth value={multipleChoiceQuestion} onChange={(e) => setMultipleChoiceQuestion(e.target.value)} />
    //             {choices.map((choice, index) => (
    //             <Box key={choice.id} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
    //                 <TextField
    //                 label={`Choice ${choice.id}`}
    //                 fullWidth
    //                 value={choice.value}
    //                 onChange={(e) => handleChoiceChange(choice.id, e.target.value)}
    //                 />
    //                 <IconButton color="error" onClick={() => handleRemoveChoice(choice.id)}>
    //                 <RemoveIcon />
    //                 </IconButton>
    //             </Box>
    //             ))}
    //             <Button variant="contained" color="secondary" onClick={handleAddChoice}>
    //             <AddIcon /> Add Choice
    //             </Button>
    //             <TextField label="Correct Choice" fullWidth value={correctChoice} onChange={(e) => setCorrectChoice(e.target.value)} />
    //             <Button variant="contained" color="primary" onClick={handleAddMultipleChoice}>Add Multiple Choice</Button>
    //             <Button variant="outlined" color="error" onClick={handleRemoveMultipleChoice}>Remove Multiple Choice</Button>
    //         </Box>
    //         <Box sx={{ mb: 2 }}>
    //             <TextField label="Test ID" fullWidth type="number" value={testId ?? ''} onChange={(e) => setTestId(Number(e.target.value))} />
    //             <Button variant="contained" color="primary" onClick={handleAddRelationTest}>Add Relation Test</Button>
    //         </Box>
    //         <Button variant="contained" color="secondary" onClick={handleSubmitForm}>Submit Form</Button>
    //     </Box>
    // </Container>
