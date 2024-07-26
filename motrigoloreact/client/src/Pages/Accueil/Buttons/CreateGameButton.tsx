import { Box, Button, colors, Typography } from '@mui/material';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import MenuButton from '../../Shared/MenuButton';
import SocketContext from '../../../contexts/SocketContext';
import { CreateGameRequest } from '../../../common/socket_messages/CreateGame';

interface CreateGameProps {}

const CreateGameButton = (props: CreateGameProps) => {
    const { socket } = useContext(SocketContext).SocketState;

    const handleCreateGame = () => {
        socket?.emit(CreateGameRequest.Message);
    };

    return <MenuButton onClick={handleCreateGame} text="Create game" buttonWidth="100%" textSize="h3"></MenuButton>;
};

export default CreateGameButton;
