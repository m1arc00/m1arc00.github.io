if (brightcove == undefined) {
    var brightcove = {};
    brightcove.getExperience = function() {
        alert("Please import APIModules_all.js in order to use the API.");
    };
}

brightcove.servicesURL = 'http://c.brightcove.com/services';
brightcove.cdnURL = 'http://admin.brightcove.com';
brightcove.secureServicesURL = 'https://secure.brightcove.com/services';
brightcove.experiences = {};
brightcove.experienceNum = 0;
brightcove.majorVersion = 9;
brightcove.minorVersion = 0;
brightcove.minorRevision = 28;

// remove post Naga
var brightcoveJS = brightcove;

brightcove.createExperiences = function(pEvent, pElementID) {
    brightcove.removeListeners();

    var pDefaultParam = {};
    pDefaultParam.width  = '100%';
    pDefaultParam.height = '100%';

    var pDefaultFParam = {};
    pDefaultFParam.allowScriptAccess = 'always';
    pDefaultFParam.allowFullScreen = 'true';
    pDefaultFParam.seamlessTabbing   = false;
    pDefaultFParam.swliveconnect     = true;
    pDefaultFParam.wmode   = 'window';
    pDefaultFParam.quality = 'high';
    pDefaultFParam.bgcolor = '#999999';

    var isIE = (window.ActiveXObject != undefined);
    var pMajorVersion = 0;
    var pMinorRevision = 0;
    var pVersions;
    if (typeof navigator.plugins != 'undefined' && navigator.plugins.length > 0) {
        if (navigator.plugins["Shockwave Flash 2.0"] || navigator.plugins["Shockwave Flash"]) {
            var pSWFVersion = navigator.plugins["Shockwave Flash 2.0"] ? " 2.0" : "";
            var pDescription = navigator.plugins["Shockwave Flash" + pSWFVersion].description;
            pVersions = pDescription.split(" ");
            pMajorVersion = pVersions[2].split(".")[0];
            pMinorRevision = pVersions[3];
            if (pMinorRevision == "") {
                pMinorRevision = pVersions[4];
            }
            if (pMinorRevision[0] == "d") {
                pMinorRevision = pMinorRevision.substring(1);
            } else if (pMinorRevision[0] == "r") {
                pMinorRevision = pMinorRevision.substring(1);
                if (pMinorRevision.indexOf("d") > 0) {
                    pMinorRevision = pMinorRevision.substring(0, pMinorRevision.indexOf("d"));
                }
            }
        }
    } else if (isIE) {
        try {
            var pFlash = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");
            pVersions = / ([0-9]+),[0-9],([0-9]+),/.exec(pFlash.GetVariable('$version'));
            pMajorVersion = pVersions[1];
            pMinorRevision = pVersions[2];
        } catch(e) {}
    }

    var pExperiences = [];
    if (pElementID != null) {
        pExperiences.push(document.getElementById(pElementID));
    } else {
        var pAllObjects = document.getElementsByTagName('object');
        var pNumObjects = pAllObjects.length;
        for (var i = 0; i < pNumObjects; i++) {
            if(/\bBrightcoveExperience\b/.test(pAllObjects[i].className)) {
                pExperiences.push(pAllObjects[i]);
            }
        }
    }
    if (isIE) {
        var pParams = document.getElementsByTagName('param');
    }
    var pExperience;
    var pPlayerID = brightcove.getParameter("bcpid");
    var pTitleID = brightcove.getParameter("bctid");
    var pLineupID = brightcove.getParameter("bclid");
    var pNumExperiences = pExperiences.length;
    var pRequestedMinorRevision;
    var pRequestedMajorVersion;
    for (var i = 0; i < pNumExperiences; i++) {

        pExperience = pExperiences[i];
        if (!pExperience.params) pExperience.params = {};
        if (!pExperience.fParams) pExperience.fParams = {};
        for (var j in pDefaultParam) {
            pExperience.params[j] = pDefaultParam[j];
        }
        for (var j in pDefaultFParam) {
            pExperience.fParams[j] = pDefaultFParam[j];
        }
        if (pExperience.id.length > 0) {
            pExperience.params.flashID = pExperience.id;
        } else {
            pExperience.id = pExperience.params.flashID = 'bcExperienceObj' + (brightcove.experienceNum++);
        }
        if (!isIE) {
            var pParams = pExperience.getElementsByTagName('param');
        }
        var pNumParams = pParams.length;
        var pParam;
        for (var j = 0; j < pNumParams; j++) {
            pParam = pParams[j];
            if (isIE && pParam.parentNode.id != pExperience.id) {
                continue;
            }
            pExperience.params[pParam.name] = pParam.value;
        }
        if (pExperience.params.majorVersion != undefined) {
            pRequestedMajorVersion = parseInt(pExperience.params.majorVersion);
        } else {
            pRequestedMajorVersion = brightcove.majorVersion;
        }
        if (pExperience.params.minorRevision != undefined) {
            pRequestedMinorRevision = parseInt(pExperience.params.minorRevision);
        } else {
            pRequestedMinorRevision = brightcove.minorRevision;
        }
        var pUseInstaller = false;
        if (pMajorVersion < pRequestedMajorVersion || 
            (pMajorVersion == pRequestedMajorVersion && pMinorRevision < pRequestedMinorRevision)
        ) {
            pUseInstaller = true;
        }
        if (pExperience.params.bgcolor != undefined) pExperience.fParams.bgcolor = pExperience.params.bgcolor;
        if (pExperience.params.wmode != undefined) pExperience.fParams.wmode = pExperience.params.wmode;
        if (pPlayerID.length < 1  || (pPlayerID == pExperience.params.playerID)) {
            if (pPlayerID != pExperience.params.playerID && pPlayerID.length > 0) {
                pExperience.params.playerID = pPlayerID;
            }
            if (pTitleID.length > 0) {
                pExperience.params.videoID = pTitleID;
                pExperience.params.autoStart = true;
                pExperience.params.fromLink = true;
            }
            if (pLineupID.length > 0) {
                pExperience.params.lineupID = pLineupID;
            }
        }

        var pFile;
        if (pUseInstaller) {
            pFile = brightcove.cdnURL + "/viewer/playerProductInstall.swf";
            var MMPlayerType = isIE ? "ActiveX" : "PlugIn";
            document.title = document.title.slice(0, 47) + " - Flash Player Installation";
            var MMdoctitle = document.title;
            pFile += "?&MMredirectURL="+window.location+'&MMplayerType='+MMPlayerType+'&MMdoctitle='+MMdoctitle;
        } else {
            if (pExperience.params.secureConnections == "true") {
                pFile = brightcove.secureServicesURL;
            } else {
                pFile = brightcove.servicesURL;
            }
            pFile += ('/viewer/federated_f9?' + brightcove.getOverrides());

            for (var pConfig in pExperience.params) {
                pFile += '&' + encodeURIComponent(pConfig) + '=' + encodeURIComponent(pExperience.params[pConfig]);
            }

        }

        var pExperienceElement;
        if (isIE) {
            var pContainer = document.createElement('span');
            if (pExperience.params.height.charAt(pExperience.params.height.length-1) == "%") {
                pContainer.style.display = 'block';
            } else {
                pContainer.style.display = 'inline-block';
            }
            pContainer.id = '_container' + i;
            pExperience.fParams.movie = pFile;
            var pOptions = '';
            for (var pOption in pExperience.fParams) {
                pOptions += '<param name="' + pOption + '" value="' + pExperience.fParams[pOption] + '" />';
            }
            var pProtocol = (pExperience.params.secureConnections == "true") ? "https" : "http";
            var pExperienceHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"'
            + ' codebase="' + pProtocol + '://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=' + brightcove.majorVersion + ',' + brightcove.majorRevision + ',' + brightcove.minorRevision + ',0"'
            + ' id="' + pExperience.id + '"'
            + ' width="' + pExperience.params.width + '"'
            + ' height="' + pExperience.params.height + '"'
            + ' class="BrightcoveExperience">'
            + pOptions
            + '</object>';
            pExperience.parentNode.replaceChild(pContainer, pExperience);
            document.getElementById('_container' + i).innerHTML = pExperienceHTML;
            pExperience.experience = document.getElementById(pExperience.id);
            brightcove.experiences[pExperience.id] = pContainer;
        } else {
            var pExperienceElement = document.createElementNS('http://www.w3.org/1999/xhtml', 'object');
            pExperienceElement.type = 'application/x-shockwave-flash';
            pExperienceElement.data = pFile;
            pExperienceElement.id = pExperience.params.flashID;
            pExperienceElement.width = pExperience.params.width;
            pExperienceElement.height = pExperience.params.height;
            pExperienceElement.className = pExperience.className;
            var pTempParam;
            for (var pConfig in pExperience.fParams) {
                pTempParam = document.createElementNS('http://www.w3.org/1999/xhtml', 'param');
                pTempParam.name = pConfig;
                pTempParam.value = pExperience.fParams[pConfig];
                pExperienceElement.appendChild(pTempParam);
            }
            pExperience.parentNode.replaceChild(pExperienceElement, pExperience);
            brightcove.experiences[pExperience.id] = pExperienceElement;
        }
    }
};

brightcove.createExperience = function(pElement, pParentOrSibling, pAppend) {
    if (!pElement.id || pElement.id.length < 1) {
        pElement.id = 'bcExperienceObj' + (brightcove.experienceNum++);
    }
    if (pAppend) {
        pParentOrSibling.appendChild(pElement);
    } else {
        pParentOrSibling.parentNode.insertBefore(pElement, pParentOrSibling);
    }
    brightcove.createExperiences(null, pElement.id);
};

brightcove.removeExperience = function(pID) {
    if (brightcove.experiences[pID] != null) {
        brightcove.experiences[pID].parentNode.removeChild(brightcove.experiences[pID]);
    }
};

brightcove.getURL = function() {
    var pURL;
    if (typeof window.location.search != 'undefined') {
        pURL = window.location.search;
    } else {
        pURL = /(\?.*)$/.exec(document.location.href);
    }
    return pURL;
};

brightcove.getOverrides = function() {
    var pURL = brightcove.getURL();
    var pQuery = new RegExp('@[\\w\\.]+=\\w+', 'g');
    var pValue = pQuery.exec(pURL);
    var pOverrides = "";
    while (pValue != null) {
        pOverrides += "&" + pValue;
        pValue = pQuery.exec(pURL);
    }
    
    return pOverrides;
};

brightcove.getParameter = function(pName, pDefaultValue) {
    if (pDefaultValue == null) pDefaultValue = "";
    var pURL = brightcove.getURL();
    var pQuery = new RegExp(pName + '=([^&]*)');
    var pValue = pQuery.exec(pURL);
    if (pValue != null) {
        return pValue[1];
    } else {
        return pDefaultValue;
    }
};

brightcove.createElement = function(el) {
    if (document.createElementNS) {
        return document.createElementNS('http://www.w3.org/1999/xhtml', el);
    } else {
        return document.createElement(el);
    }
};

brightcove.i18n = {
    'BROWSER_TOO_OLD'      : 'The browser you are using is too old. Please upgrade to the latest version of your browser.'
};

brightcove.removeListeners = function() {
    if (/KHTML/i.test(navigator.userAgent)) {
        clearInterval(checkLoad);
        document.removeEventListener('load', brightcove.createExperiences, false);
    }
    if (typeof window.addEventListener != 'undefined') {
        document.removeEventListener('DOMContentLoaded', brightcove.createExperiences, false);
        document.removeEventListener('load', brightcove.createExperiences, false);
    } else if (typeof window.attachEvent != 'undefined') {
        window.detachEvent('onload', brightcove.createExperiences);
    }
};

if (/KHTML/i.test(navigator.userAgent)) {
    var checkLoad = setInterval(function() { if(/loaded|complete/.test(document.readyState)) { clearInterval(checkLoad); brightcove.createExperiences(); }}, 70);
    document.addEventListener('load', brightcove.createExperiences, false);
}
if (typeof window.addEventListener != 'undefined') {
    document.addEventListener('DOMContentLoaded', brightcove.createExperiences, false);
    document.addEventListener('load', brightcove.createExperiences, false);
} else if (typeof window.attachEvent != 'undefined') {
    window.attachEvent('onload', brightcove.createExperiences);
} else {
    alert(brightcove.i18n.BROWSER_TOO_OLD);
}
