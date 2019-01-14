/*
$Id$
(c) 2008 The New York Times Company
*/

if (!!(window.attachEvent && !window.opera) || typeof console == 'undefined') {
  try {
    console = {};
    console.log = function(){};
    console.warn = function(){};
    console.error = function(){};
    console.time = function(){};
    console.timeEnd = function(){};
  } catch(e) {}
}

var TPCONFIG = {
  host:              'http://timespeople.nytimes.com',
  css_host:          'http://graphics8.nytimes.com',
  image_host:        'http://graphics8.nytimes.com',
  js_host:           'http://graphics8.nytimes.com',
  ad_host:           'http://www.nytimes.com',
  user_image_host :  'http://pimage.timespeople.nytimes.com',
  image_path:        '/images/apps/timespeople/',
  css_path:          '/css/app/timespeople/',
  service:           '/svc/timespeople/fe/fe_svc.html',
  image_service:     'http://tp-upload.nytimes.com/postpic.php',
  xpi:               false,
  token:             /RMID=([^;]+)/.test(unescape(document.cookie)) ? RegExp.$1 : ''
};

var TimesPeople = {
  version: '1.1'
};

TimesPeople.require = function(url) {
  document.write('<script src="'+ url +'" type="text/javascript" charset="utf-8"><\/script>');
}

TimesPeople.require(TPCONFIG.js_host + '/js/app/lib/NYTD/0.0.1/cookie.js');
TimesPeople.require(TPCONFIG.js_host + '/js/app/timespeople/urilist.js');
TimesPeople.require(TPCONFIG.js_host + '/js/app/timespeople/marginfix.js');