// src/app/(dashboard)/apps/VOI/Example/page.tsx

import PdfViewer from './PdfViewer';

const ExamplePage = () => {
  return (
    <div>
      <h1>Example PDF Viewer</h1>
      <PdfViewer file="/apps/VOI/Example/example.pdf" />
    </div>
  );
};

export default ExamplePage;
