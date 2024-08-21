export class SynchronizeGameValuesRequest {
    static Message = 'SynchronizeGameValuesRequest';
}

export class SynchronizeGameValuesResponse {
    static Message = 'SynchronizeGameValuesResponse';

    public gridCards: Object;
    public piocheEmpty: boolean;

    constructor(gridCards: Object, piocheEmpty: boolean) {
        this.gridCards = gridCards;
        this.piocheEmpty = piocheEmpty;
    }
}
