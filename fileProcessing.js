import { MediaIngestionError } from './errors';

export function validateFile(file) {
    if (!file || !file.name) {
        throw new MediaIngestionError('Invalid file input');
    }
}

export function readFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(new MediaIngestionError('Failed to read file'));
        reader.readAsText(file);
    });
}
