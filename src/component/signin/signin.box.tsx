'use client'
import React, { useEffect, useState } from 'react';
import {
    TextField, Button, Grid, Box,
    InputAdornment,
    IconButton,
    FormControlLabel,
    Checkbox
} from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useRouter } from 'next/navigation';


const SinginBox = () => {

    const [userLoginId, setUserLoginId] = useState<number>()
    const [authen, setAuthen] = useState<string>()
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
    });
    const route = useRouter();

    const [showPassword, setShowPassword] = useState(false);

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        console.log(name, value);

        setFormData({
            ...formData,
            [name]: value,
        });
    };

    useEffect(()=>{
        //console.log(userLoginId);
        if(userLoginId !== undefined) {
            if(authen === 'Admin') {
                route.push(`/dashboard?userid=${userLoginId}`);
            } else {
                route.push(`/course?userid=${userLoginId}`);
            }
        }
    }, [userLoginId, authen])

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_LINK_API_URL}/auth/local`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    identifier: formData.email,
                    password: formData.password,
                }),
            });

            const data = await response.json();
            console.log(data);

            if (response.ok) {
                console.log(data.user.id);
                setUserLoginId(data.user.id);
                
                
                
                // sessionStorage.setItem('userData', JSON.stringify({
                //     token: data.jwt,
                //     user: data.user,
                // }));

                const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_LINK_API_URL}/users/${data.user.id}?populate=*`)
                const dataUser = await res.json();
                console.log(dataUser);

                sessionStorage.setItem('userData', JSON.stringify({
                    token: data.jwt,
                    user: dataUser,
                }));

                // Redirect based on user role
                if (data.user.authen === 'Admin') {
                    //console.log(userLoginId);
                    setAuthen('Admin')
                    
                } else {
                    console.log(userLoginId);
                    setAuthen('User')
                    
                }
            } else {
                console.error('Login failed:', data);
                alert('Login failed. Please check your email and password.');
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                p: 1, backgroundColor: '#002855', display: 'flex', alignItems: 'center', borderRadius: 2,
                justifyContent: "space-around"
            }}
        >
            <TextField
                required
                name="email"
                placeholder="email"
                value={formData.email}
                onChange={handleChange}
                variant="outlined"
                autoComplete="cuurent-email"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <PersonIcon />
                        </InputAdornment>
                    ),
                    style: { backgroundColor: 'white', borderRadius: '5px' }
                }}
                sx={{ mr: 1 }}
            />
            <TextField
                required
                name="password"
                placeholder="Password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange}
                variant="outlined"
                autoComplete="current-password"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <LockIcon />
                        </InputAdornment>
                    ),
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={handleShowPassword}>
                                {showPassword ? <VisibilityOff sx={{ color: 'black' }} /> : <Visibility sx={{ color: 'black' }} />}
                            </IconButton>
                        </InputAdornment>
                    ),
                    style: { backgroundColor: 'white', borderRadius: '5px' }
                }}
                sx={{ mr: 1 }}
            />
            <Grid item>
                <FormControlLabel
                    control={<Checkbox sx={{ color: 'white' }} />}
                    label={<span style={{ color: 'white' }}>Ghi nhớ</span>}
                />
            </Grid>
            <Grid item>
                <Button variant="text" sx={{ color: 'white', textTransform: 'none' }}>
                    Quên mật khẩu
                </Button>
            </Grid>
            <Button type="submit"
                onClick={handleSubmit}
                variant="contained"
                color="primary"
                sx={{ backgroundColor: 'white', color: '#002855', fontWeight: 'bold', textTransform: 'none' }}>
                Đăng nhập
            </Button>
        </Box>
    );



};

export default SinginBox;
