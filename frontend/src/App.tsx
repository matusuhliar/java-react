import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {AppBar, Button, Container, Grid, Paper, TextField} from "@mui/material";
import Login from "./components/Login";
import {isTokenSet} from "./app/axios";
import Main from "./components/Main";
import {Route, Routes} from "react-router-dom";
import PageBuilderPreview from "./components/pagebuilder/PageBuilderPreview";


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
              !isTokenSet() ? <Login /> : <Routes>
                  <Route path="/preview" element={<PageBuilderPreview />}/>
                  <Route path="/*" element={<Main />}/>
              </Routes>
          }

      </ThemeProvider>

  );
}
