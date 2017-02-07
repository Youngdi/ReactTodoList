importScripts('html5-curves.js'); // eslint-disable-line

self.addEventListener('message', function(oEvent) { // eslint-disable-line
  const supportPoints = bezier(oEvent.data[0]); // eslint-disable-line
  // console.log(supportPoints);
  self.postMessage([supportPoints, oEvent.data[1]]); // eslint-disable-line
}, false);
