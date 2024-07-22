import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';

import { FormDataType, ImageType } from './listening';
import { submitEditDataTests, submitEditDataWriting, updateRelationtoWriting, uploadAndUpdate } from '@/utils/api';

export interface ListeningDataProps {
    formData: any,
    setFormData: (formData: any) => void,
    openModalEditTab: boolean,
    setOpenModalEditTab: (openModalEditTab: boolean) => void,
    dataEdit: any,
    setDataEdit: (dataEdit: any) => void,
    fetchTasks: () => void
}

const ListeningTabEdit = (props: ListeningDataProps) => {


    const handleClose = () => {
        props.setOpenModalEditTab(false)
    }

    return (
        <Modal
            open={props.openModalEditTab}
            onClose={handleClose}
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Box>
                nâu thinh tu sây
            </Box>
        </Modal>
    );
};

export default ListeningTabEdit;
