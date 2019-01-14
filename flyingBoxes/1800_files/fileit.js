// function furlIt(title, url, clip, referrer, partner) {
//  var furlit=window.open(buildURL(title, url, clip, referrer, partner, true),'myfurlwindow','scrollbars=no,width=475,height=575,left=75,top=20,status=no,resizable=yes');
//     furlit.focus();
//     return false;
// }

/**
 * This function is now exclusively Article Tools Save, 
 * The SAVE link included within each article
 * 
 */
function furlItNoPop(title, url, clip, referrer, partner) {
	articleToolsSave(title, url, clip, referrer, partner);
	
}

/**
 * Article tools save
 * 1-click with simple confirmation
 * 
 */
function articleToolsSave(title, url, clip, referrer, partner) {
    saveArticle(buildURL(title, url, clip, referrer, partner, "articleToolsSave"));
    return false;
    
}

function dropDownToolsSave(title, url, clip, referrer, partner) {
    document.location.href = buildURL(title, url, clip, referrer, partner, "normal");
    return false;
    
}

function buildURL(title, url, clip, referrer, partner, type) {
    
    var d = document;
    
    pop = "p=1";
    
    if (!title) {
        title = "";
    } else {
        title = "&t=" + encodeIt(title);
    }
    
    if (!url) {
        url= "&u=";
    } else {
        url = "&u=" + escape(url);
    }
    
    if (!referrer) {
        referrer = d.referrer;
        if (!referrer) {
            referrer = "&r=";
        }
        
    } else {
        referrer = "&r=" + escape(referrer);
    }
    
    if (partner && partner != "") {
        partner = "&source=" + partner;
    } else {
        partner = "";
    }
    
    if (!clip) {
        d.selection?(d.selection.type!="None"?d.selection.createRange().text:""):(d.getSelection?d.getSelection():"");
        if (document.selection) {
           if (d.selection.type != "None") {
               clip = d.selection.createRange().text;
           }
        } else if (d.getSelection) {
            clip = d.getSelection();
        } else if (getSelection) {
            clip = getSelection();
        }
        if (!clip) {
            clip = "";
        }
    }
    clip = "&c=" + encodeIt(clip);
    
    if(typeof(getShareSection) != "undefined") {
        shareSection = "&dt=" + getShareSection();
    } else {
        shareSection = "";
    }
    
    if(type == "normal") {
        return "http://timesfile.nytimes.com/storeIt.jsp?" + pop + title + url + referrer + partner + clip + shareSection;
        
    } else if(type == "articleToolsSave") {
        store = "&store=nytOneClick";
        return "http://timesfile.nytimes.com/store?" + pop + title + url + referrer + partner + store + clip + shareSection;
        
    } else {
        store = "&store=mostPopularOneClick";
        
        if(days) {
            days = "&days=" + days;
        }
        
        if(mppg) {
            page = "&page" + mppg;
        }
        
        //prompt("MP One Click Save URL", "http://timesfile.nytimes.com/store?" + pop + title + url + referrer + partner + store + clip + shareSection + page + days);
        
        return "http://timesfile.nytimes.com/store?" + pop + title + url + referrer + partner + store + clip + shareSection + page + days;
        
    }
    
}

function encodeIt(strToEncode) {
    if (typeof(encodeURIComponent) != 'function') {
        retVal = escape(strToEncode);
        
    } else {
	    retVal = encodeURIComponent(strToEncode);
	    
    }
    return retVal;
}

function decodeIt(strToDecode) {
    if (typeof(decodeURIComponent) != 'function') {
        retVal = unescape(strToEncode);
        
    } else {
	    retVal = decodeURIComponent(strToDecode);
	    
    }
    return retVal;
}

function saveArticle(url) {
	var int_windowLeft = (screen.width - 420) / 2;
	var int_windowTop = (screen.height - 370) / 2;
	var str_windowProperties = ',top=' + int_windowTop + ',left=' + int_windowLeft ;
	new_window = window.open(url,"save","width=420,height=370,scrollbars=0,statusbar=0,resizable=1,toolbar=0,location=0,menubar=0"+str_windowProperties);
	new_window.focus();
}