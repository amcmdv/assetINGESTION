import videoIntelligence from '@google-cloud/video-intelligence';

export async function extractVideoEntities(videoBuffer) {
    const client = new videoIntelligence.VideoIntelligenceServiceClient();

    const request = {
        inputContent: videoBuffer.toString('base64'),
        features: ['LABEL_DETECTION', 'SHOT_CHANGE_DETECTION', 'EXPLICIT_CONTENT_DETECTION'],
    };

    const [operation] = await client.annotateVideo(request);
    const [response] = await operation.promise();

    const segmentAnnotations = response.annotationResults[0].segmentLabelAnnotations;
    const shotAnnotations = response.annotationResults[0].shotAnnotations;
    const explicitAnnotation = response.annotationResults[0].explicitAnnotation;

    // Combine all relevant annotations into a single array
    const allAnnotations = segmentAnnotations.concat(shotAnnotations, explicitAnnotation || []);

    // Extract relevant information and format as JSON
    const formattedAnnotations = allAnnotations.map(annotation => {
        const { description, confidence, startTimeOffset, endTimeOffset } = annotation.entity;
        return {
            description,
            confidence: confidence || 0, // Set default confidence value if not provided
            startTime: startTimeOffset ? startTimeOffset.seconds : null,
            endTime: endTimeOffset ? endTimeOffset.seconds : null,
        };
    });

    return formattedAnnotations;
}
