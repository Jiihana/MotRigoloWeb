class GameSettings {
    cursorImage: string;

    constructor() {
        this.cursorImage = this.getRandomCursor();
    }

    public getRandomCursor(): string {
        const cursorsAvailable: string[] = [
            this.getCursorPath('blanc_0'),
            this.getCursorPath('blanc_1'),
            this.getCursorPath('bleu_0'),
            this.getCursorPath('bleu_1'),
            this.getCursorPath('rose_0'),
            this.getCursorPath('rose_1'),
            this.getCursorPath('vert_0'),
            this.getCursorPath('vert_1')
        ];
        const randomIndex = Math.floor(Math.random() * cursorsAvailable.length);
        return cursorsAvailable[randomIndex];
    }

    private getCursorPath(path: string) {
        return `url(/images/cursors/${path}.png)`;
    }
}

export default GameSettings;
