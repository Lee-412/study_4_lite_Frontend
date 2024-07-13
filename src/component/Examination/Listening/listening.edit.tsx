import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { FormDataType} from './listen';
import { ImageType } from '../Writing/writing';
import { submitDataTests, submitDataWrting, submitEditDataTests, submitEditDataWriting, updateRelationtoWriting, uploadAndUpdate } from '@/utils/api';

export interface dataListeningProps {
    formDatas: FormDataType;
    setFormDatas: (value: FormDataType) => void;
    openModaEditab: boolean;
    setOpenModaEditab: (value: boolean) => void;
    dataEdit: any;
    setDataEdit: (value: any) => void;
    fetchTask: () => void;
}

// interface formDataImg {
//     img1: ImageType | null;
//     img2: ImageType | null;
//     img3: ImageType | null;
//     img4: ImageType | null;
// }

const ListeningTabEdit = (props: dataListeningProps) => {
    return (
        <div> duma</div>     
    )
};

