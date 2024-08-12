import { LogPersistenceError } from './errors';

export function createLogEntry(fileName, entities) {
    return `File: ${fileName}\nEntities: ${entities.join(', ')}`;
}

export function logProcessingError(error, fileName, log) {
    console.error(`Error processing file ${fileName}:`, error);
    log.push(`Error processing file ${fileName}: ${error.message}`);
}

export function displayError(message) {
    alert(`An error occurred: ${message}`);
}
