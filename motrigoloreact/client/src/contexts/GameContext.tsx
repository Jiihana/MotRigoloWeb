import { createContext, useState, ReactNode } from 'react';

// Définir le type du contexte
type GameContextType = {
    gameId: string;
    setGameId: (id: string) => void;
    cardsInventory: string[];
    setCardsInventory: (cards: string[] | ((prevCards: string[]) => string[])) => void;
};

// Créer le contexte avec un type par défaut
const GameContext = createContext<GameContextType | undefined>(undefined);

// Créer un provider
const GameProvider = ({ children }: { children: ReactNode }) => {
    const [gameId, setGameId] = useState<string>('default-game-id');
    const [cardsInventory, setCardsInventory] = useState<string[]>([]);

    return <GameContext.Provider value={{ gameId, setGameId, cardsInventory, setCardsInventory }}>{children}</GameContext.Provider>;
};

export { GameContext, GameProvider };
