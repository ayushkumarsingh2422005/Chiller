import React, { useEffect, useRef } from 'react';
import { renderAsync } from 'docx-preview';

const DocxRenderer = ({ filePath }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const fetchDocxFile = async () => {
      const response = await fetch(filePath);
      const arrayBuffer = await response.arrayBuffer();

      if (containerRef.current) {
        renderAsync(arrayBuffer, containerRef.current, null)
          .catch((err) => console.error('Error rendering .docx file:', err));
      }
    };

    fetchDocxFile();
  }, [filePath]);

  return (
    <div
      ref={containerRef}
      className="docx-container w-full max-w-full overflow-x-auto text-sm md:text-base"
    />
  );
};

export default DocxRenderer;
