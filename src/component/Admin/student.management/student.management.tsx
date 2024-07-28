
import { useState, useEffect } from 'react';
import {
    AppBar, Toolbar, Grid, TextField, Button, Tooltip, IconButton, Paper, Box, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Collapse
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import StudentRow from './student.data';
import AddUserModal from './user.create';
import EditUserModal from './user.edit';

const Users = () => {
    const [dataStudent, setDataStudent] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openAddUser, setOpenAddUser] = useState(false)
    const [openEditUser, setOpenEditUser] = useState(false)
    const [selectedUser, setSelectedUser] = useState(null);


    const [formUserData, setFormUserData] = useState({
        username: '',
        email: '',
        password: '',
        fullname: '',
        authen: 'user',
        check: 'public',
        role: '',
        block: false,
        confirmed: true
    });



    const fetchData = async () => {
        setLoading(true);
        const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_LINK_API_URL}/users?populate=*`, { cache: 'no-store' });
        const data = await response.json();
        setDataStudent(data);
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleAddStudent = () => {
        setOpenAddUser(true);
    };

    const handleEditStudent = (user: any) => {
        setSelectedUser(user);
        console.log(selectedUser);
        setOpenEditUser(true);
    };

    const handleDeleteStudent = async (id: any) => {
        await fetch(`${process.env.NEXT_PUBLIC_STRAPI_LINK_API_URL}/users/${id}`, {
            method: 'DELETE',
        });
        fetchData();
    };
    const handleContactStudent = (id: any) => {
    };

    const handleRefresh = () => {
        fetchData();
    };

    return (
        <Paper sx={{ maxWidth: 936, margin: 'auto', overflow: 'hidden' }}>
            <AppBar
                position="static"
                color="default"
                elevation={0}
                sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}
            >
                <Toolbar>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item>
                            <SearchIcon color="inherit" sx={{ display: 'block' }} />
                        </Grid>
                        <Grid item xs>
                            <TextField
                                fullWidth
                                // placeholder="Tìm kiếm học viên theo tên, email, hoặc số điện thoại"

                                placeholder='Tao chưa làm đâu, nhá, sau tính thôi'
                                InputProps={{
                                    disableUnderline: true,
                                    sx: { fontSize: 'default' },
                                }}
                                variant="standard"
                            />
                        </Grid>


                        <Grid item>
                            <Button variant="contained" sx={{ mr: 1 }} onClick={handleAddStudent}>
                                Thêm học viên
                            </Button>
                            <Tooltip title="Tải lại">
                                <IconButton onClick={handleRefresh}>
                                    <RefreshIcon color="inherit" sx={{ display: 'block' }} />
                                </IconButton>
                            </Tooltip>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <Box>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Tên học viên</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Fullname</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {!loading && dataStudent.length > 0 ? (
                                dataStudent.map((student: any) => (
                                    <StudentRow key={student.id}
                                        student={student}
                                        handleEditStudent={handleEditStudent}
                                        handleDeleteStudent={handleDeleteStudent} />

                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={4} align="center">
                                        {loading ? 'Loading...' : 'Chưa có học viên nào trong dự án này'}
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>

            <AddUserModal
                formUserData={formUserData}
                setFormUserData={setFormUserData}
                openAddUser={openAddUser}
                setOpenAddUser={setOpenAddUser}
                fetchUsers={fetchData}
            />

            <EditUserModal
                formUserData={formUserData}
                setFormUserData={setFormUserData}
                openEditUser={openEditUser}
                setOpenEditUser={setOpenEditUser}
                fetchUsers={fetchData}
                selectedUser={selectedUser}
                setSelectedUser={setSelectedUser}
            />

        </Paper>
    );
};


export default Users;
