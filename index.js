    $(function () {
        $("#normal").colResizable({
            resizeMode: 'fit',
            partialRefresh: true,
            minWidth1: 822,
            minWidth2: 120,
        });

    });	

// Loaded via <script> tag, create shortcut to access PDF.js exports.
pdfjsLib.GlobalWorkerOptions.workerSrc = 'pdf.worker.js';

// Some PDFs need external cmaps.
//
var CMAP_URL = 'cmaps/';
var CMAP_PACKED = true;
var DEFAULT_URL = 'compressed.tracemonkey-pldi-09.pdf';
var desiredWidth = 300;
var pageNum = 1;
var pageCount;
var container = document.getElementById('pageContainer');
var _doc = null;
var promise = Promise.resolve();

// Fetch the PDF document from the URL using promises.
pdfjsLib.getDocument({
  url: DEFAULT_URL,
  cMapUrl: CMAP_URL,
  cMapPacked: CMAP_PACKED,
}).then(function (doc) {
  pageCount = doc.numPages
  _doc = doc
  promise = promise.then(function (pageNum) {
    return doc.getPage(pageNum).then(function (pdfPage) {
        var viewport = pdfPage.getViewport(1);
        var _scale =  desiredWidth / viewport.width;
      // Create the page view.
      var pdfPageView = new pdfjsViewer.PDFPageView({
        container: container,
        id: pageNum,
        scale: _scale,
        defaultViewport: pdfPage.getViewport(_scale),
        annotationLayerFactory: new pdfjsViewer.DefaultAnnotationLayerFactory(),
        renderInteractiveForms: true,
        textLayerFactory: new pdfjsViewer.DefaultTextLayerFactory()
      });
      //show numPages
      document.getElementById('page_count').innerText = pageCount
      // Associate the actual page with the view and draw it.
      pdfPageView.setPdfPage(pdfPage);
      return pdfPageView.draw();
    });
  }.bind(null, pageNum));
  // }
});

// next
function onNextPage() {
  if (pageNum >= pageCount) {
    return;
  }
  removeAllChild(container)
  pageNum++
  promise = promise.then(function (pageNum) {
    return _doc.getPage(pageNum).then(function (pdfPage) {
        var viewport = pdfPage.getViewport(1);
        var _scale =  desiredWidth / viewport.width;
      // Create the page view.
      var pdfPageView = new pdfjsViewer.PDFPageView({
        container: container,
        id: pageNum,
        scale: _scale,
        defaultViewport: pdfPage.getViewport(_scale),
        annotationLayerFactory: new pdfjsViewer.DefaultAnnotationLayerFactory(),
        renderInteractiveForms: true,
      });
      document.getElementById('page_num').innerText = pageNum
      // Associate the actual page with the view and draw it.
      pdfPageView.setPdfPage(pdfPage);
      return pdfPageView.draw();
    });
  }.bind(null, pageNum));
};
document.getElementById('next').addEventListener('click', onNextPage);

// previous
function onPreviousPage() {
  if (pageNum <= 1) {
    return;
  }
  removeAllChild(container)
  pageNum--

  promise = promise.then(function (pageNum) {
    return _doc.getPage(pageNum).then(function (pdfPage) {
        var viewport = pdfPage.getViewport(1);
        var _scale =  desiredWidth / viewport.width;
      // Create the page view.
      var pdfPageView = new pdfjsViewer.PDFPageView({
        container: container,
        id: pageNum,
        scale: _scale,
        defaultViewport: pdfPage.getViewport(_scale),
        annotationLayerFactory: new pdfjsViewer.DefaultAnnotationLayerFactory(),
        renderInteractiveForms: true,
      });
      document.getElementById('page_num').innerText = pageNum
      // Associate the actual page with the view and draw it.
      pdfPageView.setPdfPage(pdfPage);
      return pdfPageView.draw();
    });
  }.bind(null, pageNum));
};
document.getElementById('prev').addEventListener('click', onPreviousPage);

// first
function firstPage() {
  if(pageNum == 1) return ;
  pageNum = 1
  removeAllChild(container)

  promise = promise.then(function (pageNum) {
    return _doc.getPage(pageNum).then(function (pdfPage) {
        var viewport = pdfPage.getViewport(1);
        var _scale =  desiredWidth / viewport.width;
      // Create the page view.
      var pdfPageView = new pdfjsViewer.PDFPageView({
        container: container,
        id: pageNum,
        scale: _scale,
        defaultViewport: pdfPage.getViewport(_scale),
        annotationLayerFactory: new pdfjsViewer.DefaultAnnotationLayerFactory(),
        renderInteractiveForms: true,
      });
      document.getElementById('page_num').innerText = pageNum
      // Associate the actual page with the view and draw it.
      pdfPageView.setPdfPage(pdfPage);
      return pdfPageView.draw();
    });
  }.bind(null, pageNum));
}
document.getElementById('first').addEventListener('click', firstPage);

// last
function lastPage(){
  if(pageNum == pageCount)return ;
  pageNum = pageCount
  removeAllChild(container)
  promise = promise.then(function (pageNum) {
    return _doc.getPage(pageNum).then(function (pdfPage) {
        var viewport = pdfPage.getViewport(1);
        var _scale =  desiredWidth / viewport.width;
      // Create the page view.
      var pdfPageView = new pdfjsViewer.PDFPageView({
        container: container,
        id: pageNum,
        scale: _scale,
        defaultViewport: pdfPage.getViewport(_scale),
        annotationLayerFactory: new pdfjsViewer.DefaultAnnotationLayerFactory(),
        renderInteractiveForms: true,
      });
      document.getElementById('page_num').innerText = pageNum
      // Associate the actual page with the view and draw it.
      pdfPageView.setPdfPage(pdfPage);
      return pdfPageView.draw();
    });
  }.bind(null, pageNum));
}
document.getElementById('last').addEventListener('click', lastPage);


function removeAllChild(div) {
  while (div.hasChildNodes()) {
    div.removeChild(div.firstChild);
  }
}
