import React, { useCallback } from 'react';
import { Box, AppBar, Container, IconButton, Toolbar, Typography, useScrollTrigger } from '@mui/material';
import { useTheme, ThemeProvider } from '@mui/material/styles';
import Landing from '../src/Landing';
import Projects from '../src/Projects';
import Skills from '../src/Skills';
import Experience from '../src/Experience';
import About from '../src/About';
import data from '../data.json';
import { darkTheme, lightTheme } from '../src/theme';
import { Brightness4, Brightness7 } from '@mui/icons-material';
const { name } = data;

export default function Index({ setTheme }) {

  const trigger = useScrollTrigger({ disableHysteresis: true });
  const theme = useTheme();
  
  // Might have to rework state starting from _app.js then here***************
  const toggleTheme = useCallback(() => {
    setTheme(theme => theme.palette.mode === 'dark' ? lightTheme : darkTheme)
  }, [setTheme])

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar color={!trigger ? "transparent" : "inherit"} sx={{ boxShadow: "none" }} position= "fixed">
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              { name }
            </Typography>
            <IconButton edge="end" color="inherit" onClick={toggleTheme}>
              {theme.palette.mode === "dark" ? <Brightness7/> : <Brightness4/>}
            </IconButton>
          </Toolbar>
        </AppBar>
        <Container>
          <Landing />
          <Projects />
          <Skills />
          <Experience />
          <About />
        </Container>
      </Box>
    </ThemeProvider>
  );
}