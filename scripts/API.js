/*eslint-env jquery*/
/* global store, fetchVideos, Item */
'use strict';


const API = (function() {
  const API_KEY = 'AIzaSyBXbeUJ94Ms2pEiW8Q5IsdNINtb--OvogA';
  
  const BASE_URL = 'https://www.googleapis.com/youtube/v3/search';
  
  const fetchVideos = (function(searchTerm, callback) {
    // const BASE_URL = 'https://www.googleapis.com/youtube/v3/search';
    // const API_KEY = 'AIzaSyBXbeUJ94Ms2pEiW8Q5IsdNINtb--OvogA';
    const params = {
      'maxResults': '25',
      'part': 'snippet',
      'q': searchTerm,
      'type': '',
      'key': this.API_KEY
    };
    $.getJSON(this.BASE_URL, params, callback);
  });
  
  const decorateResponse = function(response) {
    return response.items.map(function(item) {
      return {
        id: item.id.videoId, 
        thumbnail: item.snippet.thumbnails.default.url, 
        title: item.snippet.title
      };});
  };
  return{
    fetchVideos,
    decorateResponse
  };
}() );

// const decorateResponse = function(response) {
//   console.log('response is ', response);
//   return response.items.map(function(item) {
//     return {
//       id: item.id.videoId, 
//       thumbnail: item.snippet.thumbnails.default.url, 
//       title: item.snippet.title
//     };});