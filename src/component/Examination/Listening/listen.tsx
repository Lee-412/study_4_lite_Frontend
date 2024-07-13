import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
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
import { Stringifiable } from 'query-string';
import ListeningTabUpLoad from './listening.upload.tsx';
import ListeningTabEdit from './listening.edit';
import { ImageType } from '../Writing/writing';
import fetchTasks from '../Writing/writing';
// may be need to import , handleAddTask, setImages, handleDeleteTask, handleEditTask, handleSaveTask, handleSortTasks for factorizing code
import { Create } from '@mui/icons-material';
import { useEffect} from 'react';
import { Tab } from '@mui/material';
export type FormDataType = {
    id: number;
    name: string;
    q_task1: string;
    image1: ImageType | null | File;
    audio1: AudioType | null | File;
    q_task2: string;
    image2: ImageType | null | File;
    audio2: AudioType | null | File;
    q_task3: string;
    image3: ImageType | null | File;
    audio3: AudioType | null | File;
    q_task4: string;
    image4: ImageType | null | File;
    audio4: AudioType | null | File;
    duration: number;
    type: string;
    start_date: string;
    end_date: string;
};
export type AudioType = {
    id: string;               // Unique identifier for the audio
    name: string;             // Name of the audio
    duration: number;         // Duration of the audio in seconds
    url: string;              // URL where the audio file is located
    format: string;           // Format of the audio file (e.g., mp3, wav)
    size: number;             // Size of the audio file in bytes
    createdAt: string;        // Date and time when the audio was created
    updatedAt: string; 
};
// export type ImageType = {
//     data: {
//         id: number;
//         attributes: {
//             name: string;
//             alternativeText: string | null;
//             caption: string | null;
//             width: number;
//             height: number;
//             foramts: {
//                 thumbnail: {
//                     url: string;
//                 };
//                 small: {
//                     url: string;
//                 };
//                 medium: {
//                     url: string;
//                 };
//                 large: {
//                     url: string;
//                 };
//             }
//             hash : string;
//             ext: string;
//             mime: string;
//             size: number;
//             url: string;
//             previewUrl: string | null;
//             provider: string;
//             provider_metadata: string | null;
//             created_at: string;
//             updated_at: string;
//             };

//     }[];
// };

export type TaskType = {
    id: number;
    task1: string;
    img1: ImageType | null;
    audio1: AudioType | null;
    task2: string;
    img2: ImageType | null;
    audio2: AudioType | null;
    task3: string;
    img3: ImageType | null;
    audio3: AudioType | null;
    task4: string;
    img4: ImageType | null;
    audio4: AudioType | null;
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
}

export const ListeningTab = () => {
    const [formData, setFormData] = React.useState<FormDataType>({
        id: 0,
        name: '',
        q_task1: '',
        image1: null,
        audio1: null,
        q_task2: '',
        image2: null,
        audio2: null,
        q_task3: '',
        image3: null,
        audio3: null,
        q_task4: '',
        image4: null,
        audio4: null,
        duration: 0,
        type: '',
        start_date: '',
        end_date: '',
    
    });

    const [dataEdit, setDataEdit] = React.useState<TaskType>({
        id: 0,
        task1: '',
        img1: null,
        audio1: null,
        task2: '',
        img2: null,
        audio2: null,
        task3: '',
        img3: null,
        audio3: null,
        task4: '',
        img4: null,
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
    const [tasks, setTasks] = React.useState<TaskType[]>([]);
    // const [taskId, setTaskId] = React.useState<number>(0);
    const [editingTask, setEditingTask] = React.useState<TaskType | null>(null);


    const [openModalEditTab, setOpenModalEditTab] = React.useState(false);
    const [openModalUploadTab, setOpenModalUploadTab] = React.useState(false)
    
    useEffect(() => {
        fetchTasks();
    }, []);

    const handleAddTask = (type: string) => {
        setOpenModalUploadTab(true);
    };
    
    console.log(tasks);
    
    const setImages = () => {
        tasks.map((task: TaskType) => {
            console.log(task.id, task.img1, task.img2, task.img3, task.img4);
        })

    }
    setImages();
    const handleEditTask = (task: TaskType, id: number) => {
        console.log(task);
        setDataEdit(task);
        console.log(dataEdit);
        setOpenModalEditTab(true);

    };

    const handleDeleteTask = async (taskId: number) => {
        try {

            if (!window.confirm("Muốn xoá thật không")) return;

            console.log(taskId);


            const taskResponse = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_LINK_API_URL}/listening/${taskId}?populate=*`, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!taskResponse.ok) {
                throw new Error('Failed to fetch the wrting task');
            }

            const taskData = await taskResponse.json();
            const testId = taskData.data.attributes.test.data.id;

            const deleteWrtingResponse = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_LINK_API_URL}/listening/${taskId}`, {
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
    
    const handleSaveTask = () => {
        if (editingTask) {
            setTasks(tasks.map(task => task.id === editingTask.id ? editingTask : task));
            setEditingTask(null);
        }
    };
    
    const handleSortTasks = () => {
        const sortedTasks = [...tasks].sort((a, b) => new Date(a.test.data.attributes.Start).getTime() - new Date(b.test.data.attributes.End).getTime());
        setTasks(sortedTasks);
    };
    
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
                                <Button sx={{
                                    width: '1px',

                                }} onClick={handleSortTasks}>
                                    <SwapVertIcon />
                                </Button>
                            </TableCell>
                            <TableCell>End Date</TableCell>
                            <TableCell>Task 1</TableCell>
                            <TableCell>Task 2</TableCell>
                            <TableCell>Task 3</TableCell>
                            <TableCell>Task 4</TableCell>
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

export default ListeningTab;
