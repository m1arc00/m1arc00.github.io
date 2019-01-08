/*
$Id: urilist.js 6631 2008-11-20 22:33:45Z santep $
(c) 2008 The New York Times Company

*/

TimesPeople.URIList = {
                                                                                  
  allowedHosts: [
    'nyt.com', 
    'www.nyt.com', 
    'nytimes.com', 
    'www.nytimes.com', 
    'community.nytimes.com', 
    'elections.nytimes.com',
    'events.nytimes.com', 
    'movies.nytimes.com', 
    'movies2.nytimes.com', 
    'my.nytimes.com', 
    'politics.nytimes.com', 
    'tech2.nytimes.com', 
    'tech.nytimes.com', 
    'travel.nytimes.com', 
    'travel2.nytimes.com', 
    'topics.nytimes.com', 
    'theater.nytimes.com', 
    'jobmarket.nytimes.com', 
    'query.nytimes.com', 
    'health.nytimes.com', 
    'timesmachine.nytimes.com', 
    'timespeople.nytimes.com', 
    'www.sea1.nytimes.com', 
    'tv.nytimes.com',
    'acrosstheuniverse.blogs.nytimes.com',
    'arieff.blogs.nytimes.com',
    'artsbeat.blogs.nytimes.com',
    'baghdadbureau.blogs.nytimes.com',
    'bartlett.blogs.nytimes.com',
    'bats.blogs.nytimes.com',
    'biguenet.blogs.nytimes.com',
    'bits.blogs.nytimes.com', 
    'bitten.blogs.nytimes.com', 
    'blow.blogs.nytimes.com', 
    'bracket.blogs.nytimes.com',
    'brooks.blogs.nytimes.com',
    'buchanan.blogs.nytimes.com',
    'campaigningforhistory.blogs.nytimes.com',
    'campaignstops.blogs.nytimes.com',
    'carpetbagger.blogs.nytimes.com',
    'cavett.blogs.nytimes.com',
    'china.blogs.nytimes.com',
    'cityroom.blogs.nytimes.com',
    'collins.blogs.nytimes.com', 
    'conniff.blogs.nytimes.com',
    'consults.blogs.nytimes.com',
    'dinersjournal.blogs.nytimes.com', 
    'dotearth.blogs.nytimes.com',
    'economix.blogs.nytimes.com',
    'egan.blogs.nytimes.com',
    'empirezone.blogs.nytimes.com', 
    'fairandfoul.blogs.nytimes.com',
    'fifthdown.blogs.nytimes.com',
    'fish.blogs.nytimes.com',
    'freakonomics.blogs.nytimes.com',
    'frugaltraveler.blogs.nytimes.com',
    'gadgetwise.blogs.nytimes.com',
    'gambit.blogs.nytimes.com',
    'goal.blogs.nytimes.com',
    'greeninc.blogs.nytimes.com',
    'happydays.blogs.nytimes.com', 
    'ideas.blogs.nytimes.com', 
    'kristof.blogs.nytimes.com',
    'krugman.blogs.nytimes.com',
    'laughlines.blogs.nytimes.com',
    'lessonplans.blogs.nytimes.com', 
    'measureformeasure.blogs.nytimes.com',
    'morris.blogs.nytimes.com',
    'newoldage.blogs.nytimes.com',
    'olympics.blogs.nytimes.com',
    'open.blogs.nytimes.com',
    'opinionator.blogs.nytimes.com',
    'outofbounds.blogs.nytimes.com',
    'papercuts.blogs.nytimes.com', 
    'parenting.blogs.nytimes.com',
    'pipeline.blogs.nytimes.com', 
    'pogue.blogs.nytimes.com',
    'pollan.blogs.nytimes.com', 
    'readingroom.blogs.nytimes.com',
    'realestateqa.blogs.nytimes.com',
    'runway.blogs.nytimes.com',
    'slapshot.blogs.nytimes.com',
    'summercity.blogs.nytimes.com', 
    'theboard.blogs.nytimes.com',
    'thecaucus.blogs.nytimes.com', 
    'theclimb.blogs.nytimes.com',
    'thegraduates.blogs.nytimes.com',
    'themedium.blogs.nytimes.com',
    'thepour.blogs.nytimes.com', 
    'thequad.blogs.nytimes.com',
    'tierneylab.blogs.nytimes.com',
    'timestraveler.blogs.nytimes.com',
    'topics.blogs.nytimes.com', 
    'tvdecoder.blogs.nytimes.com', 
    'usopen.blogs.nytimes.com', 
    'well.blogs.nytimes.com', 
    'wheels.blogs.nytimes.com', 
    'wordplay.blogs.nytimes.com', 
    'worldcup.blogs.nytimes.com'
  ],
  
  deniedURIs:[
    /.*?glogin.*/, /.*?\/auth\/login.*/, /.*?gst\/signout.*/, /.*?pagewanted=print.*/, /.*?pagemode=print.*/,
    /.*?\/style\/t\/.*/, /.*?archive\/pdf.*/, /.*?markets.on.nytimes.com.*/, 
    /.*?\learning.*/, /.*?\/membercenter.*/, /.*?\/mem\/.*/, /.*?\/gst\/forgot.*/,
    /.*?\/gst\/unsub.*/, /.*?\/gst\/regi.*/, /.*?\/regi.*/, /.*?\/ref\/crosswords\/setpuzzle.*/,
    /.*?\/gst\/mostblogged.*/, /.*?\/gst\/mostsearched.*/, /.*?\/gst\/mostemailed.*/,
    /.*?\/marketing\/.*/, /.*?jobmarket.nytimes.com.*/, /.*?\/packages\/html\/style\/.*?/,
    /.*?\/gst\/litesub_insert.*/, /.*?\/ref\/classifieds\/.*?/
  ],
  
  deniedMetaTags:[
    {"PST": "Audio Slideshow"}
  ],

  allowsCurrentHost: function() {
    return (('|' + this.allowedHosts.join('|') + '|').indexOf('|' + window.location.host + '|') > -1);
  },
  
  allowsCurrentType: function() {
    for (var i = 0, pair; pair = this.deniedMetaTags[i]; i++) {
      for(var key in pair) {
        var matches = document.getElementsByName(key);
        for (var j = 0, match; match = matches[j]; j++) {
          if(match.content == pair[key]) {return false;}
        }
      }
    }
    return true;
  },

  allowsCurrentURI: function() {
    for (var i = 0, pattern; pattern = this.deniedURIs[i]; i++) {
      if (pattern.test(window.location.href)) {return false;}
    };
    return this.allowsCurrentType();
  }

};