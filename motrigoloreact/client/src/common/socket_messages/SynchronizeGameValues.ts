export class SynchronizeGameValuesRequest {
    static Message = 'SynchronizeGameValuesRequest';
}

export class SynchronizeGameValuesResponse {
    static Message = 'SynchronizeGameValuesResponse';

    public gridCards: Object;

    constructor(gridCards: Object) {
        this.gridCards = gridCards;
    }
}
