import React from 'react';
import { Box, Typography } from '@mui/material';

const FooterApp = () => {
    return (
        <Box sx={{ backgroundColor: '#002855', color: 'white', p: 4, display: 'flex', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <img src="" alt="" style={{ width: '100px', marginRight: '20px' }} />
                <Typography variant="h6">Study 4 lite</Typography>
            </Box>
            <Box>
                <Typography variant="h6" sx={{ mb: 1 }}>THÔNG TIN</Typography>
                <Typography>Giới thiệu</Typography>
                <Typography>Chức năng nhiệm vụ</Typography>
            </Box>
            <Box>
                <Typography variant="h6" sx={{ mb: 1 }}>LIÊN HỆ</Typography>
                <Typography>Địa chỉ: Dia chi chi minh</Typography>
                <Typography>Phone: sodienthoaichiminh</Typography>
                <Typography>E-mail: chiminh@gmail.com</Typography>
            </Box>
            <Box>
                <Typography variant="h6" sx={{ mb: 1 }}>HOTLINE</Typography>
                <Typography>Hỗ trợ kỹ thuật:</Typography>
                <Typography>Phone: so dien thoai Hien</Typography>
                <Typography>E-mail: hiengioithongminh@gmail.com</Typography>
            </Box>
        </Box>
    );
}

export default FooterApp;
