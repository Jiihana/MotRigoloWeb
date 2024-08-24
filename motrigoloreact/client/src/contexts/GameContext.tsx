import { createContext, useState, ReactNode, useContext } from 'react';
import SocketContext from './SocketContext';
import { MotRigoloGameContextHttpClient } from '../HttpClient/MotRigoloClient';

// Définir le type du contexte
type GameContextType = {
    gameId: string;
    setGameId: (id: string) => void;
    gridSize: number;
    setGridSize: (size: number) => void;
    cardsInventory: string[];
    setCardsInventory: (cards: string[] | ((prevCards: string[]) => string[])) => void;
    chosenWords: string[];
    setChosenWords: (chosenWords: string[]) => void;
    gridCardsStates: object;
    setGridCardsStates: (gridCardsStates: object) => void;
    piocheEmpty: boolean;
    setPiocheEmpty: (piocheEmpty: boolean) => void;
    getClient: () => MotRigoloGameContextHttpClient;
};

// Créer le contexte avec un type par défaut
const GameContext = createContext<GameContextType>({
    gameId: '',
    setGameId: () => {},
    gridSize: 0,
    setGridSize: () => {},
    cardsInventory: [],
    setCardsInventory: () => {},
    chosenWords: [],
    setChosenWords: () => {},
    gridCardsStates: {},
    setGridCardsStates: () => {},
    piocheEmpty: false,
    setPiocheEmpty: () => {},
    getClient: () => {
        return new MotRigoloGameContextHttpClient('', '');
    }
});

export const defaultGameId = 'default-game-id';

// Créer un provider
const GameProvider = ({ children }: { children: ReactNode }) => {
    const [gameId, setGameId] = useState<string>(defaultGameId);
    const [gridSize, setGridSize] = useState<number>(0);
    const [cardsInventory, setCardsInventory] = useState<string[]>([]);
    const [chosenWords, setChosenWords] = useState<string[]>([]);
    const [gridCardsStates, setGridCardsStates] = useState<object>({});
    const [piocheEmpty, setPiocheEmpty] = useState<boolean>(false);

    const socketContext = useContext(SocketContext);

    const getClient = (): MotRigoloGameContextHttpClient => {
        return new MotRigoloGameContextHttpClient(gameId, socketContext.SocketState.socket?.id as string);
    };

    return (
        <GameContext.Provider
            value={{
                gameId,
                setGameId,
                gridSize,
                setGridSize,
                cardsInventory,
                setCardsInventory,
                chosenWords,
                setChosenWords,
                gridCardsStates,
                setGridCardsStates,
                piocheEmpty,
                setPiocheEmpty,
                getClient
            }}
        >
            {children}
        </GameContext.Provider>
    );
};

export { GameContext, GameProvider };
