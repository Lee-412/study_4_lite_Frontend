import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { FormDataType } from './listening';
import PartComponent from './part';
import { ListeningTest, submitDataTests } from '@/utils/postListening';

interface ListeningProps {
    formData: FormDataType;
    openModalUploadTab: boolean;
    setFormData: (formData: FormDataType) => void;
    setOpenModalUploadTab: (openModalUploadTab: boolean) => void;
    fetchTasks: () => void;
}

const ListeningTabUpload = (props: ListeningProps) => {
    const { formData, openModalUploadTab, setFormData, setOpenModalUploadTab, fetchTasks } = props;
    const [currentPart, setCurrentPart] = useState<number | null>(null);
    const [uploadedImage1, setUploadedImage1] = useState<File | null>(null);
    const [uploadedAudio1, setUploadedAudio1] = useState<File | null>(null);

    const [uploadedImage2, setUploadedImage2] = useState<File | null>(null);
    const [uploadedAudio2, setUploadedAudio2] = useState<File | null>(null);

    const [uploadedImage3, setUploadedImage3] = useState<File | null>(null);
    const [uploadedAudio3, setUploadedAudio3] = useState<File | null>(null);

    const [uploadedImage4, setUploadedImage4] = useState<File | null>(null);
    const [uploadedAudio4, setUploadedAudio4] = useState<File | null>(null);

    const handleAddPart = (part: number) => setCurrentPart(part);


    const handleSubmit = async () => {
        try {
            // console.log(formData);


            if (!formData.name) {
                alert("Vui lòng nhập nội dung name Test.");
                return;
            }
            if (!formData.Duration || isNaN(formData.Duration)) {
                alert("Vui lòng nhập thời gian làm bài.");
                return;
            }

            const dataSubmitTests = await submitDataTests(formData);
            if (dataSubmitTests !== 'false') {
                const testsResponse = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_LINK_API_URL}/tests?sort=id:desc`);
                const testsData = await testsResponse.json();
                const latestTestId = testsData.data[0].id;

                const lt = new ListeningTest();

                if (formData.audio1) {
                    await lt.addAudio(formData.audio1);
                }
                if (formData.img1) {
                    await lt.addImage(formData.img1);
                }

                formData.questions1.forEach((question: any) => {


                    if (question.type === 'filling') {
                        lt.addFilling(question.question, question.answer);
                    } else if (question.type === 'multiple choice') {
                        let dataChoices = {};
                        question.choices.map((choice: any, index: any) => {
                            let indexChar = String.fromCharCode(65 + index);
                            dataChoices = {
                                ...dataChoices,
                                [indexChar]: choice
                            }
                        })
                        lt.addMultiplechoice(question.question, question.correctChoice, dataChoices);
                    }
                });


                const testId = latestTestId;
                if (testId) {
                    await lt.addRelationTest(testId);
                }

                const result = await lt.submitForm();
                console.log(result);
                fetchTasks();



            }
        } catch (error) {
            console.error('Error handling submit:', error);

        }


    };




    const handleInputChange = (field: keyof FormDataType) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [field]: event.target.value });
    };
    const handleClose = () => {
        setOpenModalUploadTab(false)
    }

    return (
        <Modal
            open={openModalUploadTab}
            onClose={handleClose}
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Box
                sx={{
                    width: '80vw',
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 2,
                    maxHeight: '80vh',
                    overflowY: 'auto',
                }}
            >


                <Box sx={{ p: 2, display: 'flex', alignItems: 'center', mb: 2, flexDirection: "column" }}>
                    <TextField
                        fullWidth
                        label="Test Duration"
                        name="testDuration"
                        value={formData.Duration}
                        onChange={handleInputChange('Duration')}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        fullWidth
                        label="Start"
                        type="datetime-local"
                        name="start"
                        value={formData.start_date}
                        onChange={handleInputChange('start_date')}
                        InputLabelProps={{ shrink: true }}
                        inputProps={{ step: 300 }} // 5 minutes
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        fullWidth
                        label="End"
                        type="datetime-local"
                        name="end"
                        value={formData.end_date}
                        onChange={handleInputChange('end_date')}
                        InputLabelProps={{ shrink: true }}
                        inputProps={{ step: 300 }} // 5 minutes
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        fullWidth
                        label="Name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange('name')}
                        sx={{ mb: 2 }}
                    />
                </Box>

                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",

                    }}
                >

                    <Button variant="contained" onClick={() => handleAddPart(1)}>Add Part 1</Button>
                    <Button variant="contained" onClick={() => handleAddPart(2)}>Add Part 2</Button>
                    <Button variant="contained" onClick={() => handleAddPart(3)}>Add Part 3</Button>
                    <Button variant="contained" onClick={() => handleAddPart(4)}>Add Part 4</Button>
                </Box>

                {currentPart === 1 && (
                    <PartComponent
                        part={currentPart}

                        formData={formData}
                        setFormData={setFormData}
                        initialImage={uploadedImage1 ? URL.createObjectURL(uploadedImage1) : undefined}
                        initialAudio={uploadedAudio1 ? URL.createObjectURL(uploadedAudio1) : undefined}
                        uploadedImage={uploadedImage1}
                        uploadedAudio={uploadedAudio1}
                        setUploadedImage={setUploadedImage1}
                        setUploadedAudio={setUploadedAudio1}
                    />
                )}
                {currentPart === 2 && (
                    <PartComponent
                        part={currentPart}

                        formData={formData}
                        setFormData={setFormData}
                        initialImage={uploadedImage2 ? URL.createObjectURL(uploadedImage2) : undefined}
                        initialAudio={uploadedAudio2 ? URL.createObjectURL(uploadedAudio2) : undefined}
                        uploadedImage={uploadedImage2}
                        uploadedAudio={uploadedAudio2}
                        setUploadedImage={setUploadedImage2}
                        setUploadedAudio={setUploadedAudio2}

                    />
                )}

                {currentPart === 3 && (
                    <PartComponent
                        part={currentPart}

                        formData={formData}
                        setFormData={setFormData}
                        initialImage={uploadedImage3 ? URL.createObjectURL(uploadedImage3) : undefined}
                        initialAudio={uploadedAudio3 ? URL.createObjectURL(uploadedAudio3) : undefined}
                        uploadedImage={uploadedImage3}
                        uploadedAudio={uploadedAudio3}
                        setUploadedImage={setUploadedImage3}
                        setUploadedAudio={setUploadedAudio3}
                    />
                )}

                {currentPart === 4 && (
                    <PartComponent
                        part={currentPart}
                        formData={formData}
                        setFormData={setFormData}
                        initialImage={uploadedImage4 ? URL.createObjectURL(uploadedImage4) : undefined}
                        initialAudio={uploadedAudio4 ? URL.createObjectURL(uploadedAudio4) : undefined}
                        uploadedImage={uploadedImage4}
                        uploadedAudio={uploadedAudio4}
                        setUploadedImage={setUploadedImage4}
                        setUploadedAudio={setUploadedAudio4}
                    />
                )}


                <Button variant="contained" color="primary" onClick={handleSubmit}>Submit</Button>
            </Box>
        </Modal>
    );
};

export default ListeningTabUpload;
