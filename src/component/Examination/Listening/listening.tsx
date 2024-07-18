import React, { useEffect } from 'react';
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
import { ListeningTest } from '@/utils/postListening';
import { Form } from 'react-hook-form';
import test from 'node:test';

export type FormDataType = {

  id: number;
  name: string;
  task1: string;
  img1: ImageType | null | File;
  audio1: ImageType | null | File;
  question1: QuestionType[] | null;
  task2: string; 
  img2: ImageType | null | File;
  audio2: ImageType | null | File;
  question2: QuestionType[] | null;
  task3: string;
  img3: ImageType | null | File;
  audio3: ImageType | null | File;
  question3: QuestionType[] | null;
  task4: string;
  img4: ImageType | null | File;
  audio4: ImageType | null | File;
  question4: QuestionType[] | null;
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
// change task,image,audio

export type QuestionType = {
    id: number;
    attributes: {
        type: 'multiplechoice' | 'filling';
        content: string;
        multiplechoices: IMultipleChoice[];
        fillings: IFilling[];
    }
};

export type IFilling = {
    id: number;
    correctAnswer: string;
};
export type IMultipleChoice = {
    id: number;
    content: string;
    isCorrect: boolean;
};

export type TaskType = {
  id: number;
  question1: QuestionType | null;
  question2: QuestionType | null;
  question3: QuestionType | null;
  question4: QuestionType | null;
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

const lt = new ListeningTest();
  
const [question, setQuestion] = useState('');
const [answer, setAnswer] = useState('');
const [multipleChoiceQuestion, setMultipleChoiceQuestion] = useState('');
// const [choices, setChoices] = useState<Choice[]>([{ id: 1, value: '' }]);
// const [correctChoice, setCorrectChoice] = useState('');
const [audioFile, setAudioFile] = useState<File | null>(null);
const [imageFile, setImageFile] = useState<File | null>(null);
const [testId, setTestId] = useState<number | null>(null);

const [tasks, setTasks] = React.useState<TaskType>();
const [editingTask, setEditingTask] = React.useState<TaskType | null>(null);

const [openModalEditTab, setOpenModalEditTab] = React.useState(false);
const [openModalUploadTab, setOpenModalUploadTab] = React.useState(false)
const [formData, setFormData] = React.useState<FormDataType>(
  {
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
    type: '',
    start_date: '',
    end_date: '',
  }
);

const [dataEdit, setDataEdit] = React.useState<TaskType>({
    id: 0,
    question1: null,
    question2: null,  
    question3: null,
    question4: null,
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
  });

const handleAddTask = (type: string) => {
  setOpenModalUploadTab(true);
}


  // const handleEditTask = (task: lt, id: number) => {
  //   console.log(task);
  //   setDataEdit(task);
  //   console.log(dataEdit);
  //   setOpenModalEditTab(true);


const fetchTasks = async () => {
  try {

      const testsRes = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_LINK_API_URL}/tests?populate=*`, { cache: "no-store" });
      const dataTests = await testsRes.json();
      console.log(dataTests);

      const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_LINK_API_URL}/listening-test?populate=*`, { cache: "no-store" });
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
          question1: item.attributes.question1,
          question2: item.attributes.question2,
          question3: item.attributes.question3,
          question4: item.attributes.question4,
          test: item.attributes.test
      })));
      console.log(testsRes);


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


      const taskResponse = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_LINK_API_URL}/listening-tests/${taskId}?populate=*`, {
          headers: {
              'Content-Type': 'application/json',
          },
      });

      if (!taskResponse.ok) {
          throw new Error('Failed to fetch the wrting task');
      }

      const taskData = await taskResponse.json();
      const testId = taskData.data.attributes.test.data.id;

      const deleteWrtingResponse = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_LINK_API_URL}/listening-tests/${taskId}`, {
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/json',
          },
      });

      if (!deleteWrtingResponse.ok) {
          throw new Error('Failed to delete the listening task');
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


      // setTasks(tasks.filter(task => task.id !== taskId));

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
