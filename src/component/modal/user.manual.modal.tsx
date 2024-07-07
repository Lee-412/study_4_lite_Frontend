'use client'

import Modal from "@mui/material/Modal"

import { Box, Button, Typography } from "@mui/material"

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


interface ManualProps {
    openManual: boolean,
    setOpenManual: (open: boolean) => void
}
const UserManual = (props: ManualProps) => {
    const handleClose = () => {
        props.setOpenManual(false)
    }

    return (
        <Modal
            open={props.openManual}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Hướng dẫn sử dụng tài khoản
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2, textAlign: 'left' }}>
                    <ol>
                        <li>
                            <strong>Đăng nhập:</strong> Sử dụng tài khoản được cung cấp sẵn để đăng nhập vào trang web.
                        </li>
                        <li>
                            <strong>Thi thử:</strong> Truy cập mục bài thi online, lựa chọn bài thi được yêu cầu để thực hiện các bài kiểm tra và đánh giá kiến thức của bạn.
                        </li>
                        <li>
                            <strong>Chỉnh sửa thông tin:</strong> Vào phần hồ sơ cá nhân, thực hiện cập nhật chỉnh sửa thông tin cá nhân của bạn.
                        </li>
                        <li>
                            <strong>Liên hệ giảng viên:</strong> Sử dụng chức năng liên hệ để gửi câu hỏi và nhận hỗ trợ từ giảng viên.
                        </li>
                    </ol>
                </Typography>
                <Button onClick={handleClose} sx={{ mt: 2 }} variant="contained" color="primary">
                    Đóng
                </Button>
            </Box>
        </Modal>
    )
}

export default UserManual;