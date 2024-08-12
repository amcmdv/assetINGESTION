# Media Ingestion and Analysis System

## Overview
This project provides a scalable system for ingesting and analysing various types of media files, including text, images, audio, and video. The system is designed for deployment in a high-transaction environment such as Google Cloud, where it can be integrated as a series of microservices.

## Features
- **Multi-media Support**: Handles text, images, audio, and video files.
- **Scalable Microservices**: Each media type is processed by a separate microservice.
- **Cloud-Ready**: Optimised for deployment on Google Cloud Platform.
- **Data Lake Integration**: Stores ingested media and extracted entities in a centralised data lake.
- **Log Files**: Detailed logging for each step of the ingestion and extraction process.

## Architecture
- **Media Ingestion**: Handles file upload, validation, and type detection.
- **Entity Extraction**: Extracts meaningful entities from the media using dedicated microservices.
  - Text: Extracts capitalized words as entities.
  - Images: Uses object detection models.
  - Audio: Transcribes and extracts entities from audio files.
  - Video: Detects labels and entities in video content.
- **Data Persistence**: Stores data and logs in a data lake.
 
## Usage

1. **Setup**: Clone the repository and install dependencies.
2. **Run**: Open `index.html` in a browser to access the media ingestion UI.
3. **Deploy**: Use Docker or Google Cloud Run to deploy each microservice.

## Project Structure

- **index.html**: Main HTML file.
- **mediaIngestion.js**: Handles media ingestion logic.
- **textEntityExtraction.js**: Extracts entities from text files.
- **imageEntityExtraction.js**: Detects objects in images.
- **audioEntityExtraction.js**: Transcribes and extracts entities from audio files.
- **videoEntityExtraction.js**: Detects labels in video files.
- **logPersistence.js**: Handles log file creation and data persistence.
- **Design.md**: Detailed design notes and architecture description.

## Design Notes
Please refer to `Design.md` for an in-depth look at the system architecture and design decisions, including the use of microservices, scalability considerations, and integration points.
