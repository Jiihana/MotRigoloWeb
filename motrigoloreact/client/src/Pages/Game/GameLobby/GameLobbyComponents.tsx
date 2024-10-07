import { useContext, useEffect, useRef, useState } from 'react';
import { defaultGameId, GameContext } from '../../../contexts/GameContext';
import { Box, colors, Stack } from '@mui/material';
import CardsInventory from '../Cards/CardsInventory/CardsInventory';
import CardPioche from '../Cards/CardPioche/CardPioche';
import GameGrid from '../GameGrid/GameGrid';
import GameLobbyHeader from './GameLobbyHeader';
import GameSettings from '../../../Settings/GameSettings';
import { AlertContext } from '../../../contexts/AlertContext';
import SocketContext from '../../../contexts/SocketContext';
import { UpdateCursorPositionRequest, UpdateCursorPositionResponse } from '../../../common/socket_messages/UpdateCursor';

const gameSettings = new GameSettings();

type GameLobbyComponentsProps = {
    gameId: string;
};

const GameLobbyComponents = (props: GameLobbyComponentsProps) => {
    const alertContext = useContext(AlertContext);
    const socketContext = useContext(SocketContext);
    const { socket } = useContext(SocketContext).SocketState;
    const gameContext = useContext(GameContext);
    const [cursors, setCursors] = useState<{ [id: string]: { x: number; y: number; cursorIcon: string } }>({});
    const [cursorImage, setCursorImage] = useState<string>();

    const dateTimeRef = useRef(new Date());

    useEffect(() => {
        const handleMouseMove = async (event: MouseEvent) => {
            const currentTime = new Date();
            const timeElapsed = currentTime.getTime() - dateTimeRef.current.getTime();

            if (timeElapsed <= 20) {
                // If less than or equal to 50ms have passed, do nothing
                return;
            }

            const width = window.innerWidth;
            const height = window.innerHeight;

            // Update dateTime to the current time
            dateTimeRef.current = currentTime;

            const cursorData = {
                x: (event.clientX / width) * 100,
                y: (event.clientY / height) * 100
            };

            // Envoyer la position du curseur au serveur
            socket?.emit(UpdateCursorPositionRequest.Message, cursorData.x, cursorData.y);
        };

        // Écouter les mouvements de la souris
        window.addEventListener('mousemove', handleMouseMove);

        socket?.on(UpdateCursorPositionResponse.Message, (args: UpdateCursorPositionResponse) => {
            const width = window.innerWidth;
            const height = window.innerHeight;

            const margin = (5 / 100) * height;

            const getY = (cursorY: number): number => {
                const maxHeight = (cursorY / 100) * window.innerHeight;

                return Math.min(Math.max(maxHeight, 0), window.innerHeight - margin);
            };

            const getX = (cursorX: number): number => {
                const maxWidth = (cursorX / 100) * window.innerWidth;

                return Math.min(Math.max(maxWidth, 0), window.innerWidth - margin);
            };

            const cursorX = getX(args.cursorX);
            const cursorY = getY(args.cursorY);

            setCursors((prevCursors) => ({
                ...prevCursors,
                [args.socketId]: {
                    x: cursorX,
                    y: cursorY,
                    cursorIcon: args.logo
                }
            }));
        });

        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [props.gameId]);

    useEffect(() => {
        const joinGame = async () => {
            const result = await socketContext.getClient().JoinGame(props.gameId);

            if (!result.success) {
                alertContext?.setAlertMessage('Impossible de join la partie');
                return;
            }

            gameContext.setGridSize(result.value.gridSize);
            gameContext.setChosenWords(result.value.chosenWords);
            setCursorImage(result.value.cursorImage);
        };

        if (props.gameId === undefined) {
            alertContext?.setAlertMessage('Impossible de set les valeurs du game context');
            return;
        }

        gameContext.setGameId(props.gameId);
        joinGame();
    }, []);

    useEffect(() => {
        const synchronizeGameValues = async () => {
            const result = await gameContext.getClient().SynchronizeGameValues();
            if (!result.success) {
                alertContext?.setAlertMessage(result.errorMessage);
                return;
            }

            gameContext.setGridCardsStates(result.value.gridCards);
            gameContext.setPiocheEmpty(result.value.piocheEmpty);
        };

        if (gameContext.gameId !== defaultGameId) {
            synchronizeGameValues();
        }
    }, [gameContext.gameId]);

    return (
        <>
            {Object.keys(cursors).map((id) => (
                <div
                    key={id}
                    style={{
                        position: 'absolute',
                        left: `${cursors[id].x}px`,
                        top: `${cursors[id].y}px`,
                        pointerEvents: 'none',
                        zIndex: 100
                    }}
                >
                    <Box
                        sx={{
                            backgroundImage: cursors[id].cursorIcon,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            height: '32px',
                            width: '32px'
                        }}
                    />
                </div>
            ))}
            <Box
                display="flex"
                sx={{
                    backgroundImage: 'url(/images/pages/gameLobbyBackgound.png)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'top',
                    backgroundRepeat: 'no-repeat',
                    height: '100vh',
                    width: '100vw',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: `${cursorImage}, auto`
                }}
            >
                <Stack
                    direction="column"
                    sx={{
                        justifyItems: 'center',
                        alignItems: 'center',
                        height: '100%',
                        width: '100%',
                        overflow: 'auto'
                    }}
                >
                    <GameLobbyHeader staticCursorImage={cursorImage!} />
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
                                width: '15%',
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
                                width: '70%',
                                justifyContent: 'center',
                                marginTop: '-5%'
                            }}
                        >
                            <GameGrid gridSize={gameContext.gridSize} />
                        </Box>

                        <Box
                            sx={{
                                height: '100%',
                                width: '15%',
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
        </>
    );
};

export default GameLobbyComponents;
