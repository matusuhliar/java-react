import * as React from 'react';
import {Alert, AlertTitle, Button, Container, Grid, Paper, TextField} from "@mui/material";
import {axiosClient, setToken} from "../app/axios";
import {useState} from "react";



export default function Login() {
    const [showAlert,setShowAlert] = useState(false);
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [disabled,setDisabled] = useState(false);

    const logIn = () => {
        setDisabled(true);
        const form = new FormData();
        form.set("username",username);
        form.set("password",password);
        axiosClient().post('/authenticate.json',form,{headers:{ "Content-Type": "multipart/form-data" }}).then(response=>{
            setToken(response.data.data);
            setDisabled(false);
            window.location.reload();
        }).catch(e=>{
            setShowAlert(true);
            setDisabled(false);
        })
    }

    const handleUsernameChange = (e: React.ChangeEvent) => {
        const value = (e.target as HTMLInputElement).value
        setUsername(value)
    };

    const handlePasswordChange = (e: React.ChangeEvent) => {
        const value = (e.target as HTMLInputElement).value
        setPassword(value)
    };

    return (
        <Container maxWidth="xs">

            <Paper sx={{ flexGrow: 1, mt:'50px',padding:'10px', background: "rgba(6,91,175,0.85)", color:"white"}}>
                DMS
            </Paper>
            <Paper sx={{ flexGrow: 1, mt:'2px',padding:'10px'}}>
                <Grid container spacing={2}>
                    {
                        !showAlert?null:
                        <Grid item xs={12}>
                            <Alert severity="error">
                                Log in failed. Invalid credentials...
                            </Alert>
                        </Grid>
                    }

                    <Grid item xs={12}>
                        <TextField
                            fullWidth={true}
                            required
                            id="outlined-required"
                            label="Username"
                            size="small"
                            value={username}
                            disabled={disabled}
                            onChange={handleUsernameChange}

                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth={true}
                            required
                            id="outlined-required"
                            label="Password"
                            type="password"
                            size="small"
                            value={password}
                            disabled={disabled}
                            onChange={handlePasswordChange}
                            inputProps={{
                                autocomplete: 'new-password',
                                form: {
                                    autocomplete: 'off',
                                },
                            }}
                        />
                    </Grid>
                    <Grid item xs={6}>

                    </Grid>
                    <Grid item xs={6}>
                        <Button fullWidth={true} variant="contained" disabled={disabled} onClick={logIn}>Submit</Button>
                    </Grid>
                </Grid>
            </Paper>
        </Container>

    );
}
