import React from 'react';

class GameSettings {
    nombreCartesParRangees: number;
    cursorImage: string;

    constructor(nombreCartesParRangees: number = 6) {
        this.nombreCartesParRangees = nombreCartesParRangees;
        this.cursorImage = this.getRandomCursor();
    }

    public getRandomCursor(): string {
        const cursorsAvailable: string[] = [
            this.getCursorPath('blanc_0'),
            this.getCursorPath('blanc_1'),
            this.getCursorPath('bleu_1'),
            this.getCursorPath('bleu_0'),
            this.getCursorPath('test')
        ];
        const randomIndex = Math.floor(Math.random() * cursorsAvailable.length);
        return cursorsAvailable[randomIndex];
    }

    private getCursorPath(path: string) {
        return `url(/images/cursors/${path}.png)`;
    }
}

export default GameSettings;
