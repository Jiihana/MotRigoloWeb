export default class GameModelError {
    public static gameUndefined: GameModelError = new GameModelError('La game est undefined.');
    public static joueurUndefined: GameModelError = new GameModelError('Le joueur est undefined.');
    public static cannotAddCardToInventory: GameModelError = new GameModelError("Impossible d'ajouter une carte dans l'inventaire.");
    public static cannotRemoveCardFromInventory: GameModelError = new GameModelError("Impossible d'enlever une carte de l'inventaire.");
    public message: string;

    constructor(message: string) {
        this.message = message;
    }
}
