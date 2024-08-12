export class MediaIngestionError extends Error {
    constructor(message) {
        super(message);
        this.name = 'MediaIngestionError';
    }
}

export class LogPersistenceError extends Error {
    constructor(message) {
        super(message);
        this.name = 'LogPersistenceError';
    }
}
