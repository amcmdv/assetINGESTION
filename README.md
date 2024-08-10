# assetINGESTION
adventure-into-asset-ingestion-and-assetmanagement
# Media Ingestion and Analysis

## Overview
This project provides a simple web-based tool for ingesting and analyzing media files. Users can upload files, extract entities (such as capitalized words), and view a processing log. The tool simulates the persistence of files and logs to a data lake and a database.

## Features
- **Media Ingestion**: Upload and process multiple media files.
- **Entity Extraction**: Automatically extract entities (capitalized words) from text content.
- **Error Handling**: Graceful error handling with custom error messages.
- **Logging**: Detailed processing logs are generated for each file.

## Project Structure
- **index.html**: The main HTML file containing the structure of the web page.
- **mediaIngestion.js**: The JavaScript file that contains the logic for media ingestion, file reading, entity extraction, and logging.

## How to Use
1. Clone the repository.
2. Open `index.html` in a web browser.
3. Use the file input to select one or more media files (text files).
4. Click the "Ingest Media" button to process the files.
5. View the processing log on the webpage.

## Error Handling
- **MediaIngestionError**: Raised for issues related to media ingestion, such as invalid files.
- **LogPersistenceError**: Raised for issues related to persisting log entries.

## Future Enhancements
- Add support for more complex entity extraction using NLP libraries.
- Implement actual persistence to a database and data lake.
- Improve the UI for better user experience.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
