/*
$Id: marginfix.js 5448 2008-09-21 01:37:50Z santep $
(c) 2008 The New York Times Company
*/


(function(){
  
  function run() {
    if(TimesPeople.URIList.allowsCurrentHost() && TimesPeople.URIList.allowsCurrentURI()){
      loadCSS();
      restoreState();
      TimesPeople.preInitialized = true;
    } 
    else {
      delete TimesPeople;
    }
  }
  
  function restoreState(){
    if (NYTD.Cookies.getOrCreate('tpstate').lookup('minimized') != 'YES') {
      addMargin();
      drawPlaceHolder();
    }
  }
  
  function addMargin() {
    document.write('<style>html body {padding-top:40px;}<\/style>');
  }
  
  function drawPlaceHolder() {
    if(document.body && document.body.firstChild){
      if (!document.getElementById('TP_container')) {
        var container = document.createElement('div')
        container.id = 'TP_container';
        var shadow = document.createElement('div')
        shadow.id = 'TP_container_shadow';
        shadow.className = 's_shadow';
        document.body.insertBefore(container, document.body.firstChild);
        document.body.insertBefore(shadow, container);
      }
    }
    else {
      setTimeout(arguments.callee, 10);  
    }
  }
  
  function loadCSS() {
    //TODO use documentFragment?
    var ie6 = (!!(window.attachEvent && !window.opera) && (parseFloat(navigator.appVersion.split(';')[1].split(' ')[2]) < 7));
    var head = document.getElementsByTagName('head')[0];
    var path = TPCONFIG.css_host + TPCONFIG.css_path;
    
    function createLink(uri) {
      link = document.createElement('link');
      link.href = uri;
      link.type = 'text/css';
      link.rel = 'stylesheet';
      head.appendChild(link);
      link = null;
    }
    
    createLink(path + 'timespeople.css');
    createLink(TPCONFIG.css_host + '/css/app/lib/shadow/drop_shadow.css');
    if(ie6) {
      createLink(path + 'timespeople_ie6.css');
    }
    
  }
  
  run();
  
})();