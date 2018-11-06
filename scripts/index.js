/*eslint-env jquery*/
/* global store, fetchVideos, Item, API */
'use strict';

// const API_KEY = 'AIzaSyBXbeUJ94Ms2pEiW8Q5IsdNINtb--OvogA';

/*
  We want our store to hold an array of "decorated" video objects - i.e. objects that
  have been transformed into ONLY the necessary data we're displaying on our page. 
  (Removes extraneous dataset from Youtube.)
  
  Example decorated video object:
  
  {
    id: '98ds8fbsdy67',
    title: 'Cats dancing the Macarena',
    thumbnail: 'https://img.youtube.com/some/thumbnail.jpg'
  }
*/
const MOCK_DATA = 
{
  'kind': 'youtube#searchListResponse',
  'etag': '"XI7nbFXulYBIpL0ayR_gDh3eu1k/nZOD55SOgBwyJJ2-wp0_aVF9PpE"',
  'nextPageToken': 'CBkQAA',
  'regionCode': 'US',
  'pageInfo': {
    'totalResults': 1000000,
    'resultsPerPage': 25
  },
  'items': [
    {
      'kind': 'youtube#searchResult',
      'etag': '"XI7nbFXulYBIpL0ayR_gDh3eu1k/1aQLY34RDQFBsae0OljENxiEEIQ"',
      'id': {
        'kind': 'youtube#video',
        'videoId': 'rAt1vxwQG9c'
      },
      'snippet': {
        'publishedAt': '2018-11-01T18:34:01.000Z',
        'channelId': 'UCZjpAMIiwyNv5GGzrOI2NRQ',
        'title': 'Funny And Cute Golden Retriever Puppies Compilation #36',
        'description': 'Funny And Cute Golden Retriever Puppies Compilation #36 ------------------------------------------------------------------------------------------------ ☆Don\'t forget to subscribe ...',
        'thumbnails': {
          'default': {
            'url': 'https://i.ytimg.com/vi/rAt1vxwQG9c/default.jpg',
            'width': 120,
            'height': 90
          },
          'medium': {
            'url': 'https://i.ytimg.com/vi/rAt1vxwQG9c/mqdefault.jpg',
            'width': 320,
            'height': 180
          },
          'high': {
            'url': 'https://i.ytimg.com/vi/rAt1vxwQG9c/hqdefault.jpg',
            'width': 480,
            'height': 360
          }
        },
        'channelTitle': 'Puppies Lover',
        'liveBroadcastContent': 'none'
      }
    },
    {
      'kind': 'youtube#searchResult',
      'etag': '"XI7nbFXulYBIpL0ayR_gDh3eu1k/AzYbaP5XJbbc7Pm33Yuy84eQwPE"',
      'id': {
        'kind': 'youtube#video',
        'videoId': '4sEV1lMn64k'
      },
      'snippet': {
        'publishedAt': '2018-01-01T07:33:18.000Z',
        'channelId': 'UCZjpAMIiwyNv5GGzrOI2NRQ',
        'title': 'Funny And Cute Husky Puppies Compilation #7',
        'description': 'Funny And Cute Husky Puppies Compilation #7 ------------------------------------------------------------------------------------------------ ☆Don\'t forget to subscribe my channel ...',
        'thumbnails': {
          'default': {
            'url': 'https://i.ytimg.com/vi/4sEV1lMn64k/default.jpg',
            'width': 120,
            'height': 90
          },
          'medium': {
            'url': 'https://i.ytimg.com/vi/4sEV1lMn64k/mqdefault.jpg',
            'width': 320,
            'height': 180
          },
          'high': {
            'url': 'https://i.ytimg.com/vi/4sEV1lMn64k/hqdefault.jpg',
            'width': 480,
            'height': 360
          }
        },
        'channelTitle': 'Puppies Lover',
        'liveBroadcastContent': 'none'
      }
    },
    {
      'kind': 'youtube#searchResult',
      'etag': '"XI7nbFXulYBIpL0ayR_gDh3eu1k/oahRXUHp-V9IWUWv72modR6szEI"',
      'id': {
        'kind': 'youtube#video',
        'videoId': 'WxJ4mab4Vns'
      },
      'snippet': {
        'publishedAt': '2018-10-07T04:02:57.000Z',
        'channelId': 'UCq5hgY37WAryZCwmehDyCaQ',
        'title': 'So many cute puppies videos compilation 2018',
        'description': 'So many cute puppies videos compilation 2018 ▻Subscribe for new video: http://goo.gl/Koxcb0 ▻Fanpage: http://goo.gl/8JZskX ▻Thanks For Watching !',
        'thumbnails': {
          'default': {
            'url': 'https://i.ytimg.com/vi/WxJ4mab4Vns/default.jpg',
            'width': 120,
            'height': 90
          },
          'medium': {
            'url': 'https://i.ytimg.com/vi/WxJ4mab4Vns/mqdefault.jpg',
            'width': 320,
            'height': 180
          },
          'high': {
            'url': 'https://i.ytimg.com/vi/WxJ4mab4Vns/hqdefault.jpg',
            'width': 480,
            'height': 360
          }
        },
        'channelTitle': 'Funny Animals',
        'liveBroadcastContent': 'none'
      }
    },
    {
      'kind': 'youtube#searchResult',
      'etag': '"XI7nbFXulYBIpL0ayR_gDh3eu1k/zKO6y6yIGXApsJ3U8gsDeeWy_TQ"',
      'id': {
        'kind': 'youtube#video',
        'videoId': '_liHUynNpYc'
      },
      'snippet': {
        'publishedAt': '2018-10-09T17:33:40.000Z',
        'channelId': 'UCZjpAMIiwyNv5GGzrOI2NRQ',
        'title': 'Funny And Cute Golden Retriever Puppies Compilation #34',
        'description': 'Funny And Cute Golden Retriever Puppies Compilation #34 ------------------------------------------------------------------------------------------------ ☆Don\'t forget to subscribe ...',
        'thumbnails': {
          'default': {
            'url': 'https://i.ytimg.com/vi/_liHUynNpYc/default.jpg',
            'width': 120,
            'height': 90
          },
          'medium': {
            'url': 'https://i.ytimg.com/vi/_liHUynNpYc/mqdefault.jpg',
            'width': 320,
            'height': 180
          },
          'high': {
            'url': 'https://i.ytimg.com/vi/_liHUynNpYc/hqdefault.jpg',
            'width': 480,
            'height': 360
          }
        },
        'channelTitle': 'Puppies Lover',
        'liveBroadcastContent': 'none'
      }
    },
    {
      'kind': 'youtube#searchResult',
      'etag': '"XI7nbFXulYBIpL0ayR_gDh3eu1k/RVdjXkew6dqXs8cW1ENNdVH6c4U"',
      'id': {
        'kind': 'youtube#video',
        'videoId': 'UiBBfWyApyA'
      },
      'snippet': {
        'publishedAt': '2017-06-11T13:00:03.000Z',
        'channelId': 'UCPIvT-zcQl2H0vabdXJGcpg',
        'title': 'Try Not To Laugh | Funny Puppies Video Compilation 2017',
        'description': 'From puppies confused by their own hiccups, puppies trying to bite a dog\'s tail, to puppies sitting in a watermelon and eating it, these are just a few of the funny ...',
        'thumbnails': {
          'default': {
            'url': 'https://i.ytimg.com/vi/UiBBfWyApyA/default.jpg',
            'width': 120,
            'height': 90
          },
          'medium': {
            'url': 'https://i.ytimg.com/vi/UiBBfWyApyA/mqdefault.jpg',
            'width': 320,
            'height': 180
          },
          'high': {
            'url': 'https://i.ytimg.com/vi/UiBBfWyApyA/hqdefault.jpg',
            'width': 480,
            'height': 360
          }
        },
        'channelTitle': 'The Pet Collective',
        'liveBroadcastContent': 'none'
      }
    },
    {
      'kind': 'youtube#searchResult',
      'etag': '"XI7nbFXulYBIpL0ayR_gDh3eu1k/ep76OXcvz2QyExHRQc4aoQciI7s"',
      'id': {
        'kind': 'youtube#video',
        'videoId': 'mRf3-JkwqfU'
      },
      'snippet': {
        'publishedAt': '2016-08-31T17:34:50.000Z',
        'channelId': 'UCCLFxVP-PFDk7yZj208aAgg',
        'title': 'Funny Puppies And Cute Puppy Videos Compilation 2016 [BEST OF]',
        'description': 'Check out these cute puppies in this compilation of funny puppy videos. Puppies are the cutest. Pug puppies, bulldog puppies, labrador puppies, and more, they ...',
        'thumbnails': {
          'default': {
            'url': 'https://i.ytimg.com/vi/mRf3-JkwqfU/default.jpg',
            'width': 120,
            'height': 90
          },
          'medium': {
            'url': 'https://i.ytimg.com/vi/mRf3-JkwqfU/mqdefault.jpg',
            'width': 320,
            'height': 180
          },
          'high': {
            'url': 'https://i.ytimg.com/vi/mRf3-JkwqfU/hqdefault.jpg',
            'width': 480,
            'height': 360
          }
        },
        'channelTitle': 'MashupZone',
        'liveBroadcastContent': 'none'
      }
    },
    {
      'kind': 'youtube#searchResult',
      'etag': '"XI7nbFXulYBIpL0ayR_gDh3eu1k/y_lS8BkpkZg_lDZN7hnr2Xg3qjc"',
      'id': {
        'kind': 'youtube#video',
        'videoId': 'v8BtZ8IdoNY'
      },
      'snippet': {
        'publishedAt': '2017-05-12T20:04:36.000Z',
        'channelId': 'UCNcdbMyA59zE-Vk668bKWOg',
        'title': 'Hawaii Pug-Oh / A.R.F. | Full Episode | Puppy Dog Pals | Disney Junior',
        'description': 'Catch more Puppy Dog Pals on Fridays 10:30a on Disney Channel and on the Disney Channel App, Disney Junior App or Disney Junior On Demand! HAWAII ...',
        'thumbnails': {
          'default': {
            'url': 'https://i.ytimg.com/vi/v8BtZ8IdoNY/default.jpg',
            'width': 120,
            'height': 90
          },
          'medium': {
            'url': 'https://i.ytimg.com/vi/v8BtZ8IdoNY/mqdefault.jpg',
            'width': 320,
            'height': 180
          },
          'high': {
            'url': 'https://i.ytimg.com/vi/v8BtZ8IdoNY/hqdefault.jpg',
            'width': 480,
            'height': 360
          }
        },
        'channelTitle': 'Disney Junior',
        'liveBroadcastContent': 'none'
      }
    },
    {
      'kind': 'youtube#searchResult',
      'etag': '"XI7nbFXulYBIpL0ayR_gDh3eu1k/k3hTfkTud9W-TvfYoH4Xywe39xs"',
      'id': {
        'kind': 'youtube#video',
        'videoId': 'fNijP-sEXuY'
      },
      'snippet': {
        'publishedAt': '2018-11-06T16:15:00.000Z',
        'channelId': 'UCbHvtJxBXUzpB_iXfJLIvjA',
        'title': 'Best Of Cute Golden Retriever Puppies #118 - Funny Puppy Videos 2018',
        'description': 'Can we hit 400 LIKES on this video? Please share it and SUBSCRIBE! Dog from the thumbnail: @winstonthegoodboygolden Tucker: ...',
        'thumbnails': {
          'default': {
            'url': 'https://i.ytimg.com/vi/fNijP-sEXuY/default.jpg',
            'width': 120,
            'height': 90
          },
          'medium': {
            'url': 'https://i.ytimg.com/vi/fNijP-sEXuY/mqdefault.jpg',
            'width': 320,
            'height': 180
          },
          'high': {
            'url': 'https://i.ytimg.com/vi/fNijP-sEXuY/hqdefault.jpg',
            'width': 480,
            'height': 360
          }
        },
        'channelTitle': 'Grumpy Dog',
        'liveBroadcastContent': 'none'
      }
    },
    {
      'kind': 'youtube#searchResult',
      'etag': '"XI7nbFXulYBIpL0ayR_gDh3eu1k/_z1DuiPG68Rhdiy5w9nyFHMDWh0"',
      'id': {
        'kind': 'youtube#video',
        'videoId': 'QJjx0WINMg4'
      },
      'snippet': {
        'publishedAt': '2018-11-05T16:45:01.000Z',
        'channelId': 'UCbHvtJxBXUzpB_iXfJLIvjA',
        'title': 'Funniest & Cutest Pitbull Puppies #8 - Funny Puppy Videos 2018',
        'description': 'Can we hit 300 LIKES on this video? Please share it and SUBSCRIBE! LIFE IS BETTER WITH A PITBULL PUPPIES Thanks for watching! :). Watch funniest ...',
        'thumbnails': {
          'default': {
            'url': 'https://i.ytimg.com/vi/QJjx0WINMg4/default.jpg',
            'width': 120,
            'height': 90
          },
          'medium': {
            'url': 'https://i.ytimg.com/vi/QJjx0WINMg4/mqdefault.jpg',
            'width': 320,
            'height': 180
          },
          'high': {
            'url': 'https://i.ytimg.com/vi/QJjx0WINMg4/hqdefault.jpg',
            'width': 480,
            'height': 360
          }
        },
        'channelTitle': 'Grumpy Dog',
        'liveBroadcastContent': 'none'
      }
    },
    {
      'kind': 'youtube#searchResult',
      'etag': '"XI7nbFXulYBIpL0ayR_gDh3eu1k/g46pE2nZQXqOKdcoc1zsgNAptXI"',
      'id': {
        'kind': 'youtube#video',
        'videoId': 'GMCvGapHk9A'
      },
      'snippet': {
        'publishedAt': '2018-09-01T15:00:02.000Z',
        'channelId': 'UCbHvtJxBXUzpB_iXfJLIvjA',
        'title': 'Best Of Cute Golden Retriever Puppies Compilation #92 - Funny Dogs 2018',
        'description': 'Can we hit 300 LIKES on this video? Please share it and SUBSCRIBE! LIFE IS BETTER WITH A GOLDEN RETRIEVER PUPPIES Thanks for watching!',
        'thumbnails': {
          'default': {
            'url': 'https://i.ytimg.com/vi/GMCvGapHk9A/default.jpg',
            'width': 120,
            'height': 90
          },
          'medium': {
            'url': 'https://i.ytimg.com/vi/GMCvGapHk9A/mqdefault.jpg',
            'width': 320,
            'height': 180
          },
          'high': {
            'url': 'https://i.ytimg.com/vi/GMCvGapHk9A/hqdefault.jpg',
            'width': 480,
            'height': 360
          }
        },
        'channelTitle': 'Grumpy Dog',
        'liveBroadcastContent': 'none'
      }
    },
    {
      'kind': 'youtube#searchResult',
      'etag': '"XI7nbFXulYBIpL0ayR_gDh3eu1k/uCHo3lbDUriI1W3tkYGS9TdmV70"',
      'id': {
        'kind': 'youtube#video',
        'videoId': 'D-PDQoiuiHc'
      },
      'snippet': {
        'publishedAt': '2018-11-06T17:40:01.000Z',
        'channelId': 'UClZCJyVftq6XMBBTCc_N1Nw',
        'title': 'Rekkr\'s 1st Off Leash Hike - How I Train Puppies to Hike Off Leash with My Pack',
        'description': 'This video show\'s my 17 week old Renascence Bulldogge Rekkr on his 1st off leash training hike with my pack. With is are my Blue Bay Shepherd Kurgan and ...',
        'thumbnails': {
          'default': {
            'url': 'https://i.ytimg.com/vi/D-PDQoiuiHc/default.jpg',
            'width': 120,
            'height': 90
          },
          'medium': {
            'url': 'https://i.ytimg.com/vi/D-PDQoiuiHc/mqdefault.jpg',
            'width': 320,
            'height': 180
          },
          'high': {
            'url': 'https://i.ytimg.com/vi/D-PDQoiuiHc/hqdefault.jpg',
            'width': 480,
            'height': 360
          }
        },
        'channelTitle': '1st508th Airborne',
        'liveBroadcastContent': 'none'
      }
    },
    {
      'kind': 'youtube#searchResult',
      'etag': '"XI7nbFXulYBIpL0ayR_gDh3eu1k/ujfpxgNjjRgCsqT8q3rOLKw5rn0"',
      'id': {
        'kind': 'youtube#video',
        'videoId': 'BH9qX7Ne42Q'
      },
      'snippet': {
        'publishedAt': '2018-10-22T20:04:27.000Z',
        'channelId': 'UCZjpAMIiwyNv5GGzrOI2NRQ',
        'title': 'Funny And Cute Husky Puppies Compilation #30',
        'description': 'Funny And Cute Husky Puppies Compilation #30 ------------------------------------------------------------------------------------------------ ☆Don\'t forget to subscribe my channel ...',
        'thumbnails': {
          'default': {
            'url': 'https://i.ytimg.com/vi/BH9qX7Ne42Q/default.jpg',
            'width': 120,
            'height': 90
          },
          'medium': {
            'url': 'https://i.ytimg.com/vi/BH9qX7Ne42Q/mqdefault.jpg',
            'width': 320,
            'height': 180
          },
          'high': {
            'url': 'https://i.ytimg.com/vi/BH9qX7Ne42Q/hqdefault.jpg',
            'width': 480,
            'height': 360
          }
        },
        'channelTitle': 'Puppies Lover',
        'liveBroadcastContent': 'none'
      }
    },
    {
      'kind': 'youtube#searchResult',
      'etag': '"XI7nbFXulYBIpL0ayR_gDh3eu1k/5WPNnXV4X3r_UmozENfCE_RylTg"',
      'id': {
        'kind': 'youtube#video',
        'videoId': 'tPcMf69PewU'
      },
      'snippet': {
        'publishedAt': '2018-11-03T16:00:09.000Z',
        'channelId': 'UCbHvtJxBXUzpB_iXfJLIvjA',
        'title': 'Best Of Cute Golden Retriever Puppies #117 - Funny Puppy Videos 2018',
        'description': 'Can we hit 500 LIKES on this video? Please share it and SUBSCRIBE! Dogs from the thumbnail: @goldens_of_chicago   Tucker: ...',
        'thumbnails': {
          'default': {
            'url': 'https://i.ytimg.com/vi/tPcMf69PewU/default.jpg',
            'width': 120,
            'height': 90
          },
          'medium': {
            'url': 'https://i.ytimg.com/vi/tPcMf69PewU/mqdefault.jpg',
            'width': 320,
            'height': 180
          },
          'high': {
            'url': 'https://i.ytimg.com/vi/tPcMf69PewU/hqdefault.jpg',
            'width': 480,
            'height': 360
          }
        },
        'channelTitle': 'Grumpy Dog',
        'liveBroadcastContent': 'none'
      }
    },
    {
      'kind': 'youtube#searchResult',
      'etag': '"XI7nbFXulYBIpL0ayR_gDh3eu1k/z5NETOkqTPsVDWJgcOCTINVueqU"',
      'id': {
        'kind': 'youtube#video',
        'videoId': 'SGc2RqEGaXM'
      },
      'snippet': {
        'publishedAt': '2018-11-03T17:53:48.000Z',
        'channelId': 'UCZjpAMIiwyNv5GGzrOI2NRQ',
        'title': 'Funny And Cute Husky Puppies Compilation #31',
        'description': 'Funny And Cute Husky Puppies Compilation #31 ------------------------------------------------------------------------------------------------ ☆Don\'t forget to subscribe my channel ...',
        'thumbnails': {
          'default': {
            'url': 'https://i.ytimg.com/vi/SGc2RqEGaXM/default.jpg',
            'width': 120,
            'height': 90
          },
          'medium': {
            'url': 'https://i.ytimg.com/vi/SGc2RqEGaXM/mqdefault.jpg',
            'width': 320,
            'height': 180
          },
          'high': {
            'url': 'https://i.ytimg.com/vi/SGc2RqEGaXM/hqdefault.jpg',
            'width': 480,
            'height': 360
          }
        },
        'channelTitle': 'Puppies Lover',
        'liveBroadcastContent': 'none'
      }
    },
    {
      'kind': 'youtube#searchResult',
      'etag': '"XI7nbFXulYBIpL0ayR_gDh3eu1k/PV1u6ySqU6s_PbzvWH9k5f5nGwI"',
      'id': {
        'kind': 'youtube#video',
        'videoId': '85IS0XNAMIU'
      },
      'snippet': {
        'publishedAt': '2018-10-30T16:15:01.000Z',
        'channelId': 'UCbHvtJxBXUzpB_iXfJLIvjA',
        'title': 'Best Of Cute Husky Puppies - Funny Puppy Videos 2018',
        'description': 'Can we hit 300 LIKES on this video? Please share it and SUBSCRIBE! LIFE IS BETTER WITH A HUSKY PUPPIES ❤  ❤  ❤   Thanks for watching! More ...',
        'thumbnails': {
          'default': {
            'url': 'https://i.ytimg.com/vi/85IS0XNAMIU/default.jpg',
            'width': 120,
            'height': 90
          },
          'medium': {
            'url': 'https://i.ytimg.com/vi/85IS0XNAMIU/mqdefault.jpg',
            'width': 320,
            'height': 180
          },
          'high': {
            'url': 'https://i.ytimg.com/vi/85IS0XNAMIU/hqdefault.jpg',
            'width': 480,
            'height': 360
          }
        },
        'channelTitle': 'Grumpy Dog',
        'liveBroadcastContent': 'none'
      }
    },
    {
      'kind': 'youtube#searchResult',
      'etag': '"XI7nbFXulYBIpL0ayR_gDh3eu1k/gVccfDCMTZoTmU7topwECxmDw3w"',
      'id': {
        'kind': 'youtube#video',
        'videoId': 'V5WQWo4ulG0'
      },
      'snippet': {
        'publishedAt': '2018-06-06T15:00:06.000Z',
        'channelId': 'UCbHvtJxBXUzpB_iXfJLIvjA',
        'title': 'Funniest & Cutest Pitbull Puppies #2 - Funny Puppy Videos Compilation 2018',
        'description': 'Can we hit 300 LIKES on this video? Please share it and SUBSCRIBE! Thanks for watching! :). Watch funniest Pitbull videos and try not to laugh. Funny Pitbull ...',
        'thumbnails': {
          'default': {
            'url': 'https://i.ytimg.com/vi/V5WQWo4ulG0/default.jpg',
            'width': 120,
            'height': 90
          },
          'medium': {
            'url': 'https://i.ytimg.com/vi/V5WQWo4ulG0/mqdefault.jpg',
            'width': 320,
            'height': 180
          },
          'high': {
            'url': 'https://i.ytimg.com/vi/V5WQWo4ulG0/hqdefault.jpg',
            'width': 480,
            'height': 360
          }
        },
        'channelTitle': 'Grumpy Dog',
        'liveBroadcastContent': 'none'
      }
    },
    {
      'kind': 'youtube#searchResult',
      'etag': '"XI7nbFXulYBIpL0ayR_gDh3eu1k/GhV7cqv-I1voYPC55mB-QrnxJPQ"',
      'id': {
        'kind': 'youtube#video',
        'videoId': 'mkeoYU-Pd2k'
      },
      'snippet': {
        'publishedAt': '2018-01-22T15:00:03.000Z',
        'channelId': 'UCnAignIM-7Hu5hohCbpV55A',
        'title': 'Cutest Puppies You Will EVER See Compilation',
        'description': 'JOIN THE FUZZIES! http://www.youtube.com/subscription_center?add_user=worldsfuzziestvideos NEW VIDS MON & FRI !! LIKE, COMMENT & SHARE!',
        'thumbnails': {
          'default': {
            'url': 'https://i.ytimg.com/vi/mkeoYU-Pd2k/default.jpg',
            'width': 120,
            'height': 90
          },
          'medium': {
            'url': 'https://i.ytimg.com/vi/mkeoYU-Pd2k/mqdefault.jpg',
            'width': 320,
            'height': 180
          },
          'high': {
            'url': 'https://i.ytimg.com/vi/mkeoYU-Pd2k/hqdefault.jpg',
            'width': 480,
            'height': 360
          }
        },
        'channelTitle': 'World\'s Fuzziest Videos',
        'liveBroadcastContent': 'none'
      }
    },
    {
      'kind': 'youtube#searchResult',
      'etag': '"XI7nbFXulYBIpL0ayR_gDh3eu1k/4qdT7IT4tspkF-Y2ZO4QnxwGtUE"',
      'id': {
        'kind': 'youtube#video',
        'videoId': 'F4cpDt6uFx0'
      },
      'snippet': {
        'publishedAt': '2018-11-06T17:31:18.000Z',
        'channelId': 'UCGZkMlR-4WPZOCzQRVmo_2Q',
        'title': '5 week Chihuahua puppies',
        'description': 'Our website has answers to most questions: www.lilpromisedland.com Email is the fastest way to reach us, if you have additional questions: ...',
        'thumbnails': {
          'default': {
            'url': 'https://i.ytimg.com/vi/F4cpDt6uFx0/default.jpg',
            'width': 120,
            'height': 90
          },
          'medium': {
            'url': 'https://i.ytimg.com/vi/F4cpDt6uFx0/mqdefault.jpg',
            'width': 320,
            'height': 180
          },
          'high': {
            'url': 'https://i.ytimg.com/vi/F4cpDt6uFx0/hqdefault.jpg',
            'width': 480,
            'height': 360
          }
        },
        'channelTitle': 'lilpromisedland',
        'liveBroadcastContent': 'none'
      }
    },
    {
      'kind': 'youtube#searchResult',
      'etag': '"XI7nbFXulYBIpL0ayR_gDh3eu1k/Agwze8Flj1WF8bwT7v3PFovGIlw"',
      'id': {
        'kind': 'youtube#video',
        'videoId': 'CuA2fhPDNeM'
      },
      'snippet': {
        'publishedAt': '2018-06-25T15:00:01.000Z',
        'channelId': 'UCbHvtJxBXUzpB_iXfJLIvjA',
        'title': 'Best Of Cute Yorkie Puppies Compilation - Funny Dogs 2018',
        'description': 'Can we hit 250 LIKES on this video? Please share it and SUBSCRIBE! LIFE IS BETTER WITH A YORKIES PUPPIES Dogs from the thumbnail ...',
        'thumbnails': {
          'default': {
            'url': 'https://i.ytimg.com/vi/CuA2fhPDNeM/default.jpg',
            'width': 120,
            'height': 90
          },
          'medium': {
            'url': 'https://i.ytimg.com/vi/CuA2fhPDNeM/mqdefault.jpg',
            'width': 320,
            'height': 180
          },
          'high': {
            'url': 'https://i.ytimg.com/vi/CuA2fhPDNeM/hqdefault.jpg',
            'width': 480,
            'height': 360
          }
        },
        'channelTitle': 'Grumpy Dog',
        'liveBroadcastContent': 'none'
      }
    },
    {
      'kind': 'youtube#searchResult',
      'etag': '"XI7nbFXulYBIpL0ayR_gDh3eu1k/MSb9p8ZVtpHBARsIKg4FVcJr6DM"',
      'id': {
        'kind': 'youtube#video',
        'videoId': 'loPkBNA3nos'
      },
      'snippet': {
        'publishedAt': '2015-12-27T18:27:20.000Z',
        'channelId': 'UCMHRIdHoMcuLyl7M8m9Ficg',
        'title': 'Just Born Puppies',
        'description': 'Just Born Puppies - just born baby dogs.',
        'thumbnails': {
          'default': {
            'url': 'https://i.ytimg.com/vi/loPkBNA3nos/default.jpg',
            'width': 120,
            'height': 90
          },
          'medium': {
            'url': 'https://i.ytimg.com/vi/loPkBNA3nos/mqdefault.jpg',
            'width': 320,
            'height': 180
          },
          'high': {
            'url': 'https://i.ytimg.com/vi/loPkBNA3nos/hqdefault.jpg',
            'width': 480,
            'height': 360
          }
        },
        'channelTitle': 'Ani Lovers',
        'liveBroadcastContent': 'none'
      }
    },
    {
      'kind': 'youtube#searchResult',
      'etag': '"XI7nbFXulYBIpL0ayR_gDh3eu1k/filT2Gj1ZiUJR_6oWNcesNxt52A"',
      'id': {
        'kind': 'youtube#video',
        'videoId': 'E7c9gqdrjHk'
      },
      'snippet': {
        'publishedAt': '2018-11-06T04:53:52.000Z',
        'channelId': 'UCCreAfCtzPzNWASZHukiu2g',
        'title': 'Mother dog reunited with her puppies for a long time',
        'description': 'Sweet moment of mama dog reunited her puppies for a long time. Cute dog and puppies video.',
        'thumbnails': {
          'default': {
            'url': 'https://i.ytimg.com/vi/E7c9gqdrjHk/default.jpg',
            'width': 120,
            'height': 90
          },
          'medium': {
            'url': 'https://i.ytimg.com/vi/E7c9gqdrjHk/mqdefault.jpg',
            'width': 320,
            'height': 180
          },
          'high': {
            'url': 'https://i.ytimg.com/vi/E7c9gqdrjHk/hqdefault.jpg',
            'width': 480,
            'height': 360
          }
        },
        'channelTitle': 'Story Animal Giving Birth',
        'liveBroadcastContent': 'none'
      }
    },
    {
      'kind': 'youtube#searchResult',
      'etag': '"XI7nbFXulYBIpL0ayR_gDh3eu1k/crHF9u5xvEiBdFMKXz49XLgN1iU"',
      'id': {
        'kind': 'youtube#video',
        'videoId': 'Wzputm30w6Y'
      },
      'snippet': {
        'publishedAt': '2018-11-06T10:02:22.000Z',
        'channelId': 'UCh6yf5pEc4eMjefQR4JnFGA',
        'title': 'chow chow puppies 40000rs each',
        'description': 'owner contact number 9426458600 available in ahmedabad gujrat my whatsapp no 9140933298.',
        'thumbnails': {
          'default': {
            'url': 'https://i.ytimg.com/vi/Wzputm30w6Y/default.jpg',
            'width': 120,
            'height': 90
          },
          'medium': {
            'url': 'https://i.ytimg.com/vi/Wzputm30w6Y/mqdefault.jpg',
            'width': 320,
            'height': 180
          },
          'high': {
            'url': 'https://i.ytimg.com/vi/Wzputm30w6Y/hqdefault.jpg',
            'width': 480,
            'height': 360
          }
        },
        'channelTitle': 'ganesh dog world',
        'liveBroadcastContent': 'none'
      }
    },
    {
      'kind': 'youtube#searchResult',
      'etag': '"XI7nbFXulYBIpL0ayR_gDh3eu1k/kn8HkmUVEHZjIq7X17rppwrJy5M"',
      'id': {
        'kind': 'youtube#video',
        'videoId': 'eq7BLw_Z9Ic'
      },
      'snippet': {
        'publishedAt': '2018-09-14T13:00:06.000Z',
        'channelId': 'UCZjpAMIiwyNv5GGzrOI2NRQ',
        'title': 'Labrador Retriever Puppies Funny and Cute Videos Compilation #12',
        'description': 'Labrador Retriever Puppies Funny and Cute Videos Compilation #12 ------------------------------------------------------------------------------------------------ ☆Don\'t forget to ...',
        'thumbnails': {
          'default': {
            'url': 'https://i.ytimg.com/vi/eq7BLw_Z9Ic/default.jpg',
            'width': 120,
            'height': 90
          },
          'medium': {
            'url': 'https://i.ytimg.com/vi/eq7BLw_Z9Ic/mqdefault.jpg',
            'width': 320,
            'height': 180
          },
          'high': {
            'url': 'https://i.ytimg.com/vi/eq7BLw_Z9Ic/hqdefault.jpg',
            'width': 480,
            'height': 360
          }
        },
        'channelTitle': 'Puppies Lover',
        'liveBroadcastContent': 'none'
      }
    },
    {
      'kind': 'youtube#searchResult',
      'etag': '"XI7nbFXulYBIpL0ayR_gDh3eu1k/KeNuyqyQ5Wn8xqYNJEdEMdTJWHA"',
      'id': {
        'kind': 'youtube#video',
        'videoId': 'YKhZln0fEDU'
      },
      'snippet': {
        'publishedAt': '2018-10-31T16:00:06.000Z',
        'channelId': 'UCbHvtJxBXUzpB_iXfJLIvjA',
        'title': 'Best Of Cute Golden Retriever Puppies #116 - Funny Puppy Videos 2018',
        'description': 'Can we hit 500 LIKES on this video? Please share it and SUBSCRIBE! Dog from the thumbnail: @pepperthegoldenpupper Tucker: ...',
        'thumbnails': {
          'default': {
            'url': 'https://i.ytimg.com/vi/YKhZln0fEDU/default.jpg',
            'width': 120,
            'height': 90
          },
          'medium': {
            'url': 'https://i.ytimg.com/vi/YKhZln0fEDU/mqdefault.jpg',
            'width': 320,
            'height': 180
          },
          'high': {
            'url': 'https://i.ytimg.com/vi/YKhZln0fEDU/hqdefault.jpg',
            'width': 480,
            'height': 360
          }
        },
        'channelTitle': 'Grumpy Dog',
        'liveBroadcastContent': 'none'
      }
    },
    {
      'kind': 'youtube#searchResult',
      'etag': '"XI7nbFXulYBIpL0ayR_gDh3eu1k/O0doMiITkr_mEz02kzLCWrSrNKo"',
      'id': {
        'kind': 'youtube#video',
        'videoId': 'vDxRlXZEXSA'
      },
      'snippet': {
        'publishedAt': '2018-10-02T17:50:06.000Z',
        'channelId': 'UCZjpAMIiwyNv5GGzrOI2NRQ',
        'title': 'Funny And Cute Golden Retriever Puppies Compilation #33',
        'description': 'Funny And Cute Golden Retriever Puppies Compilation #33 ------------------------------------------------------------------------------------------------ ☆Don\'t forget to subscribe ...',
        'thumbnails': {
          'default': {
            'url': 'https://i.ytimg.com/vi/vDxRlXZEXSA/default.jpg',
            'width': 120,
            'height': 90
          },
          'medium': {
            'url': 'https://i.ytimg.com/vi/vDxRlXZEXSA/mqdefault.jpg',
            'width': 320,
            'height': 180
          },
          'high': {
            'url': 'https://i.ytimg.com/vi/vDxRlXZEXSA/hqdefault.jpg',
            'width': 480,
            'height': 360
          }
        },
        'channelTitle': 'Puppies Lover',
        'liveBroadcastContent': 'none'
      }
    }
  ]
};
 
// const store = {
//   videos: [
//   ]
// };

// TASK: Add the Youtube Search API Base URL here:
// Documentation is here: https://developers.google.com/youtube/v3/docs/search/list#usage
// const BASE_URL = 'https://www.googleapis.com/youtube/v3/search';


// function fetchVideos (searchTerm, callback) {
 
// }
//  * Async function, responsible for calling the Youtube API with jQuery, constructing
//  * the correct query object, and passing along the callback into the AJAX call.
//  * @param {string}   searchTerm
//  * @param {function} callback
 

// TASK:
// 1. Use `searchTerm` to construct the right query object based on the Youtube API docs
//    - Refer to curriculum assignment for help with the required parameters
// 2. Make a getJSON call using the query object and sending the provided callback in 
//    as the last argument
//
// TEST IT! Execute this function and console log the results inside the callback.
// const fetchVideos = function(searchTerm, callback) {
//   const params = {
//     'maxResults': '25',
//     'part': 'snippet',
//     'q': searchTerm,
//     'type': '',
//     'key': API_KEY
//   };
//   $.getJSON(BASE_URL, params, callback);
// };


// fetchVideos('puppies');
// console.log(fetchVideos('puppies'));

/**
 * @function decorateResponse
 * Uses Youtube API response to create an array of "decorated" video objects as 
 * defined at the top of the file.
 * @param   {object} response - should match Youtube API response shape
 * @returns {array}
 */
// TASK:
// 1. Map through the response object's `items` array
// 2. Return an array of objects, where each object contains the keys `id`, `title`, 
//    `thumbnail` which each hold the appropriate values from the API item object. You 
//    WILL have to dig into several nested properties!
//  
// TEST IT! Grab an example API response and send it into the function - make sure
// you get back the object you want.
// const decorateResponse = function(response) {
//   console.log('response is ', response);
//   return response.items.map(function(item) {
//     return {
//       id: item.id.videoId, 
//       thumbnail: item.snippet.thumbnails.default.url, 
//       title: item.snippet.title
//     };});
// };

// console.log(decorateResponse(MOCK_DATA));

/**
 * @function generateVideoItemHtml
 * Template function, creates an HTML string from a single decorated video object
 * @param   {object} video - decorated video object
 * @returns {string} HTML 
 */
// TASK:
// 1. Using the decorated object, return an HTML string containing all the expected
// TEST IT!
// const generateVideoItemHtml = function(video) {
//   return `
//   <li data-video-id="${video.id}">${video.title}</li>
//     <img src="${video.thumbnail}" alt="thumbail image">`;
// };

// /**
//  * @function addVideosToStore
//  * Store modification function to set decorated video objects
//  * @param {array} videos - decorated video objects
//  */
// // TASK:
// // 1. Set the received array as the value held in store.videos
// // TEST IT!
// const addVideosToStore = function(videos) {
//   store.videos = videos;
// };

// console.log(store.videos);


/**
 * @function render
 * Responsible for scanning store and rendering the video list to DOM
 */
// TASK:
// 1. Map through `store.videos`, sending each `video` through `generateVideoItemHtml`
// 2. Add this array of DOM elements to the appropriate DOM element
// TEST IT!
// const render = function() {
//   const videosToDOM = store.videos.map(video => generateVideoItemHtml(video)).join();
//   $('ul').html(videosToDOM);
// };

// decorateResponse(MOCK_DATA);
// addVideosToStore(decorateResponse(MOCK_DATA));
// render();

/**
 * @function handleFormSubmit
 * Adds form "submit" event listener that 1) initiates API call, 2) modifies store,
 * and 3) invokes render
 */
// TASK:
// 2. Add an event listener to the form that will:
//   a) Prevent default event
//   b) Retrieve the search input from the DOM
//   c) Clear the search input field
//   d) Invoke the `fetchVideos` function, sending in the search value
//   e) Inside the callback, send the API response through the `decorateResponse` function
//   f) Inside the callback, add the decorated response into your store using the 
//      `addVideosToStore` function
//   g) Inside the callback, run the `render` function 
// TEST IT!
// const handleFormSubmit = function() {
//   $('form').on('submit', function(event){
//     // console.log('form ran');
//     event.preventDefault();
//     const searchResult = $(event.currentTarget).find('#search-term').val();
//     console.log(searchResult);
//     $('#search-term').val('');
//     console.log(API.fetchVideos);
//     API.fetchVideos(searchResult, (x) => {
//       const decorated = API.decorateResponse(x);
//       store.setVideos(decorated);
//       console.log(store.videos);
//       // const returnArray = decorateResponse(APIReturn);
//       // addVideosToStore(APIReturn);
//       render();
      
//     });
//   });
// };

// When DOM is ready:
$(function () {
  // TASK:
  // 1. Run `handleFormSubmit` to bind the event listener to the DOM
  VideoList.bindEventListener();
});
