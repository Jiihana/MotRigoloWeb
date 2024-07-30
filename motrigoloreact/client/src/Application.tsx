import React from 'react';
import { ThemeProvider, createTheme, CssBaseline, Box } from '@mui/material';
import { themeOptions } from './Theme/Theme';
import Accueil from './Pages/Accueil/Accueil';
import GameLobby from './Pages/Game/GameLobby/GameLobby';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

export interface IApplicationProps {}

const Application: React.FunctionComponent<IApplicationProps> = (props) => {
    const darkTheme = createTheme({
        ...themeOptions
    });

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />

            <Router>
                <Routes>
                    <Route path="/" element={<Accueil />}></Route>

                    <Route path="/game/:gameid" element={<GameLobby />}></Route>
                </Routes>
            </Router>
        </ThemeProvider>
    );
};

export default Application;
