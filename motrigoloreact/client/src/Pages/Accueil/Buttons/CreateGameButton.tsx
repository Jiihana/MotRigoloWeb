import { Box, Button, colors, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import MenuButton from '../../Shared/MenuButton';

interface CreateGameProps {
    // onClick: React.MouseEventHandler<HTMLButtonElement>;
}
const CreateGameButton = (props: CreateGameProps) => {
    return <MenuButton text="Create game" buttonWidth="100%" textSize="h3" pageRedirection="/Game"></MenuButton>;
};

export default CreateGameButton;
