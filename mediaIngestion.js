/**
 * Custom error class for handling media ingestion errors.
 */
class MediaIngestionError extends Error {
    constructor(message) {
        super(message);
        this.name = 'MediaIngestionError';
    }
}

/**
 * Custom error class for handling log persistence errors.
 */
class LogPersistenceError extends Error {
    constructor(message) {
        super(message);
        this.name = 'LogPersistenceError';
    }
}

/**
 * Function to handle the media ingestion process.
 */
async function ingestMedia() {
    const files = document.getElementById('mediaInput').files;
    const log = [];

    try {
        for (const file of files) {
            try {
                validateFile(file);
                const content = await readFile(file);
                const entities = extractEntities(content);
                const logEntry = createLogEntry(file.name, entities);
                log.push(logEntry);
                persistToDataLake(file);
                persistLog(logEntry);
            } catch (error) {
                console.error(`Error processing file ${file.name}:`, error);
                log.push(`Error processing file ${file.name}: ${error.message}`);
            }
        }
    } catch (error) {
        console.error('Error during media ingestion:', error);
        displayError(error.message);
    } finally {
        document.getElementById('logOutput').textContent = log.join('\n\n');
    }
}

/**
 * Validates the file input.
 * @param {File} file - The file object to be validated.
 * @throws {MediaIngestionError} - If the file is invalid.
 */
function validateFile(file) {
    if (!file || !file.name) {
        throw new MediaIngestionError('Invalid file input');
    }
}

/**
 * Reads the content of the file.
 * @param {File} file - The file object to be read.
 * @returns {Promise<string>} - A promise that resolves with the file content.
 */
function readFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(new MediaIngestionError('Failed to read file'));
        reader.readAsText(file);
    });
}

/**
 * Extracts entities from the provided text.
 * @param {string} text - The text content to extract entities from.
 * @returns {Array<string>} - An array of extracted entities.
 */
function extractEntities(text) {
    const entityRegex = /\b[A-Z][a-z]*\b/g; // Simple regex to match capitalized words (entities)
    return text.match(entityRegex) || [];
}

/**
 * Creates a log entry for the processed file.
 * @param {string} fileName - The name of the file.
 * @param {Array<string>} entities - The extracted entities.
 * @returns {string} - The formatted log entry.
 */
function createLogEntry(fileName, entities) {
    return `File: ${fileName}\nEntities: ${entities.join(', ')}`;
}

/**
 * Simulates persisting the file to a data lake.
 * @param {File} file - The file object to be persisted.
 * @throws {MediaIngestionError} - If persisting the file fails.
 */
function persistToDataLake(file) {
    try {
        console.log(`Persisting ${file.name} to data lake...`);
    } catch (error) {
        throw new MediaIngestionError('Failed to persist file to data lake');
    }
}

/**
 * Simulates persisting the log entry to a database.
 * @param {string} logEntry - The log entry to be persisted.
 * @throws {LogPersistenceError} - If persisting the log entry fails.
 */
function persistLog(logEntry) {
    try {
        console.log(`Persisting log entry to database:\n${logEntry}`);
    } catch (error) {
        throw new LogPersistenceError('Failed to persist log entry');
    }
}

/**
 * Displays an error message in an alert.
 * @param {string} message - The error message to be displayed.
 */
function displayError(message) {
    alert(`An error occurred: ${message}`);
}
