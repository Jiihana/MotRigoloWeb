import { createContext, useState, ReactNode } from 'react';

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
};

// Créer le contexte avec un type par défaut
const GameContext = createContext<GameContextType | undefined>(undefined);

// Créer un provider
const GameProvider = ({ children }: { children: ReactNode }) => {
    const [gameId, setGameId] = useState<string>('default-game-id');
    const [gridSize, setGridSize] = useState<number>(0);
    const [cardsInventory, setCardsInventory] = useState<string[]>([]);
    const [chosenWords, setChosenWords] = useState<string[]>([]);

    return (
        <GameContext.Provider value={{ gameId, setGameId, gridSize, setGridSize, cardsInventory, setCardsInventory, chosenWords, setChosenWords }}>
            {children}
        </GameContext.Provider>
    );
};

export { GameContext, GameProvider };
