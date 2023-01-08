import * as React from 'react';
import {Alert, Box, Button, Divider, Grid, MenuItem, Select, TextField, Typography} from "@mui/material";
import "./Main.css"
import * as Yup from 'yup';
import {Controller, FieldValues, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {ReactElement, useEffect, useMemo, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {addUser, editPassword, editUser} from "../api/user";
import {axiosClient} from "../app/axios";
import {endLoading, startLoading} from "../reducers/loadingSlice";
import {useAppDispatch} from "../app/hooks";

export default function UserEdit() {
    return (
        <Box className="app-area">
            <Typography component="h2" variant="h5">Edit User</Typography>
            <Divider sx={{my: '20px'}}></Divider>
            <UserEditDetail/>
            <Typography component="h2" variant="h5">Update Password</Typography>
            <Divider sx={{my: '20px'}}></Divider>
            <UserEditPassword/>
        </Box>
    )
}

interface Role{
    id:number,
    key:string,
    name:string
}

export function UserEditDetail() {
    const navigate = useNavigate();
    const {id} = useParams();
    const dispatch = useAppDispatch();
    const [roles, setRoles] = useState([]);

    useEffect(() => {
        dispatch(startLoading())
        Promise.all([
            axiosClient().get('/users/roles.json'),
            axiosClient().get('/users/user.json?id=' + id)]
        ).then((values) => {
            const user = values[1].data.data;
            setRoles(values[0].data.data);
            reset(
                {role: "" + user.roles[0]?.id, password: "", confirmPassword: "", name: user.name, email: user.email}
            )
            dispatch(endLoading())
        });
    }, []);

    const onSubmit = (data: FieldValues) => {
        data.id = id;
        dispatch(startLoading())
        editUser(data).then(r => {
            dispatch(endLoading())
        });
    };

    const validationSchemaDetail = Yup.object().shape({
        role: Yup.string()
            .required('Role is required'),
        email: Yup.string()
            .required('Email is required')
            .email('Email is invalid'),
        name: Yup.string()
            .required('Name is required')
    });

    const {
        reset,
        register,
        control,
        handleSubmit,
        formState: {errors}
    } = useForm({
        resolver: yupResolver(validationSchemaDetail),
        defaultValues: {role: "", password: "", confirmPassword: "", name: "", email: ""},
    });

    const rolesWidthEmptyValue = [...roles]

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Controller
                    name="role"
                    control={control}
                    render={({field: {ref, ...field}}) => (
                        <TextField
                            {...field}
                            fullWidth={true}
                            select // tell TextField to render select
                            label="Role"
                            size="small"
                            InputLabelProps={{shrink: true}}
                        >
                            {
                                rolesWidthEmptyValue.map((r:Role) => <MenuItem key={r.id} value={r.id}>{r.name}</MenuItem>)
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
                    InputLabelProps={{shrink: true}}
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
                    InputLabelProps={{shrink: true}}
                />
            </Grid>
            <Grid item xs={6}>
                <Button variant="contained" onClick={handleSubmit(onSubmit)}>Submit</Button>
            </Grid>
            <Grid item xs={6}>

            </Grid>
            <Grid item xs={12}>
                <br/>
            </Grid>
        </Grid>
    );
}


export function UserEditPassword() {
    const navigate = useNavigate();
    const {id} = useParams();
    const dispatch = useAppDispatch();
    const [roles, setRoles] = useState([]);

    useEffect(() => {
        dispatch(startLoading())
        Promise.all([
            axiosClient().get('/users/roles.json'),
            axiosClient().get('/users/user.json?id=' + id)]
        ).then((values) => {
            const user = values[1].data.data;
            setRoles(values[0].data.data);
            reset(
                {role: "" + user.roles[0]?.id, password: "", confirmPassword: "", name: user.name, email: user.email}
            )
            dispatch(endLoading())
        });
    }, []);

    const onSubmit = (data: FieldValues) => {
        data.id = id;
        dispatch(startLoading())
        editPassword(data).then(r => {
            dispatch(endLoading())
            reset({password: "", confirmPassword: ""})
        });
    };

    const validationSchemaDetail = Yup.object().shape({
        password: Yup.string()
            .required('Password is required')
            .min(6, 'Password must be at least 6 characters')
            .max(40, 'Password must not exceed 40 characters'),
        confirmPassword: Yup.string()
            .required('Confirm Password is required')
            .oneOf([Yup.ref('password'), null], 'Confirm Password does not match')
    });

    const {
        reset,
        register,
        control,
        handleSubmit,
        formState: {errors}
    } = useForm({
        resolver: yupResolver(validationSchemaDetail),
        defaultValues: {role: "", password: "", confirmPassword: "", name: "", email: ""},
        resetOptions: {
            keepDirtyValues: false,
            keepErrors: true,
        }
    });

    return (
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <TextField
                    fullWidth={true}
                    required
                    id="outlined-required"
                    label="Password"
                    type="password"
                    size="small"
                    InputLabelProps={{shrink: true}}
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
                    InputLabelProps={{shrink: true}}
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
    );
}
