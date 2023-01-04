import * as React from 'react';
import {Box, Button, Container, Link, Typography} from "@mui/material";
import "./Main.css"
import {Dataset, People, VerifiedUser} from "@mui/icons-material";

export default function Users() {

    const logOut = () => {
        sessionStorage.removeItem("jwtToken");
        window.location.reload()
    }

    return (
        <Box className="app-area">
            users
        </Box>
    );
}
