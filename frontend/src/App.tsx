import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {AppBar, Button, Container, Grid, Paper, TextField} from "@mui/material";


const theme = createTheme({
    spacing: 8,
    typography: {
        fontSize: 12,
    },
});

export default function SignIn() {
  return (
      <ThemeProvider theme={theme}>
          <Container maxWidth="xs">
              <Paper sx={{ flexGrow: 1, mt:'50px',padding:'10px', background: "rgba(6,91,175,0.85)", color:"white"}}>
                  DMS
              </Paper>
              <Paper sx={{ flexGrow: 1, padding:'10px'}}>
                  <Grid container spacing={2}>
                      <Grid item xs={12}>
                          <TextField
                              fullWidth={true}
                              required
                              id="outlined-required"
                              label="Username"
                              size="small"
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
                          />
                      </Grid>
                      <Grid item xs={6}>

                      </Grid>
                      <Grid item xs={6}>
                          <Button fullWidth={true} variant="contained">Submit</Button>
                      </Grid>
                  </Grid>
              </Paper>
          </Container>
      </ThemeProvider>

  );
}
