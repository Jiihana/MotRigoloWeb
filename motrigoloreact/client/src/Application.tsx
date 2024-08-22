import React from 'react';
import { ThemeProvider, createTheme, CssBaseline, Box } from '@mui/material';
import { themeOptions } from './Theme/Theme';
import Accueil from './Pages/Accueil/Accueil';
import GameLobby from './Pages/Game/GameLobby/GameLobby';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AlertProvider } from './contexts/AlertContext';
import Alert from './Pages/Shared/Alert';

export interface IApplicationProps {}

const Application: React.FunctionComponent<IApplicationProps> = (props) => {
    const darkTheme = createTheme({
        ...themeOptions
    });

    return (
        <ThemeProvider theme={darkTheme}>
            <AlertProvider>
                <CssBaseline />

                <Router>
                    <Alert />
                    <Routes>
                        <Route path="/" element={<Accueil />}></Route>

                        <Route path="/game/:gameid" element={<GameLobby />}></Route>
                    </Routes>
                </Router>
            </AlertProvider>
        </ThemeProvider>
    );
};

export default Application;
