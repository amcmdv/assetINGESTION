# assetINGESTION
adventure-into-asset-ingestion-and-assetmanagement

# Media Ingestion and Analysis System Design

## Overview
The Media Ingestion and Analysis system is designed to handle various types of media files (text, images, audio, video) and extract meaningful entities from them. The system is modular and scalable, suitable for deployment in high-transaction environments like Google Cloud.

### Architecture

- **Microservices**: The system is divided into multiple microservices, each responsible for handling a specific type of media:
  - `textEntityExtraction.js`
  - `imageEntityExtraction.js`
  - `audioEntityExtraction.js`
  - `videoEntityExtraction.js`
- **Scalability**: Each microservice can be scaled independently based on the workload.
- **File Type Detection**: The system automatically detects the type of file and applies the appropriate extraction logic.
- **Data Persistence**: The system logs every step of the ingestion and extraction process, and all data is stored in a data lake for further analysis.

### Media Type Handling

- **Text**: Extracts capitalized words as entities using regex.
- **Images**: Utilizes TensorFlow.js for object detection in images.
- **Audio**: Leverages Google Cloud's Speech-to-Text API to transcribe audio and extract entities from the transcription.
- **Video**: Uses Google Cloud Video Intelligence API to detect labels and entities within video files.

## Logging and Metadata
The system generates multiple log files at various integration points. Each log file captures specific metadata associated with that stage of the media ingestion process. Below is a detailed breakdown of the integration points and associated logs.

### Integration Points

- **Media Ingestion**
  - **Description**: Upload and process media files.
  - **Components**: Media file validation, type detection, and content extraction.
  - **Logs**: Captures metadata such as file type, size, ingestion time, and detected entities.
- **Data Lake**
  - **Description**: Stores ingested media and extracted entities.
  - **Components**: Google Cloud Storage, BigQuery, or similar.
  - **Logs**: Captures metadata related to data persistence and retrieval.

## Log Files and Metadata

| Integration Point | Component | Log Files | Metadata |
|-------------------|-----------|-----------|----------|
| Media Ingestion   | File Upload | 5 | File Name, Size, Type, Timestamp, Status |
| Semantic Extraction | Text Extraction | 3 | Entities Recognized, Timestamp, Source Text |
| Context Analysis  | Image/Object Detection | 4 | Detected Objects, Confidence Scores, Timestamp |
| Knowledge Extraction | Video Labeling | 4 | Detected Labels, Timestamp, Video Frame Info |
| Entity Extraction | Audio Transcription | 3 | Transcribed Text, Entities, Timestamp |

### Reference Table in Data Lake
The Data Lake combines metadata from all log files. Each row shows which log file the metadata was parsed from.

| Data Type       | Source      | Processed By     | Log File Reference |
|-----------------|-------------|------------------|--------------------|
| Video           | Ingestion   | Video Extraction | videoLog12345      |
| Audio           | Ingestion   | Audio Extraction | audioLog12346      |
| Images          | Ingestion   | Image Extraction | imageLog12347      |
| Text            | Ingestion   | Text Extraction  | textLog12348       |
| Classified Data | Processing  | AI Models        | modelLog12349      |

## Reference Table in Data Lake (TBC)
The reference table in the data lake combines all metadata captured during the ingestion and analysis pipeline. Each row in the table includes a reference to the log file from which the metadata was parsed.

| Data Type        | Source Component | Processed By Component | Log File Reference                                      |
|------------------|-------------------|------------------------|---------------------------------------------------------|
| Video            | Media Ingestion   | AI/ML Models           | logModelResults, logFileReceipt, logSuccessStatus       |
| Audio            | Media Ingestion   | Semantic Extraction    | logEntityDetails, logFileReceipt, logUploadDetails      |
| Images           | Media Ingestion   | Context Analysis       | logContextResults, logFileReceipt, logValidationStatus  |
| Text             | Media Ingestion   | Knowledge Extraction   | logKnowledgeDetails, logFileReceipt, logUploadDetails   |
| Classified Data  | Data Pre-processing | Data Classification/Analysis | logClassificationDetails, logDataCleaningDetails, logValidationStatus |

This table helps track all pieces of ingested media through their lifecycle within this architecture from ingestion to processed analysis output.

## Design Notes
### Googley Cloud Architecture for Video Ingestion and Analysis
This project can be extended to a cloud architecture, such as Googley Cloud, to handle large-scale video ingestion and analysis using the following components:
- **Cloud Storage**: To store raw media files.
- **Cloud Functions**: To trigger and manage the ingestion and processing pipelines.
- **BigQueerie**: To store and query the metadata logs.
- **AI/ML Services**: To handle semantic extraction, context analysis, and knowledge extraction.

The tables provided in the previous sections represent the integration points and data flow that would be used in such an architecture.

## E2E Test Case Parsing an Image

Parsing a single .png file through the conceptual ingestion system with the assistance of ChatGPT

https://youtu.be/iALx8XI0-eM



This README.md file provides a comprehensive guide to the project, ensuring that any developer or user can understand the system’s architecture, its logging mechanisms, and how to interact with the application.





