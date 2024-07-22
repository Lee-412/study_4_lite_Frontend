import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import ReadingTab from '../Examination/Reading/reading';
import { ListeningTab } from '../Examination/Listening/listening';
import WritingTab from '../Examination/Writing/writing';

export default function ExamManagement() {
    const [currentTab, setCurrentTab] = useState('reading'); // Mặc định hiển thị tab Reading

    const handleChangeTab = (event: any, newValue: React.SetStateAction<string>) => {
        setCurrentTab(newValue);
    };

    const renderTabContent = () => {
        switch (currentTab) {
            case 'reading':
                return <ReadingTab />;
            case 'writing':
                return <WritingTab />;
            case 'listening':
                return <ListeningTab />;
            default:
                return null;
        }
    };

    return (
        <Box>
            <Tabs
                value={currentTab}
                onChange={handleChangeTab}
                aria-label="Tabs quản lý đề thi"
                variant="fullWidth"

            >
                <Tab label="Reading" value="reading" />
                <Tab label="Writing" value="writing" />
                <Tab label="Listening" value="listening" />
            </Tabs>
            {renderTabContent()}
        </Box>
    );
}
