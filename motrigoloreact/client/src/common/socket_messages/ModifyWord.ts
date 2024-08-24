export class ModifyWordRequest {
    static Message = 'ModifyWordRequest';

    public word: string;

    constructor(word: string) {
        this.word = word;
    }
}

export class ModifyWordResponse {
    static Message = 'ModifyWordResponse';

    public oldWord: string;
    public newWord: string;

    constructor(oldWord: string, newWord: string) {
        this.newWord = newWord;
        this.oldWord = oldWord;
    }
}
