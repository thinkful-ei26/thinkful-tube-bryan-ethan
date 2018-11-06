/*eslint-env jquery*/
/* global store, cuid, Item */
'use strict';

const store = (function(){
  const videos = [

  ];

  const setVideos = function(videos){
    this.videos = videos;
  };

  return {
    videos,
    setVideos
  };
}() );