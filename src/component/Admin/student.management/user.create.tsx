import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const AddUserModal = (props: any) => {
    const { openAddUser, setOpenAddUser, fetchUsers, formUserData, setFormUserData } = props;


    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormUserData({
            ...formUserData,
            [name]: value,
        });
    };

    const handleClose = () => {
        setOpenAddUser(false)
    }
    const [showPassword, setShowPassword] = useState(false);

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const handleSubmit = async () => {
        try {
            console.log(formUserData);

            const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_LINK_API_URL}/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formUserData),
            });

            if (response.ok) {
                fetchUsers();
                handleClose();
            } else {
                console.error('Error adding user:', response.statusText);
                console.log("lỗi");

            }
        } catch (error) {
            console.error('Error adding user:', error);
            console.log("lỗi nhưng ở ngoài,");

        }
    };

    return (
        <Modal
            open={openAddUser}
            onClose={handleClose}
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Box
                sx={{
                    width: '400px',
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 2,
                    maxHeight: '80vh',
                    overflowY: 'auto',
                }}
            >
                <h2>Thêm học viên</h2>
                <TextField
                    fullWidth
                    label="Username"
                    name="username"
                    value={formUserData.username}
                    onChange={handleChange}
                    sx={{ mb: 2 }}
                />
                <TextField
                    fullWidth
                    label="Full name"
                    name="fullname"
                    value={formUserData.fullname}
                    onChange={handleChange}
                    sx={{ mb: 2 }}
                />
                <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    value={formUserData.email}
                    onChange={handleChange}
                    sx={{ mb: 2 }}
                />
                {/* <TextField
                    fullWidth
                    label="Password"
                    name="password"
                    type="password"
                    value={formUserData.password}
                    onChange={handleChange}
                    sx={{ mb: 2 }}
                /> */}

                <TextField
                    required
                    fullWidth

                    name="password"
                    placeholder="Password"
                    type={showPassword ? 'text' : 'password'}
                    value={formUserData.password}
                    onChange={handleChange}
                    variant="outlined"
                    autoComplete="current-password"
                    InputProps={{

                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={handleShowPassword}>
                                    {showPassword ? <VisibilityOff sx={{ color: 'black' }} /> : <Visibility sx={{ color: 'black' }} />}
                                </IconButton>
                            </InputAdornment>
                        ),
                        // style: { backgroundColor: 'white', borderRadius: '5px' }
                    }}
                    sx={{ mr: 1 }}
                />

                <Box sx={{ mt: 2 }}>
                    <Button variant="outlined" onClick={handleSubmit}>
                        Submit
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default AddUserModal;
