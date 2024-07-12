import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {useRouter} from 'next/navigation';
import { Padding } from '@mui/icons-material';
import { useState, useEffect } from 'react'; 
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const btn_style = {
    position: 'absolute' as 'absolute',
    top: '1%',
    right: '2%',
    fontSize: 20,
    borderRadius: '15%'
}
const btn_style_cf = {
    //position: 'absolute' as 'absolute',
    fontSize: 20,
    borderRadius: '15',
    color: '#dbd3d3',
    backgroundColor: '#1976D2',
    marginTop: 5,
    marginLeft: 15
    
}



export default function GeneralModal({open, setOpen, type, testID}:any) {
  const Router = useRouter()
  
  const handleReady = () => {
      Router.push(`/course/test/${type}-${testID}`)
  }
  const handleClose = () => setOpen(false);
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <Button sx={btn_style} size={"large"} onClick={handleClose}>X</Button>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                Text in a modal
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
            <Button sx={btn_style_cf} size={"medium"} onClick={handleReady}>Bắt đầu làm bài</Button>
        </Box>
      </Modal>
    </div>
  );
}
