var BrowserDetect = {
	init: function () {
		this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
		
		this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion)
			|| "an unknown version";

		this.OS = this.searchString(this.dataOS) || "an unknown OS";
	},
	searchString: function (data) {
		for (var i=0;i<data.length;i++)	{

			var dataString = data[i].string;
			var dataProp = data[i].prop;

			this.versionSearchString = data[i].versionSearch || data[i].You_are;

			if (dataString) {
				if (dataString.indexOf(data[i].subString) != -1)
					return data[i].You_are;
			}
			else if (dataProp)
				return data[i].You_are;
		}
	},
	searchVersion: function (dataString) {
		var index = dataString.indexOf(this.versionSearchString);
		if (index == -1) return;
		return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
	},
	dataBrowser: [
		{
			string: navigator.userAgent,
			subString: "Chrome",
			You_are: "Chrome"
		},
		{ 	string: navigator.userAgent,
			subString: "OmniWeb",
			versionSearch: "OmniWeb/",
			You_are: "OmniWeb"
		},
		{
			string: navigator.userAgent,
			subString: "AppleWebKit",
			You_are: "AndroidNaitive",
			versionSearch: "AppleWebKit/"
		},
		{
			string: navigator.vendor,
			subString: "Apple",
			You_are: "Safari",
			versionSearch: "Version"
		},
		{
			prop: window.opera,
			You_are: "Opera",
			versionSearch: "Version"
		},
		{
			string: navigator.vendor,
			subString: "iCab",
			You_are: "iCab"
		},
		{
			string: navigator.vendor,
			subString: "KDE",
			You_are: "Konqueror"
		},
		{
			string: navigator.userAgent,
			subString: "Firefox",
			You_are: "Firefox"
		},
		{
			string: navigator.vendor,
			subString: "Camino",
			You_are: "Camino"
		},
		{		// for newer Netscapes (6+)
			string: navigator.userAgent,
			subString: "Netscape",
			You_are: "Netscape"
		},
		{
			string: navigator.userAgent,
			subString: "MSIE",
			You_are: "Explorer",
			versionSearch: "MSIE"
		},
		{
			string: navigator.userAgent,
			subString: "Trident/7.0",
			You_are: "Explorer",
			versionSearch: "rv:"
		},
		{
			string: navigator.userAgent,
			subString: "Gecko",
			You_are: "Mozilla",
			versionSearch: "rv"
		},
		{ 		// for older Netscapes (4-)
			string: navigator.userAgent,
			subString: "Mozilla",
			You_are: "Netscape",
			versionSearch: "Mozilla"
		}
	],
	dataOS : [
		{
			string: navigator.platform,
			subString: "Win",
			You_are: "Windows"
		},
		{
			string: navigator.platform,
			subString: "Mac",
			You_are: "Mac"
		},
		{
			   string: navigator.userAgent,
			   subString: "iPhone",
			   You_are: "iPhone/iPod"
	    },
		{
			string: navigator.platform,
			subString: "Linux",
			You_are: "Linux"
		}
	]

};
BrowserDetect.init();
function checkmybrowser(){

   /* code of exceptions

   0 - peace of shit, take new browser!
   1 - strange browser, we dont know who you are!
   2 - opera/explorer will suck, canvas only!
   3 - old browser, but norm.
   4 - wery weell!
   5 - no resize;
   6 - safari flush me;

   */
  
   if (BrowserDetect.browser=="An unknown browser") { oldBrowser(1); return 1;}

   // if (BrowserDetect.browser=="Firefox" && BrowserDetect.version<25)      {return 3;}
   if (BrowserDetect.browser=="AndroidNaitive")   return 5;
   // if (BrowserDetect.browser=="Chrome" && BrowserDetect.version<30)    return 3;
   // if ((BrowserDetect.browser=="Opera"))                                                          return 2;
   if (BrowserDetect.browser=="Explorer")  { oldBrowser(1); return 0;} else return 2;
   if (BrowserDetect.OS=="Mac") return 6;
  // if ((BrowserDetect.browser=="")&&(BrowserDetect.version<=)) return "";
  // if ((BrowserDetect.browser=="")&&(BrowserDetect.version<=)) return "";
  // if ((BrowserDetect.browser=="")&&(BrowserDetect.version<=)) return "";
  // if ((BrowserDetect.browser=="")&&(BrowserDetect.version<=)) return "";

   return 4;

}

function collectdata(){
	var device={screen:{},info:''};
	device.screen.w=screen.width;
	device.screen.h=screen.height;
	device.screen.iw=window.innerWidth;
	device.screen.ih=window.innerHeight;
	// device.
	var _navigator = {};
	for (var i in navigator) _navigator[i] = navigator[i];
	
	delete _navigator.plugins;
	delete _navigator.mimeTypes;
	delete _navigator.webkitPersistentStorage;
	delete _navigator.webkitTemporaryStorage;
	delete _navigator.geolocation;

	device.info=JSON.stringify(_navigator);
	device.classheaders=document.documentElement.className;

	if (typeof window._plvE != 'undefined') {
		device.engines=_plvE.detectme;
	} else device.engines='error';

	return JSON.stringify(device);
}

function agentwebgl(){
	if (navigator.userAgent.indexOf('Lenovo S650/S100')>0) return false;
	return true;
}

function __agent_animate(){
	if (navigator.userAgent.indexOf('ASUS Transformer Pad TF300T')>=0 && navigator.userAgent.indexOf('Chrome')<0 ) return false;
	return true;
}