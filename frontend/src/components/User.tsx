import * as React from 'react';
import {Alert, Box, Button, Divider, Grid, TextField, Typography} from "@mui/material";
import "./Main.css"
import * as Yup from 'yup';
import {FieldValues, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {ReactElement} from "react";
import {useNavigate} from "react-router-dom";
import {addUser} from "../api/user";

interface UserForm{
    newUser: boolean
}

export default function User(props:UserForm) {
    const navigate = useNavigate();
    const onSubmit = (data:FieldValues) => {
        if(props.newUser){
            addUser(data).then(r=>{
                alert(r)
                navigate("/users")
            });


        }
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .required('Email is required')
            .email('Email is invalid'),
        name: Yup.string()
            .required('Name is required'),
        password: Yup.string()
            .required('Password is required')
            .min(6, 'Password must be at least 6 characters')
            .max(40, 'Password must not exceed 40 characters'),
        confirmPassword: Yup.string()
            .required('Confirm Password is required')
            .oneOf([Yup.ref('password'), null], 'Confirm Password does not match')
    });

    const {
        register,
        control,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues:{
            name:"test",
            email:"matus.uhliar@gmail.com",
            password:"",
            confirmPassword:""
        }
    });

    const messages:ReactElement[] = [];
    for (const [k, v] of Object.entries(errors)) {
        messages.push(<div>{(v?.message)}</div>)
    }

    return (
        <Box className="app-area">
            <Typography component="h2" variant="h5">{(props.newUser?"New User":"Edit User")}</Typography>
            <Divider sx={{my: "10px"}}/>
            {
                (messages.length)?
                    <Box sx={{my:'20px'}}>
                        <Alert severity="error">
                            {messages}
                        </Alert>
                    </Box>:null

            }
            <Grid container spacing={2}>

                <Grid item xs={6}>
                    <TextField
                        fullWidth={true}
                        required
                        id="outlined-required"
                        label="Email"
                        size="small"
                        {...register('email')}
                        error={errors.email ? true : false}

                    />

                </Grid>
                <Grid item xs={6}>
                    <TextField
                        fullWidth={true}
                        required
                        id="outlined-required"
                        label="Name"
                        size="small"
                        {...register('name')}
                        error={errors.name ? true : false}

                    />

                </Grid>
                <Grid item xs={6}>
                    <TextField
                        fullWidth={true}
                        required
                        id="outlined-required"
                        label="Password"
                        type="password"
                        size="small"
                        inputProps={{
                            autocomplete: 'new-password',
                            form: {
                                autocomplete: 'off',
                            },
                        }}
                        {...register('password')}
                        error={errors.password ? true : false}
                    />

                </Grid>
                <Grid item xs={6}>
                    <TextField
                        fullWidth={true}
                        required
                        id="outlined-required"
                        label="Confirm Password"
                        type="password"
                        size="small"
                        inputProps={{
                            autocomplete: 'new-password',
                            form: {
                                autocomplete: 'off',
                            },
                        }}
                        {...register('confirmPassword')}
                        error={errors.confirmPassword ? true : false}
                    />

                </Grid>
                <Grid item xs={6}>
                    <Button variant="contained" onClick={handleSubmit(onSubmit)}>Submit</Button>
                </Grid>
                <Grid item xs={6}>

                </Grid>
            </Grid>
        </Box>
    );
}
