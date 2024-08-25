export class UpdateCursorPositionRequest {
    static Message = 'UpdateCursorPositionRequest';

    public cursorX: number;
    public cursorY: number;
    public socketId: string;
    public gameId: string;

    constructor(cursorX: number, cursorY: number, gameId: string, socketId: string) {
        this.cursorX = cursorX;
        this.cursorY = cursorY;
        this.socketId = socketId;
        this.gameId = gameId;
    }
}

export class UpdateCursorPositionResponse {
    static Message = 'UpdateCursorPositionResponse';

    public cursorX: number;
    public cursorY: number;
    public socketId: string;
    public logo: string;

    constructor(cursorX: number, cursorY: number, socketId: string, logo: string) {
        this.cursorX = cursorX;
        this.cursorY = cursorY;
        this.socketId = socketId;
        this.logo = logo;
    }
}
