import React, { useState } from 'react';
import { Document, Page } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'; // Optional: If you need annotation layer

const PdfRenderer = ({ filePath }) => {
  const [numPages, setNumPages] = useState(null); // Total number of pages
  const [pageNumber, setPageNumber] = useState(1); // Current page

  // Function to handle when document is loaded
  const onLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const goToNextPage = () => {
    if (pageNumber < numPages) {
      setPageNumber(pageNumber + 1);
    }
  };

  const goToPreviousPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  return (
    <div className="pdf-viewer-container">
      <div className="flex justify-between mb-4">
        <button
          onClick={goToPreviousPage}
          disabled={pageNumber <= 1}
          className="px-4 py-2 bg-gray-300 rounded"
        >
          Previous
        </button>
        <span>
          Page {pageNumber} of {numPages || 1}
        </span>
        <button
          onClick={goToNextPage}
          disabled={pageNumber >= numPages}
          className="px-4 py-2 bg-gray-300 rounded"
        >
          Next
        </button>
      </div>
      <div>
        <Document
          file={filePath}
          onLoadSuccess={onLoadSuccess}
          loading={<div>Loading PDF...</div>}
        >
          <Page pageNumber={pageNumber} />
        </Document>
      </div>
    </div>
  );
};

export default PdfRenderer;
