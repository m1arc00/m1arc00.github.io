/*
$Id$
(c) 2008 The New York Times Company
*/

(function() {
  if (TimesPeople.Controller) return;
  if (TimesPeople.URIList.allowsCurrentHost() && TimesPeople.URIList.allowsCurrentURI()) {
    var js_host = TPCONFIG.js_host;
    var require = TimesPeople.require;

    if (!window.Prototype || Prototype.Version < '1.6.0.2') {
      TimesPeople.require(js_host + '/js/app/lib/prototype/1.6.0.2/prototype.js');
    }

    //force load scriptaculous since we can't determine the version 
    require(js_host + '/js/app/lib/scriptaculous/1.8.1/builder.js');
    require(js_host + '/js/app/lib/scriptaculous/1.8.1/effects.js');
    require(js_host + '/js/app/lib/scriptaculous/1.8.1/dragdrop.js');  
    require(js_host + '/js/app/lib/scriptaculous/1.8.1/controls.js');    

    if (!window.NYTD || !NYTD.Cookies) {
      require(js_host + '/js/app/lib/NYTD/0.0.1/cookie.js');
    }

    require(js_host + '/js/app/timespeople/defaultfeed.js');
    require(js_host + '/js/app/timespeople/build.js');
  }
})();
