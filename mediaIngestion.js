class MediaIngestionError extends Error {
    constructor(message) {
        super(message);
        this.name = 'MediaIngestionError';
    }
}

class LogPersistenceError extends Error {
    constructor(message) {
        super(message);
        this.name = 'LogPersistenceError';
    }
}

// Main function to ingest media
async function ingestMedia() {
    const files = document.getElementById('mediaInput').files;
    const log = [];

    try {
        for (const file of files) {
            const fileLogs = [];
            try {
                logFileReceipt(file, fileLogs);
                validateFile(file, fileLogs);
                const content = await readFile(file, fileLogs);
                const entities = extractEntities(content, fileLogs);
                const logEntry = createLogEntry(file.name, entities, fileLogs);
                persistToDataLake(file, fileLogs);
                persistLog(logEntry, fileLogs);
            } catch (error) {
                handleError(error, file.name, fileLogs);
            } finally {
                log.push(...fileLogs);
            }
        }
    } catch (error) {
        displayError('Error during media ingestion', error.message);
    } finally {
        document.getElementById('logOutput').textContent = log.join('\n\n');
    }
}

// Logs the initial receipt of the file
function logFileReceipt(file, fileLogs) {
    const logEntry = `Received file: ${file.name}, Size: ${file.size} bytes, Type: ${file.type}, Timestamp: ${new Date().toISOString()}`;
    fileLogs.push(logEntry);
}

// Validates the file
function validateFile(file, fileLogs) {
    if (!file || !file.name) {
        throw new MediaIngestionError('Invalid file input');
    }
    const logEntry = `File validated: ${file.name}, Timestamp: ${new Date().toISOString()}`;
    fileLogs.push(logEntry);
}

// Reads the file content
function readFile(file, fileLogs) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            fileLogs.push(`File read successfully: ${file.name}, Size: ${file.size} bytes, Timestamp: ${new Date().toISOString()}`);
            resolve(reader.result);
        };
        reader.onerror = () => {
            reject(new MediaIngestionError('Failed to read file'));
        };
        reader.readAsText(file);
    });
}

// Extracts entities from the file content
function extractEntities(text, fileLogs) {
    const entityRegex = /\b[A-Z][a-z]*\b/g; // Simple regex to match capitalized words (entities)
    const entities = text.match(entityRegex) || [];
    fileLogs.push(`Entities extracted: ${entities.join(', ')}, Timestamp: ${new Date().toISOString()}`);
    return entities;
}

// Creates a log entry for the file
function createLogEntry(fileName, entities, fileLogs) {
    const logEntry = `Log Entry - File: ${fileName}, Entities: ${entities.join(', ')}, Timestamp: ${new Date().toISOString()}`;
    fileLogs.push(`Log entry created for ${fileName}`);
    return logEntry;
}

// Simulates persisting the file to a data lake
function persistToDataLake(file, fileLogs) {
    try {
        // Simulated persistence logic
        const logEntry = `Persisted ${file.name} to data lake, Timestamp: ${new Date().toISOString()}`;
        fileLogs.push(logEntry);
    } catch (error) {
        throw new MediaIngestionError('Failed to persist file to data lake');
    }
}

// Simulates persisting the log to a database
function persistLog(logEntry, fileLogs) {
    try {
        // Simulated persistence logic
        const logPersistEntry = `Persisted log entry to database: ${logEntry}, Timestamp: ${new Date().toISOString()}`;
        fileLogs.push(logPersistEntry);
    } catch (error) {
        throw new LogPersistenceError('Failed to persist log entry');
    }
}

// Handles errors encountered during the process
function handleError(error, fileName, fileLogs) {
    const logEntry = `Error processing file ${fileName}: ${error.message}, Timestamp: ${new Date().toISOString()}`;
    fileLogs.push(logEntry);
    console.error(logEntry);
}

// Displays an error to the user
function displayError(title, message) {
    alert(`${title}: ${message}`);
}





