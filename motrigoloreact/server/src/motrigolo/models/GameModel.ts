import PlayerModel from './PlayerModel';
import * as fs from 'fs';
import { ResultatValue } from '../GameModelError';

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

    public addPlayer(playerId: string) {
        this.players.push(new PlayerModel(playerId));
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

    public chooseRandomWords(numberWords: number): string[] {
        const filePath = '../../motrigoloreact/server/src/Assets/DictionnairesMots.txt';
        const fileContent = fs.readFileSync(filePath, 'utf-8');

        const wordsArray = fileContent.split(' ');

        while (this.ChosenWords.length < numberWords) {
            const randomIndex = Math.floor(Math.random() * wordsArray.length);

            const selectedWord = wordsArray[randomIndex];

            // Vérifier si le mot n'est pas déjà sélectionné
            if (!this.ChosenWords.includes(selectedWord)) {
                this.ChosenWords.push(selectedWord);
            }
        }

        return this.ChosenWords;
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
