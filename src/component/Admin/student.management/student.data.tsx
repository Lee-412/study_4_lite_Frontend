import { useState, useEffect } from 'react';
import {
    AppBar, Toolbar, Grid, TextField, Button, Tooltip, IconButton, Paper, Box, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Collapse
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
const StudentRow = (props: any) => {

    const [open, setOpen] = useState(false);
    const { student, handleEditStudent, handleDeleteStudent, handleContactStudent } = props
    // console.log(student);

    return (
        <>

            {
                student.authen != 'Admin'
                    ?
                    <>

                        <TableRow>
                            <TableCell>{student.username}</TableCell>
                            <TableCell>{student.email}</TableCell>
                            <TableCell>{student.fullname}</TableCell>

                            <TableCell>
                                <IconButton onClick={() => handleEditStudent(student)}>
                                    <EditIcon />
                                </IconButton>
                                <IconButton onClick={() => handleDeleteStudent(student.id)}>
                                    <DeleteIcon />
                                </IconButton>
                                {/* <IconButton onClick={() => handleContactStudent(student.id)}>
                                    <DeleteIcon />
                                </IconButton>
                                <IconButton onClick={() => setOpen(!open)}>
                                    {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                </IconButton> */}
                            </TableCell>
                        </TableRow>
                    </>
                    :
                    <>
                    </>
            }
        </>

    );
};
export default StudentRow;