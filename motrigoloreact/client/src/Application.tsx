import React, { useContext, useEffect, useState } from 'react';
import SocketContext from './contexts/SocketContext';
import { ThemeProvider, createTheme, CssBaseline, Box } from '@mui/material';
import { themeOptions } from './Theme/Theme';
import Accueil from './Pages/Accueil/Accueil';
import GameLobby from './Pages/Game/GameLobby/GameLobby';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import { SwitchRequest, SwitchResponse, SwitchMessage } from '../../common/socket_messages/switch';

export interface IApplicationProps {}

const Application: React.FunctionComponent<IApplicationProps> = (props) => {
    const darkTheme = createTheme({
        ...themeOptions
    });

    const { socket, uid, users } = useContext(SocketContext).SocketState;
    const [on, setOn] = useState(false);

    // useEffect(() => {
    //     socket?.on(SwitchResponse, (payload: SwitchMessage) => {
    //         setOn(payload.switch);
    //     });
    // }, []);

    // function pouet(event: any): void {
    //     socket?.emit(SwitchRequest);
    // }
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
        // <div>
        //     <Button onClick={pouet}>nAAt</Button>
        //     <h2>{on.toString()}</h2>
        //     <h2>Socket IO Information:</h2>
        //     <p>
        //         Your user ID: <strong>{uid}</strong>
        //         <br />
        //         Users online: <strong>{users.length}</strong>
        //         <br />
        //         Socket ID: <strong>{socket?.id}</strong>
        //         <br />
        //     </p>
        // </div>
    );
};

export default Application;
