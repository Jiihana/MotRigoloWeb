class PlayerModel {
    public playerId: string;
    public cardsInventory: string[];

    constructor(playerId: string) {
        this.playerId = playerId;
        this.cardsInventory = [];
    }
}

export default PlayerModel;
