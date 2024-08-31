import PlayerModel from './PlayerModel';
import { Resultat, ResultatValue } from '../GameModelError';
import fetch from 'node-fetch';

type wordApiDto = {
    name: string;
    category: string;
};

class GameModel {
    private alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    private cardsDiscarded: string[];

    public ChosenWords: string[];
    public gameId: string;
    public players: PlayerModel[] = [];
    public gridCards: string[];
    public gridSize: number;
    public GridCardsState = new Map();
    public piocheEmpty = false;

    constructor(gameId: string, gridSize: number) {
        this.gameId = gameId;
        this.gridSize = gridSize;
        this.gridCards = this.setGridCards();
        this.GridCardsState = this.setGridCardsState();
        this.cardsDiscarded = [];
        this.ChosenWords = [];
    }

    public FlipOverCard(indexCard: string): ResultatValue<boolean> {
        if (this.GridCardsState.has(indexCard)) {
            const value = this.GridCardsState.get(indexCard);

            this.GridCardsState.set(indexCard, !value);
            return {
                success: true,
                value: !value
            };
        }

        return {
            success: false,
            message: `La carte avec l'index ${indexCard} n'a pas pu être retournée.`
        };
    }

    public SynchronizeCards(): Map<string, boolean> {
        return this.GridCardsState;
    }

    public addPlayer(playerId: string): PlayerModel {
        const player = new PlayerModel(playerId);
        this.players.push(player);
        return player;
    }

    public removePlayer(playerId: string) {
        this.players = this.players.filter((player) => player.playerId !== playerId);
    }

    public addCardToPlayerInventory(playerId: string): ResultatValue<string> {
        const player = this.findPlayer(playerId);
        if (!player.success) {
            return {
                success: false,
                message: `${player.message} Impossible d'ajouter la carte de l'inventaire.`
            };
        }

        const randomCard = this.drawRandomPiocheCard();
        return {
            success: true,
            value: player.value.addCardToInventory(randomCard)
        };
    }

    public removeCardFromPlayerInventory(playerId: string, card: string): ResultatValue<string> {
        const player = this.findPlayer(playerId);
        if (!player.success) {
            return {
                success: false,
                message: `${player.message} Impossible de retirer la carte de l'inventaire.`
            };
        }

        this.cardsDiscarded.push(card);
        return {
            success: true,
            value: player.value.removeCardFromInventory(card)
        };
    }

    public async modifyWord(word: string): Promise<ResultatValue<string>> {
        try {
            const response = await fetch(`https://trouve-mot.fr/api/sizemax/9/`);

            if (!response.ok) {
                return {
                    success: false,
                    message: `Un problème est survenu lors de l'appel à https://trouve-mot.fr/api/ pour modifier 1 mot`
                };
            }

            const result = (await response.json()) as wordApiDto[];

            this.ChosenWords.forEach((chosenWord, index) => {
                if (chosenWord == word) {
                    this.ChosenWords[index] = result[0].name.charAt(0).toUpperCase() + result[0].name.slice(1);
                }
            });

            return {
                value: result[0].name.charAt(0).toUpperCase() + result[0].name.slice(1),
                success: true
            };
        } catch (e) {
            console.log(e);
            return {
                success: false,
                message: `Un problème est survenu lors de l'appel à https://trouve-mot.fr/api/ pour modifier 1 mot`
            };
        }
    }

    public async chooseRandomWords(): Promise<Resultat> {
        const numberOfWords = (this.gridSize - 1) * 2;

        try {
            const fetch = require('node-fetch');
            const response = await fetch(`https://trouve-mot.fr/api/sizemax/9/${numberOfWords}`);

            if (!response.ok) {
                return {
                    success: false,
                    message: `Un problème est survenu lors de l'appel à https://trouve-mot.fr/api/`
                };
            }

            const result = (await response.json()) as wordApiDto[];

            result.forEach((word) => {
                this.ChosenWords.push(word.name.charAt(0).toUpperCase() + word.name.slice(1));
            });

            if (this.ChosenWords.length < numberOfWords) {
                this.ChosenWords = [];

                return {
                    success: false,
                    message: `Il n'y a pas le bon nombre de mots sélectionnés`
                };
            }

            return {
                success: true
            };
        } catch (e) {
            console.log(e);
            return {
                success: false,
                message: `Un problème est survenu lors de l'appel à https://trouve-mot.fr/api/`
            };
        }
    }

    private findPlayer(playerId: string): ResultatValue<PlayerModel> {
        const player = this.players.find((player) => player.playerId == playerId);
        if (player === undefined) {
            return {
                success: false,
                message: `Le joueur avec l'id ${playerId} n'a pas été trouvé.`
            };
        }

        return {
            success: true,
            value: player
        };
    }

    private drawRandomPiocheCard(): string {
        const pioche = this.getCardsPioche();

        if (pioche.length == 1) {
            this.piocheEmpty = true;
        }

        if (pioche.length == 0) {
            console.log('la pioche est vide');
            return '';
        }

        const randomIndex = Math.floor(Math.random() * pioche.length);
        const randomCardPiochee = pioche[randomIndex];

        console.log(`carte piochée ${randomCardPiochee}`);

        return randomCardPiochee;
    }

    private getCardsPioche(): string[] {
        let pioche = [...this.gridCards];

        this.players.forEach((player) => {
            player.cardsInventory.forEach((card) => {
                if (pioche.includes(card)) {
                    pioche = pioche.filter((piocheCard) => piocheCard != card);
                }
            });
        });

        this.cardsDiscarded.forEach((card) => {
            if (pioche.includes(card)) {
                pioche = pioche.filter((piocheCard) => piocheCard != card);
            }
        });

        return pioche;
    }

    private setGridCards(): string[] {
        let gridCards = [];

        for (let numberIndex = 0; numberIndex < this.gridSize - 1; numberIndex++) {
            for (let letterIndex = 0; letterIndex < this.gridSize - 1; letterIndex++) {
                gridCards.push(`${this.alphabet[letterIndex]}${numberIndex + 1}`);
            }
        }

        return gridCards;
    }

    private setGridCardsState(): Map<string, boolean> {
        let gridCardsState = new Map();

        this.setGridCards().forEach((gridCard) => {
            gridCardsState.set(gridCard.toString(), false);
        });

        return gridCardsState;
    }
}

export default GameModel;
