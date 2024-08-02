import React from 'react';
import { TableRow, TableCell, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
interface TestProps {
    test: any;
    handleDeleteTest: (id: any) => void;
    handleLearnMore: (test: any) => void;
}
const TestRow = ({ test,
    handleLearnMore,
    handleDeleteTest }: any) => {
    console.log(test);

    return (
        <TableRow>
            <TableCell>{test.attributes.name}</TableCell>
            <TableCell>{test.attributes.type}</TableCell>
            <TableCell>{test.id}</TableCell>
            <TableCell>
                <IconButton onClick={() => handleLearnMore(test)}>
                    <OpenInNewIcon />
                </IconButton>
                <IconButton onClick={() => handleDeleteTest(test.id)}>
                    <DeleteIcon />
                </IconButton>
            </TableCell>
        </TableRow>
    );
};

export default TestRow;
