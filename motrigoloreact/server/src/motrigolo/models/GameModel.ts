import GameModelError from '../GameModelError';
import PlayerModel from './PlayerModel';
import * as fs from 'fs';

class GameModel {
    private alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    private cardsDiscarded: string[];
    private ChosenWords: string[];

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

    public FlipOverCard(IndexCard: string): boolean | GameModelError {
        if (this.GridCardsState.has(IndexCard)) {
            const value = this.GridCardsState.get(IndexCard);

            this.GridCardsState.set(IndexCard, !value);
            return !value;
        }

        return GameModelError.gameUndefined;
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

    public addCardToPlayerInventory(playerId: string): string | GameModelError {
        const player = this.players.find((player) => player.playerId == playerId);

        if (player == undefined) {
            return new GameModelError(`${GameModelError.joueurUndefined} ${GameModelError.cannotAddCardToInventory}`);
        }

        const randomCard = this.drawRandomPiocheCard();

        return player.addCardToInventory(randomCard);
    }

    public removeCardFromPlayerInventory(playerId: string, card: string): string | GameModelError {
        const player = this.players.find((player) => player.playerId == playerId);

        if (player == undefined) {
            return new GameModelError(`${GameModelError.joueurUndefined} ${GameModelError.cannotRemoveCardFromInventory}`);
        }

        this.cardsDiscarded.push(card);
        return player.removeCardFromInventory(card);
    }

    public chooseRandomWords(numberWords: number): string[] {
        for (let index = 0; index < numberWords; index++) {
            const filePath = '../../motrigoloreact/server/src/Assets/DictionnairesMots.txt';
            const fileContent = fs.readFileSync(filePath, 'utf-8');

            // Extraire chaque mot
            const wordsArray = fileContent.split(' ');

            const randomIndex = Math.floor(Math.random() * wordsArray.length);
            this.ChosenWords.push(wordsArray[randomIndex]);
        }

        return this.ChosenWords;
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

        console.log(`les cartes de la pioche sont ${pioche}`);
        return pioche;
    }

    private setGridCards(): string[] {
        let gridCards = [];

        for (let numberIndex = 0; numberIndex < this.gridSize - 1; numberIndex++) {
            for (let letterIndex = 0; letterIndex < this.gridSize - 1; letterIndex++) {
                gridCards.push(`${this.alphabet[letterIndex]}${numberIndex + 1}`);
            }
        }

        console.log(`les cartes de la grille sont ${gridCards}`);
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
