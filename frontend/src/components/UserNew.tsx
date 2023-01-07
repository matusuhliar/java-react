import * as React from 'react';
import {Alert, Box, Button, Divider, Grid, MenuItem, Select, TextField, Typography} from "@mui/material";
import "./Main.css"
import * as Yup from 'yup';
import {Controller, FieldValues, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {ReactElement, useEffect, useMemo, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {addUser, editUser} from "../api/user";
import {useAppDispatch, useAppSelector} from "../app/hooks";
import {axiosClient} from "../app/axios";


export default function UserNew() {
    const navigate = useNavigate();
    const [roles,setRoles] = useState([]);

    useEffect(() => {
            axiosClient().get('/users/roles.json').then(r=>{
                setRoles(r.data.data);
            })
    }, []);

    const onSubmit = (data:FieldValues) => {
        addUser(data).then(r=>{
            navigate("/users")
        });
    };

    const validationSchema = Yup.object().shape({
        role: Yup.string()
            .required('Role is required'),
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
        defaultValues:{role:"",password:"",confirmPassword:"", name:"",email:""},
        resetOptions: {
            keepDirtyValues: false,
            keepErrors: true,
        }
    });

    const messages:ReactElement[] = [];
    for (const [k, v] of Object.entries(errors)) {
        messages.push(<div>{(v?.message)}</div>)
    }

    const rolesWidthEmptyValue = [{id:"",name:" - "},...roles]

    return (
        <Box className="app-area">
            <Typography component="h2" variant="h5">New User</Typography>
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

                <Grid item xs={12}>
                    <Controller
                        name="role"
                        control={control}
                        render={({ field: { ref, ...field } }) => (
                            <TextField
                                {...field}
                                fullWidth={true}
                                select // tell TextField to render select
                                label="Role"
                                size="small"
                                InputLabelProps={{ shrink: true }}
                            >
                                {
                                    rolesWidthEmptyValue.map(r=><MenuItem key={r.id} value={r.id}>{r.name}</MenuItem>)
                                }
                            </TextField>
                        )}
                    />
                </Grid>

                <Grid item xs={6}>
                    <TextField
                        fullWidth={true}
                        required
                        id="outlined-required"
                        label="Email"
                        size="small"
                        {...register('email')}
                        error={errors.email ? true : false}
                        InputLabelProps={{ shrink: true }}
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
                        InputLabelProps={{ shrink: true }}
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
                        InputLabelProps={{ shrink: true }}
                        inputProps={{
                            autoComplete: 'new-password',
                            form: {
                                autoComplete: 'off',
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
                        InputLabelProps={{ shrink: true }}
                        inputProps={{
                            autoComplete: 'new-password',
                            form: {
                                autoComplete: 'off',
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
