import React, { useEffect, useState } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import MenuButton from '../Shared/MenuButton';
import { useParams, Navigate } from 'react-router-dom';
import { CheckGameExistsRequest, CheckGameExistsResponse } from '../../common/socket_messages/GameExistsCheck';

const GameLobbyHeader = () => {
    const { gameid } = useParams();
    const [gameExists, setGameExists] = useState<boolean | null>(null); // État initial à null pour indiquer le chargement
    const [isLoading, setIsLoading] = useState(true); // État de chargement

    useEffect(() => {
        const checkGameExists = async () => {
            try {
                const response = await fetch(`http://localhost:1337/${CheckGameExistsRequest.Message}?gameId=${gameid}`);

                const result = (await response.json()) as CheckGameExistsResponse;
                console.log(result);
                setGameExists(result.gameExists);
            } catch (error) {
                console.error('Failed to check if game exists', error);
                setGameExists(false);
            } finally {
                setIsLoading(false);
            }
        };

        checkGameExists();
    }, [gameid]);

    if (isLoading) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                    color: 'white'
                }}
            >
                <Typography variant="h6">Loading...</Typography>
            </Box>
        );
    }

    return gameExists ? (
        <Stack
            display="flex"
            direction="row"
            spacing={0}
            sx={{
                height: 'auto',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingLeft: '2%',
                paddingRight: '2%',
                paddingTop: '0.5%'
            }}
        >
            <MenuButton text="<- Home" buttonWidth="13%" textSize="h5" onClick={undefined} />
            <Typography variant="h6" sx={{ color: 'white' }}>
                {gameid}
            </Typography>
        </Stack>
    ) : (
        <Navigate to="/" />
    );
};

export default GameLobbyHeader;
