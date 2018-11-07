/*eslint-env jquery*/
/* global store, fetchVideos, Item, API */
'use strict';

const VideoList = (function(){

  const generateListItem = function(video) {
    return `
    <li data-video-id=${video.id}">${video.title}</li>
      <img src="${video.thumbnail}" alt="thumbail image">
    `;
  };

  const render = function() {
    const videosToDOM = store.videos.map(video => generateListItem(video)).join();
    $('ul').html(videosToDOM);
  };

  const handleFormSubmit = function() {
    $('form').on('submit', function(event){
      event.preventDefault();
      const searchResult = $(event.currentTarget).find('#search-term').val();
      $('#search-term').val('');
      API.fetchVideos(searchResult, (x) => {
        store.setVideos(API.decorateResponse(x));
        render();
      });
    });
  };

  const bindEventListener = function(){
    handleFormSubmit();
  };
  
  
  return {
    render,
    bindEventListener
  };
} () );