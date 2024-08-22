import { createContext, useState, ReactNode } from 'react';

// Définir le type du contexte
type AlertContextType = {
    alertMessage: string;
    setAlertMessage: (message: string) => void;
};

// Créer le contexte avec un type par défaut
const AlertContext = createContext<AlertContextType | undefined>(undefined);

// Créer un provider
const AlertProvider = ({ children }: { children: ReactNode }) => {
    const [alertMessage, setAlertMessage] = useState<string>('default alert message');

    return <AlertContext.Provider value={{ alertMessage, setAlertMessage }}>{children}</AlertContext.Provider>;
};

export { AlertContext, AlertProvider };
