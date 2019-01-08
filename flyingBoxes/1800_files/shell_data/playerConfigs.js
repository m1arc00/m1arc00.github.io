
if( typeof window.NYTD == 'undefined' ) { window.NYTD = { Video : {} }; } else if( typeof window.NYTD.Video == 'undefined' ) { window.NYTD.Video = {}; };

window.NYTD.Video.environment = 'production';

window.NYTD.Video.SinglePlayers = {};
window.NYTD.Video.SinglePlayers.Defaults = {

	"all" : {
		"article" : {
			"adxPagename" : "",
			"properName"  : "Article"
		},
		"section" : {
			"adxPagename" : "www.nytimes.com/pages/video",
			"properName"  : "Section"
		},
		"homepage" : {
			"adxPagename" : "www.nytimes.com/homepage/video",
			"properName"  : "Homepage"
		}
	},

	"production" : {
		"common" : {
			"BC_Token"   : "MDhcs_hM7HZEUOs06_vXx2RPiwpIeimFUouI_CszCgc.",
			"PubId"      : 1749339200,
			"TransInfo"  : {
				videoHostBase     : "http://video.nytimes.com",
				fr2bcTransPath    : "/fr2knews/",
				fr2bcFilename     : "/knewsIdScript.js",
				fr2bcCallback     : "?callback=",
				"fr2bcAddlParams" : "&addlParams="
			},
			"AdxInfo"    : {
				"hostBase"  : "http://video.nytimes.com",
				"pathBase"  : "/svc/ads/video/SinglePlayerVideoAd.js",
				"positions" : "VideoPlayerAd,ADX_CLIENTSIDE,Inv1,Inv2,Inv3"
			}
		},
		"article"  : {
			"width"       : 318, 
			"height"      : 328,
			"playerId"    : "1803302902"
		},
		"section"  : {
			"width"       : 312,
			"height"      : 225,
			"playerId"    : "1803302900",
			"playlistId"  : "1194811622182"
		},
		"homepage" : {
			"width"       : 312,
			"height"      : 225,
			"playerId"    : "1803302900",
			"playlistId"  : "1194811622182"
		}
	}
};

window.NYTD.Video.SinglePlayers.active = window.NYTD.Video.SinglePlayers.Defaults[ window.NYTD.Video.environment ];
