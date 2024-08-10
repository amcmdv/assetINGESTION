# assetINGESTION
adventure-into-asset-ingestion-and-assetmanagement

# Media Ingestion and Analysis

## Overview
This project is a web-based application designed to ingest media files (e.g., text files), process them for entity extraction, and log detailed metadata throughout the ingestion and analysis pipeline. The system simulates the persistence of files to a data lake and logs to a database.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Architecture](#architecture)
- [Logging and Metadata](#logging-and-metadata)
- [Reference Table in Data Lake](#reference-table-in-data-lake)
- [Design Notes](#design-notes)

## Installation
To run this application locally:

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/media-ingestion-analysis.git
    ```

2. Navigate to the project directory:
    ```bash
    cd media-ingestion-analysis
    ```

3. Open the `index.html` file in your web browser.

## Usage
1. Open the application in your web browser.
2. Use the “Choose File” button to select one or more text files for ingestion.
3. Click “Ingest Media” to start the process.
4. The processing log will display detailed information about each step of the ingestion and analysis.

## Architecture
The system is designed with a modular approach, incorporating the following components:
- **File Ingestion**: Handles user file input, including validation and metadata logging.
- **Entity Extraction**: Extracts capitalized words (as a simple form of entities) from the file content.
- **Logging**: Captures detailed metadata and errors at each step of the process.
- **Persistence Simulation**: Simulates the storage of files to a data lake and logs to a database.

## Logging and Metadata
The system generates multiple log files at various integration points. Each log file captures specific metadata associated with that stage of the media ingestion process. Below is a detailed breakdown of the integration points and associated logs.

### Integration Points and Log Files

| Integration Point | Component                     | Log Files | Log File Names                                                                 | Metadata Captured                                      |
|-------------------|-------------------------------|-----------|--------------------------------------------------------------------------------|--------------------------------------------------------|
| 1                 | Media Ingestion               | 5         | logFileReceipt, logUploadDetails, logValidationStatus, logErrorDetails, logSuccessStatus | File size, Timestamp, Format, Upload duration, Validation status |
| 2                 | Semantic Extraction           | 3         | logEntityExtractionStart, logEntityExtractionEnd, logEntityDetails             | Timestamp, Entities Recognized, Entity count, Extraction duration |
| 3                 | Context Analysis              | 4         | logContextStart, logContextEnd, logContextResults, logContextErrors             | Contextual Data, Timestamp, Analysis duration, Error details |
| 4                 | Knowledge Extraction          | 4         | logKnowledgeExtractionStart, logKnowledgeExtractionEnd, logKnowledgeDetails, logKnowledgeErrors | Extracted Knowledge, Timestamp, Processing duration, Error details |
| 5                 | Entity Extraction             | 3         | logEntityRecognitionStart, logEntityRecognitionEnd, logEntityRecognitionDetails | Entities, Timestamp, Recognition duration, Error details |
| 6                 | AI/ML Models                  | 6         | logModelStart, logModelEnd, logModelDetails, logModelAccuracy, logModelErrors, logModelResults | Model Outputs, Accuracy, Timestamp, Processing duration, Error details |
| 7                 | Data Pre-processing and Cleansing | 4     | logDataCleaningStart, logDataCleaningEnd, logDataCleaningDetails, logDataCleaningErrors | Cleaned Data, Timestamp, Processing duration, Error details |
| 8                 | Data Classification/Relationship/Relevance | 5 | logClassificationStart, logClassificationEnd, logClassificationDetails, logClassificationRelationships, logClassificationErrors | Classified Data, Relationships, Timestamp, Classification duration, Error details |
| 9                 | Processed Analysis            | 4         | logAnalysisStart, logAnalysisEnd, logAnalysisResults, logAnalysisErrors         | Analysis Results, Timestamp, Analysis duration, Error details |

## Reference Table in Data Lake
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

This README.md file provides a comprehensive guide to the project, ensuring that any developer or user can understand the system’s architecture, its logging mechanisms, and how to interact with the application.





