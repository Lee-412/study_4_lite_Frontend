import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';

const EditUserModal = (props: any) => {
    const { openEditUser, setOpenEditUser, fetchUsers, formUserData, setFormUserData, selectedUser } = props;
    console.log(selectedUser);

    useEffect(() => {
        if (selectedUser) {
            setFormUserData({
                ...formUserData,
                username: selectedUser.username,
                email: selectedUser.email,
                fullname: selectedUser.fullname,
                // Assuming you don't want to edit password
            });
            console.log(selectedUser);

        }
    }, [selectedUser]);

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormUserData({
            ...formUserData,
            [name]: value,
        });
    };
    console.log(selectedUser);

    const handleClose = () => {
        setOpenEditUser(false);
    };

    const handleSubmit = async () => {
        try {
            console.log(formUserData);

            const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_LINK_API_URL}/users/${selectedUser.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: formUserData.username,
                    email: formUserData.email,
                    fullname: formUserData.fullname,
                }),
            });

            if (response.ok) {
                fetchUsers();
                handleClose();
            } else {
                console.error('Error updating user:', response.statusText);
                console.log("not ok");

            }
        } catch (error) {
            console.error('Error updating user:', error);
            console.log("not try");

        }
    };

    return (
        <Modal
            open={openEditUser}
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
                <h2>Chỉnh sửa học viên</h2>
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
                    label="Email"
                    name="email"
                    value={formUserData.email}
                    onChange={handleChange}
                    sx={{ mb: 2 }}
                />
                <TextField
                    fullWidth
                    label="Fullname"
                    name="fullname"
                    value={formUserData.fullname}
                    onChange={handleChange}
                    sx={{ mb: 2 }}
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

export default EditUserModal;
