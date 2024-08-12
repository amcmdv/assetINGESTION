import videoIntelligence from '@google-cloud/video-intelligence';

export async function extractVideoEntities(videoBuffer) {
    const client = new videoIntelligence.VideoIntelligenceServiceClient();

    const request = {
        inputContent: videoBuffer.toString('base64'),
        features: ['LABEL_DETECTION'],
    };

    const [operation] = await client.annotateVideo(request);
    const [response] = await operation.promise();

    const annotations = response.annotationResults[0].segmentLabelAnnotations;

    return annotations.map(annotation => annotation.entity.description);
}
