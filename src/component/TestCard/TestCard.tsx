'use client'

import { Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import React, { useState } from 'react'
import { get_minute_from_seconds } from '@/utils/utilsFunction';
import '@/component/TestCard/TestCard.css'
import {useRouter} from 'next/navigation';
import GeneralModal from '@/component/modal/GeneralModal';
const img_url = 'data:image/jpeg;base64,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'



function TestCard({test}:any) {

   
    const [open, setOpen] = useState(false)
    const minutes = get_minute_from_seconds(test.attributes.Duration)
    const handdleClick = () => {
        //console.log('click')
        setOpen(true)
    }
    return (
        <>
        <Grid item xs={12} sm={6} md={4} lg={3}>
            <Card onClick={handdleClick} sx={{ maxWidth: 345, margin: '10px' }} className='test-item' >
                <CardMedia
                    component="img"
                    height="140"
                    src={img_url}
                    alt="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div" fontWeight='bold'>
                        {test.attributes.name}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" fontWeight='bold'>
                        {minutes} phút
                    </Typography>
                    <Typography variant="body2" color="text.secondary" fontWeight='bold' fontStyle='italic'>
                        Loại đề: {test.attributes.type} 
                    </Typography>
                </CardContent>
                <Grid container alignItems="center" justifyContent="space-between" sx={{ padding: '10px' }}>
                    <Grid item>
                        <Typography variant="body1" color="text.secondary">
                            Ngày bắt đầu: {test.attributes.Start}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="body1" color="text.secondary">
                            Ngày kết thúc: {test.attributes.End}
                        </Typography>
                    </Grid>
                </Grid>
            </Card>
        </Grid>
        <GeneralModal open={open} setOpen={setOpen} type={test.attributes.type} testID={test.id}/>
        </>
    );
}

export default TestCard