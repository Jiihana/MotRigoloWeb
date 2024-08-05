import { useContext, useEffect } from 'react';
import { GameContext } from '../../../contexts/GameContext';
import { Box, Stack } from '@mui/material';
import CardsInventory from '../Cards/CardsInventory/CardsInventory';
import CardPioche from '../Cards/CardPioche/CardPioche';
import GameGrid from '../GameGrid/GameGrid';
import GameLobbyHeader from './GameLobbyHeader';
import GameSettings from '../../../Settings/GameSettings';

const gameSettings = new GameSettings();

type GameLobbyComponentsProps = {
    gameId: string;
    gridSize: number;
};

const GameLobbyComponents = (props: GameLobbyComponentsProps) => {
    const gameContext = useContext(GameContext);
    useEffect(() => {
        gameContext?.setGameId(props.gameId);
    }, []);

    return (
        <Box
            display="flex"
            sx={{
                backgroundImage: 'url(/images/pages/gameLobbyBackgound.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                height: '100vh',
                width: '100vw',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: `${gameSettings.getRandomCursor()}, auto`
            }}
        >
            <Stack
                direction="column"
                sx={{
                    justifyItems: 'center',
                    alignItems: 'center',
                    height: '100%',
                    width: '100%'
                }}
            >
                <GameLobbyHeader />
                <Stack
                    direction="row"
                    sx={{
                        justifyItems: 'center',
                        alignItems: 'center',
                        height: '100%',
                        width: '100%'
                    }}
                >
                    <Stack
                        direction="column"
                        sx={{
                            height: '100%',
                            width: '20%',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <CardsInventory></CardsInventory>
                    </Stack>
                    <Box
                        sx={{
                            display: 'flex',
                            height: '100%',
                            width: '60%',
                            justifyContent: 'center'
                        }}
                    >
                        <GameGrid gridSize={props.gridSize} />
                    </Box>

                    <Box
                        sx={{
                            height: '100%',
                            width: '20%',
                            alignItems: 'center',
                            justifyContent: 'center',
                            display: 'flex'
                        }}
                    >
                        <CardPioche></CardPioche>
                    </Box>
                </Stack>
            </Stack>
        </Box>
    );
};

export default GameLobbyComponents;
