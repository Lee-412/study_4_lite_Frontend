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
import WritingTabUpload from './writing.upload';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import WritingTabEdit from './writing.edit';

export type FormDataType = {

    id: number;
    name: string;
    task1: string;
    img1: ImageType | null | File;
    img2: ImageType | null | File;
    task2: string;
    duration: number;
    type: string;
    start_date: string;
    end_date: string;
};

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


export type TaskType = {
    id: number;
    task1: string,
    task2: string,
    img1: ImageType | null;
    img2: ImageType | null;
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



const WritingTab = () => {

    const [formData, setFormData] = React.useState<FormDataType>({

        id: 0,
        name: '',
        task1: '',
        img1: null,
        img2: null,
        task2: '',
        duration: 0,
        type: 'Writing',
        start_date: '',
        end_date: '',
    });

    const [dataEdit, setDataEdit] = React.useState<TaskType>({
        id: 0,
        task1: '',
        task2: '',
        img1: null,
        img2: null,
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

    const [tasks, setTasks] = React.useState<TaskType[]>([]);
    // const [taskId, setTaskId] = React.useState<number>(0);
    const [editingTask, setEditingTask] = React.useState<TaskType | null>(null);


    const [openModalEditTab, setOpenModalEditTab] = React.useState(false);
    const [openModalUploadTab, setOpenModalUploadTab] = React.useState(false)

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
                img1: item.attributes.img1,
                img2: item.attributes.img2,
                test: item.attributes.test
            })));
            console.log(tasks);


        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    React.useEffect(() => {
        fetchTasks();
    }, []);

    const handleAddTask = (type: string) => {
        setOpenModalUploadTab(true);
    };

    console.log(tasks);

    const setImages = () => {
        tasks.map((task: TaskType) => {
            console.log(task.id, task.img1, task.img2);
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


    console.log(formData);

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
            <WritingTabUpload
                formData={formData}
                setFormData={setFormData}
                setOpenModalUploadTab={setOpenModalUploadTab}
                openModalUploadTab={openModalUploadTab}
                fetchTasks={fetchTasks}
            />
            <WritingTabEdit
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

export default WritingTab;
