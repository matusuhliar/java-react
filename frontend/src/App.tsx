import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {AppBar, Button, Container, Grid, Paper, TextField} from "@mui/material";
import Login from "./components/Login";
import {getToken} from "./app/axios";
import Main from "./components/Main";


const theme = createTheme({
    spacing: 8,
    typography: {
        fontSize: 12,
    },
});

export default function SignIn() {
  return (
      <ThemeProvider theme={theme}>
          {
              getToken() === "" ? <Login /> : <Main />
          }

      </ThemeProvider>

  );
}
