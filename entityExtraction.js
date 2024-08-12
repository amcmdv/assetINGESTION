import { extractTextEntities } from './textEntityExtraction';
import { extractImageEntities } from './imageEntityExtraction';
import { extractAudioEntities } from './audioEntityExtraction';
import { extractVideoEntities } from './videoEntityExtraction';

export function extractEntities(mediaType, content) {
    switch (mediaType) {
        case 'text':
            return extractTextEntities(content);
        case 'image':
            return extractImageEntities(content);
        case 'audio':
            return extractAudioEntities(content);
        case 'video':
            return extractVideoEntities(content);
        default:
            throw new Error(`Unsupported media type: ${mediaType}`);
    }
}

export function detectMediaType(file) {
    const fileType = file.type.split('/')[0];
    switch (fileType) {
        case 'text':
        case 'application': // For text documents (e.g., PDF, Word)
            return 'text';
        case 'image':
            return 'image';
        case 'audio':
            return 'audio';
        case 'video':
            return 'video';
        default:
            throw new Error(`Unsupported file type: ${fileType}`);
    }
}
