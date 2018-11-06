/*eslint-env jquery*/
'use strict';

const generateListItem = function(video) {
  return `
  <li data-video-id=${video.id}"${video.title}</li>
    <img src="${video.thumbnail}" alt="thumbail image">
  `;
};


// const generateVideoItemHtml = function(video) {
//   return `
//   <li data-video-id="${video.id}">${video.title}</li>
//     <img src="${video.thumbnail}" alt="thumbail image">`;
// };
