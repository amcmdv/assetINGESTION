import speech from '@google-cloud/speech';
import { extractTextEntities } from './textEntityExtraction';

export async function extractAudioEntities(audioBuffer) {
    const client = new speech.SpeechClient();

    const audio = {
        content: audioBuffer.toString('base64'),
    };

    const request = {
        audio: audio,
        config: {
            encoding: 'LINEAR16',
            sampleRateHertz: 16000,
            languageCode: 'en-US',
        },
    };

    const [response] = await client.recognize(request);
    const transcription = response.results
        .map(result => result.alternatives[0].transcript)
        .join('\n');

    return extractTextEntities(transcription); // Extract entities from the transcribed text
}
