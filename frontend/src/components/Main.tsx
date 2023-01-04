import * as React from 'react';
import {Box, Button, Container, Typography} from "@mui/material";
import "./Main.css"

export default function Main() {

    const logOut = () => {
        sessionStorage.removeItem("jwtToken");
        window.location.reload()
    }

    return (
        <Box className="main">
            <Box className="top-bar">
                <Typography component="span">DMS - Data Management System</Typography>
                <Box className="gap"></Box>
                <Button className="logout" onClick={logOut}>Log Out</Button>
            </Box>
            <Box className="content">
                <Box className="menu">

                </Box>
                <Box className="app-area">

                </Box>
            </Box>
        </Box>
    );
}
