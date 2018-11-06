/*eslint-env jquery*/
/* global store, API, Item */
'use strict';

const VideoList = function() {

  const generateListItem = function(video) {
    return `
    <li data-video-id="${video.id}">${video.title}</li>
      <img src="${video.thumbnail}" alt="thumbail image">
    `;
  };
  
  const render = function() {
    const videosToDOM = store.videos.map(video => generateListItem(video)).join();
    $('ul').html(videosToDOM); 
  };

  const handleFormSubmit = function() {
    $('form').on('submit', function(event){
      // console.log('form ran');
      event.preventDefault();
      const searchResult = $(event.currentTarget).find('#search-term').val();
      console.log(searchResult);
      $('#search-term').val('');
      console.log(API.fetchVideos);
      API.fetchVideos(searchResult, (x) => {
        const decorated = API.decorateResponse(x);
        store.setVideos(decorated);
        console.log(store.videos);
        render();
      });
    });};

  const bindEventListeners = function() {
    handleFormSubmit();
  };
  
  return {
    generateListItem,
    render,
    handleFormSubmit,
    bindEventListeners,
  };

}();
