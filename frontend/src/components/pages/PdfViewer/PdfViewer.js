// import React, { useRef, useEffect } from 'react';
// import WebViewer from '@pdftron/webviewer';

// const PdfViewer = () => {
//   const viewer = useRef(null);

//   useEffect(() => {
//     WebViewer(
//       {
//         path: '/webviewer/lib',
//         initialDoc: '../../../images/futas.pdf',
//       },
//       viewer.current
//     ).then(instance => {
//       const { documentViewer, annotationManager, Annotations } = instance.Core;

//       documentViewer.addEventListener('documentLoaded', () => {
//         const rectangleAnnot = new Annotations.RectangleAnnotation({
//           PageNumber: 1,
//           // values are in page coordinates with (0, 0) in the top left
//           X: 100,
//           Y: 150,
//           Width: 200,
//           Height: 50,
//           Author: annotationManager.getCurrentUser(),
//         });

//         annotationManager.addAnnotation(rectangleAnnot);
//         // need to draw the annotation otherwise it won't show up until the page is refreshed
//         annotationManager.redrawAnnotation(rectangleAnnot);
//       });
//     });
//   }, []);

//   return (
//     <div className='PdfViewer'>
//       <div className='header'>React sample</div>
//       <div className='webviewer' ref={viewer}></div>
//     </div>
//   );
// };

// export default PdfViewer;
