export const gameUndefined = 'La game est undefined.';
export const joueurUndefined = 'Le joueur est undefined.';
export const cannotAddCardToInventory = "Impossible d'ajouter une carte dans l'inventaire.";
export const cannotRemoveCardFromInventory = "Impossible d'enlever une carte de l'inventaire.";
export const cannotFlipOverCard = 'Impossible de flip over une carte.';
export const cannotSynchronizeGameValues = 'Impossible de synchroniser les données de jeu.';

export type ResultatValue<T> = ResultatSuccessValue<T> | ResultatFailure;

export type ResultatSuccessValue<T> = {
    value: T;
} & ResultatSuccess;

export type Resultat = ResultatSuccess | ResultatFailure;

export type ResultatSuccess = {
    success: true;
};

export type ResultatFailure = {
    success: false;
    message: string;
};
