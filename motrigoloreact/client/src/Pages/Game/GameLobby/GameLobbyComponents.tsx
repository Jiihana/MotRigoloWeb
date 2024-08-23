import { useContext, useEffect } from 'react';
import { GameContext } from '../../../contexts/GameContext';
import { Box, Stack } from '@mui/material';
import CardsInventory from '../Cards/CardsInventory/CardsInventory';
import CardPioche from '../Cards/CardPioche/CardPioche';
import GameGrid from '../GameGrid/GameGrid';
import GameLobbyHeader from './GameLobbyHeader';
import GameSettings from '../../../Settings/GameSettings';
import { AlertResponse } from '../../../common/socket_messages/Alert';
import SocketContext from '../../../contexts/SocketContext';

const gameSettings = new GameSettings();

type GameLobbyComponentsProps = {
    gameId: string;
    gridSize: number;
    chosenWords: string[];
};

const GameLobbyComponents = (props: GameLobbyComponentsProps) => {
    const gameContext = useContext(GameContext);
    const { socket } = useContext(SocketContext).SocketState;

    useEffect(() => {
        if (gameContext == undefined) {
            socket?.emit(AlertResponse.Message, new AlertResponse(`game undefined, impossible de set les valeurs du game context`));
            return;
        }

        gameContext.setGameId(props.gameId);
        gameContext.setGridSize(props.gridSize);
        gameContext.setChosenWords(props.chosenWords);

        console.log(props.chosenWords);
        console.log(gameContext.chosenWords);
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
