import vision from '@google-cloud/vision';

// Initialise the Vision client for image processing
const visionClient = new vision.ImageAnnotatorClient();

export async function extractImageEntities(imageBuffer) {
    const [result] = await visionClient.annotateImage({
        image: { content: imageBuffer },
        features: [
            { type: 'LABEL_DETECTION' },
            { type: 'TEXT_DETECTION' },
            { type: 'FACE_DETECTION' },
            { type: 'LOGO_DETECTION' },
            { type: 'LANDMARK_DETECTION' },
        ],
    });


  
    return {
        labels: result.labelAnnotations.map(label => label.description),
        texts: result.textAnnotations.map(text => text.description),
        faces: result.faceAnnotations,
        logos: result.logoAnnotations.map(logo => logo.description),
        landmarks: result.landmarkAnnotations.map(landmark => landmark.description),
    };
}


