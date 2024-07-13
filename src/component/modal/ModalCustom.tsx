import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {useRouter} from 'next/navigation';
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



export default function ModalCustom(props:any) {
  const {setSubmit} = props
  const Router = useRouter()
  console.log(props.path);
  const handleReady = () => {
    if(props.setSubmit !== undefined) {
        setSubmit(true)
        console.log(props.path);
        Router.push(`${props.path}`)
    } else {
      Router.push(`${props.path}`)
    }
  }
  const handleClose = () => props.setOpen(false);

  const ButtonCloseView = () => {
    return props.canClose ? (<Button sx={btn_style} size={"large"} onClick={handleClose}>X</Button>) : <></>
  }
  return (
    <div>
      <Modal
        open={props.open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            {ButtonCloseView()}
            <Typography id="modal-modal-title" variant="h6" component="h2">
                Thông báo
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                {props.message}
            </Typography>
            <Button sx={btn_style_cf} size={"medium"} onClick={
              handleReady
              }>Xác nhận</Button>
        </Box>
      </Modal>
    </div>
  );
}
