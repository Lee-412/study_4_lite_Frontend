


import React, { useEffect, useState } from 'react';
import { Button, Box, Table, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import ListeningTabUpload from './listening.upload';
import ListeningTabEdit from './listening.edit';
import { ListeningTest } from '@/utils/postListening';

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
export interface FormDataType {
    name: string;
    Duration: number;
    start_date: string;
    end_date: string;
    type: string;
    img1: File | null;
    img2: File | null;
    img3: File | null;
    img4: File | null;
    audio1: File | null;
    audio2: File | null;
    audio3: File | null;
    audio4: File | null;
    task1: string;
    task2: string;
    task3: string;
    task4: string;
    questions1: { type: string, content: string, answer: string, choices?: { [key: string]: string } }[];
    questions2: { type: string, content: string, answer: string, choices?: { [key: string]: string } }[];
    questions3: { type: string, content: string, answer: string, choices?: { [key: string]: string } }[];
    questions4: { type: string, content: string, answer: string, choices?: { [key: string]: string } }[];

}

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

export const ListeningTab = () => {
    const lt = new ListeningTest();

    const [tasks, setTasks] = useState<TaskType[]>([]);
    const [editingTask, setEditingTask] = useState<TaskType | null>(null);
    const [openModalEditTab, setOpenModalEditTab] = useState(false);
    const [openModalUploadTab, setOpenModalUploadTab] = useState(false);
    const [formData, setFormData] = useState<FormDataType>({
        name: '',
        Duration: 0,
        start_date: '',
        end_date: '',
        type: 'Listening',
        img1: null,
        img2: null,
        img3: null,
        img4: null,
        audio1: null,
        audio2: null,
        audio3: null,
        audio4: null,

        task1: '',
        task2: '',
        task3: '',
        task4: '',
        questions1: [],
        questions2: [],
        questions3: [],
        questions4: [],

    });


    const fetchTasks = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_LINK_API_URL}/passages?populate=*`, { cache: "no-store" });
            const data = await response.json();
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
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleAddTask = () => {
        setOpenModalUploadTab(true);
    };

    const handleDeleteTask = async (taskId: number) => {
        try {
            if (!window.confirm("Muốn xoá thật không")) return;

            const taskResponse = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_LINK_API_URL}/listening-tests/${taskId}?populate=*`, {
                headers: { 'Content-Type': 'application/json' },
            });

            if (!taskResponse.ok) {
                throw new Error('Failed to fetch the listening task');
            }

            const taskData = await taskResponse.json();
            const testId = taskData.data.attributes.test.data.id;

            await fetch(`${process.env.NEXT_PUBLIC_STRAPI_LINK_API_URL}/listening-tests/${taskId}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
            });

            await fetch(`${process.env.NEXT_PUBLIC_STRAPI_LINK_API_URL}/tests/${testId}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
            });

            setTasks(tasks.filter(task => task.id !== taskId));
        } catch (error) {
            console.error('Error deleting task and associated test:', error);
        }
    };

    return (
        <Box>
            {/* <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button variant="contained" onClick={handleAddTask}>Add new Task</Button>
            </Box> */}
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Task Title</TableCell>
                            <TableCell>Start Date</TableCell>
                            <TableCell>End Date</TableCell>
                            <TableCell>Actions</TableCell>
                            <TableCell> <Button variant="contained" onClick={handleAddTask}>Add new Task</Button></TableCell>

                        </TableRow>
                    </TableHead>
                    {/* ... Map over tasks and render TableRow here ... */}
                </Table>
            </TableContainer>
            <ListeningTabUpload
                formData={formData}
                setFormData={setFormData}
                setOpenModalUploadTab={setOpenModalUploadTab}
                openModalUploadTab={openModalUploadTab}
                fetchTasks={fetchTasks}
            />
            {/* <ListeningTabEdit
                dataEdit={editingTask}
                setDataEdit={setEditingTask}
                formData={formData}
                setFormData={setFormData}
                setOpenModalEditTab={setOpenModalEditTab}
                openModalEditTab={openModalEditTab}
                fetchTasks={fetchTasks}
                PartComponent={PartComponent}
            /> */}

        </Box>
    );
};
