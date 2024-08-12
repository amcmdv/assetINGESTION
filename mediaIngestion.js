import { validateFile, readFile } from './fileProcessing';
import { extractEntities } from './entityExtraction';
import { persistToDataLake, persistLog } from './persistence';
import { MediaIngestionError, LogPersistenceError } from './errors';
import { createLogEntry, logProcessingError } from './logging';

export async function ingestMedia(files) {
    const log = [];

    try {
        for (const file of files) {
            try {
                // Validate and process each file
                validateFile(file);
                const content = await readFile(file);
                const entities = extractEntities(content);
                const logEntry = createLogEntry(file.name, entities);
               
                // Persist data
                await persistToDataLake(file);
                await persistLog(logEntry);
               
                log.push(logEntry);
            } catch (error) {
                logProcessingError(error, file.name, log);
            }
        }
    } catch (error) {
        console.error('Error during media ingestion:', error);
        displayError(error.message);
    } finally {
        return log.join('\n\n');
    }
}
