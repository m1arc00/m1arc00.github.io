var BC_TOKEN = window.NYTD.Video.SinglePlayers.active.common.BC_Token || 'ERROR';
var bc_gExperience = null;
var bc_gPlayer = null;
var bc_gScreenCover = false;
var bc_gVideoName = "";
var bc_gSection = "";
var bc_gTitleDTO = null;

//Temporary function to call the bc_getVideo which is what NYTimes will call.

window.onload = function() {
	bc_playerInit(videoId);
}

function bc_playerInit(videoId) {
    bc_getVideo(videoId);
    bc_fixBorder();
}

function bc_fixBorder() {
    try {
        if(BrowserDetect.OS == "Windows" && BrowserDetect.browser == "Firefox" && BrowserDetect.version == "3") {
            document.getElementById("bc_articleInfo").style.left = "2px";
            document.getElementById("bc_screenCover").style.left = "2px";
        }
    } catch (e) {

    }
}

function bc_getVideo(pId) {
    //TODO:  Optimize this call by setting the fields we need.
    var findVideosURL = "http://api.brightcove.com/services/library?command=find_video_by_reference_id&reference_id=" + pId + "&token=" + BC_TOKEN + "&callback=bc_videoResults"
    var scriptElem = document.createElement('script');
    scriptElem.setAttribute('src', findVideosURL);
    scriptElem.setAttribute('type','text/javascript');
    document.getElementsByTagName('head')[0].appendChild(scriptElem);
}


function bc_videoResults(pObj) {
	if( typeof(pObj)=='undefined' || pObj==null ) {
		throw new Error( "Null response from BC - possibly an invalid asset ID." );
	}
    pObj.section = bc_getSection(pObj.tags);
    document.getElementById('bc_infoSection').innerHTML = pObj.section; 
    document.getElementById('bc_infoTitle').innerHTML = pObj.name;
    document.getElementById('bc_infoDesc').innerHTML = pObj.longDescription;
    bc_gTitleDTO = pObj;
}


function onTemplateLoaded(pEvent) {
    bc_gExperience = brightcove.getExperience("bc_articlePlayer");
    bc_gPlayer = bc_gExperience.getModule(APIModules.VIDEO_PLAYER);
    
    //Add my event listeners.
    bc_gPlayer.addEventListener(BCVideoEvent.STREAM_START, bc_onStreamStart);
    bc_gPlayer.addEventListener(BCVideoEvent.VIDEO_START, bc_onMediaStart);
    bc_gPlayer.addEventListener(BCVideoEvent.VIDEO_COMPLETE, bc_onVideoComplete);
   
}

function bc_onVideoComplete(pEvent) {
    document.getElementById('bc_screenCover').style.display = "block";
    bc_gScreenCover = true;
    wt_trkVideo("finish");
}

function bc_onStreamStart(pEvent) {
    wt_trkVideo("play");
}

function bc_onMediaStart(pEvent) {
    if(bc_gScreenCover) {
        document.getElementById('bc_screenCover').style.display = "none";
        bc_gScreenCover = false;
    }
}

function bc_getVideoIndex(pId) {
    for(var i=0; i< bc_gPlaylistArray.length; i++) {
        if(bc_gPlaylistArray[i].id === pId) {
            return i;
        }
    }
    return null;
}

function bc_getSection(pArray) {
    for(var i=0; i< pArray.length; i++) {
        if(pArray[i].indexOf('nyto_') > -1) {
            return pArray[i].substring(pArray[i].indexOf('nyto_') + 5).replace(/_/g, " ");
        }
    }
    return "";
}

/**************************************************************************************************
 * WEB TRENDS
 *************************************************************************************************/
function wt_trkVideo(pEvent) {
	dcsMultiTrack("WT.videoName",bc_gTitleDTO.name,"WT.videoCategory",bc_gTitleDTO.section ,"WT.videoLoad","user","WT.videoEvent",pEvent, "WT.z_vid", bc_gTitleDTO.referenceId, "WT.z_vpt", "Single_Page", "WT.z_gpt", "Multimedia", "WT.z_gpst", "Video", "WT.z_gpsst", "Video-Play");
}