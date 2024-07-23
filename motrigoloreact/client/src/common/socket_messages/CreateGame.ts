export class CreateGameRequest {
	static Message = 'CreateGameRequest';
}

export class CreateGameResponse {
	static Message = 'CreateGameResponse';

	public gameId: string;

	constructor(gameId: string) {
		this.gameId = gameId;
	}
}
