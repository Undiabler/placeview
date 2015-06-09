var L = require('./leaflet.js');
require('./leaflet.markercluster.js');
require('./../test.js');
// var React = require('./../react-with-addons.js');

var geo = window.user.geoCode();

var lng=L.latLng(geo[0], geo[1]);
var map = L.map('map', {
	minZoom: 3,
	center: lng,
	zoom: geo[2],
	zoomControl:false 
});

if (navigator.geolocation) {

	function remove_geo_class(){
		$("#map_geolocation").removeClass('active');
		map.off('move', remove_geo_class);
	}

	function showPosition(position) {
	    map.setView(new L.LatLng(position.coords.latitude, position.coords.longitude), 12, {animation: true});
		setTimeout(function(){map.on('move', remove_geo_class);},1000);
	}

	$("#map_geolocation").click(function(){
		$(this).addClass("active");
	    navigator.geolocation.getCurrentPosition(showPosition);
	});

} else {
	$("#map_geolocation").hide();
}



	L.Icon.Default.imagePath = '/img';

	var accessToken = 'pk.eyJ1IjoidW5kaWFibGVyIiwiYSI6IklmTWFaNTQifQ.AdDOmeVgWcAOPofiAolAmQ';
	//токен для дотупа на mapbox

	var mapboxTiles = L.tileLayer('https://{s}.tiles.mapbox.com/v4/examples.map-h61e8o8e/{z}/{x}/{y}.png?access_token=' + accessToken, {
	    attribution: '<a href="http://www.mapbox.com/about/maps/" target="_blank">Terms &amp; Feedback</a>'
	}).addTo(map);

		var progress = document.getElementById('progress');
		var progressBar = document.getElementById('progress-bar');
		function updateProgressBar(processed, total, elapsed, layersArray) {
			if (elapsed > 1000) {
				// if it takes more than a second to load, display the progress bar:
				progress.style.display = 'block';
				progressBar.style.width = Math.round(processed/total*100) + '%';
			}

			if (processed === total) {
				// all markers processed - hide the progress bar:
				progress.style.display = 'none';
			}
		}

	map.on('popupopen', function(){
	    var cont = document.getElementsByClassName('leaflet-popup-content')[0];
	    var lst = cont.getElementsByClassName('tour_cont')[0];
	    tour_id = lst.getAttribute('data-id');
	    lst.getElementsByTagName('img')[0].src='http://img.placeview.in/preview/'+tour_id;
	    console.log(tour_id);

	    $.ajax({
		  url: "/ajax/tour",
		  data: {id:tour_id,lang:window.user.lang()}
		}).done(function( data ) {

			// TODO:добавить кэш уже загруженных
			console.log(data);
			if (data && data.code == 0) {
				var cont = document.getElementsByClassName('leaflet-popup-content')[0];
				var info = cont.getElementsByClassName('info')[0];
				info.getElementsByTagName('h5')[0].innerHTML=data.data.text.name || 'No name';

				var author = cont.getElementsByClassName('author')[0];
				author.getElementsByTagName('img')[0].src='http://img.placeview.in/avatars/ava'+data.data.tour.creator_id+'.jpg';

			}
		});
	});

		var markers = L.markerClusterGroup({ chunkedLoading: true, chunkProgress: updateProgressBar });

		//console.log('start creating markers: ' + window.performance.now());
		$.ajax({
		  url: "/ajax/map",
		}).done(function( data ) {

			var markerList = [];

			for (var i = 0; i < data.tours.length; i++) {
				var a = data.tours[i];
				var id = a.id;
				var marker = L.marker(L.latLng(a.map_x, a.map_y),{icon:giveimg(a.category_id)});
				marker.bindPopup('<div class="tour_cont" data-id="'+id+'">\
	  		<a href="#"><img src="about:blank"></a>\
	  	</div>\
	  	<div class="info">\
	  		<a href="#">\
		  		<h5>\
		  			...\
		  		</h5>\
	  		</a>\
	  		<span class="place" style="display:none;">\
	  			<a href="#">Днепреопетровск,</a> <a href="#">Украина</a>\
	  		</span>\
	  	</div>\
	  	<div class="clearfix"></div>\
	  	<div class="social">\
	  		<div class="elem">\
	  			<i class="fa fa-heart"></i> 27\
	  		</div>\
	  		<div class="elem">\
	  			<i class="fa fa-eye"></i> 27\
	  		</div>\
	  		<div class="elem">\
	  			<i class="fa fa-picture-o"></i> 27\
	  		</div>\
	    </div>\
		<div class="author">\
			<div class="name">\
	          <a href="#">\
	            NONAME\
	          </a>\
	        </div>\
	        <div class="avatar">\
	          <img src="about:blank">\
	        </div>\
	      </div>');
				markerList.push(marker);
			}

			markers.addLayers(markerList);
			map.addLayer(markers);
		
		});

		//console.log('end clustering: ' + window.performance.now());
		
		function giveimg(type){
			var idt=0;
			
			switch (parseInt(type)) {

			case 1: 
			case 2: 
			case 3: 
			case 4: 
			case 5: 
			case 6: 
			case 7: 
			case 8: 
			case 9: 
			case 10: 
			case 11: 
			case 12: 
			case 13: 
			case 14: 
			case 15: 
			case 16: 
			case 17: 
			case 18: 
			case 19: 
			case 20: 
			case 21: 
			case 22: idt=1; break;
			case 23: 
			case 24: 
			case 25: 
			case 26: 
			case 27: 
			case 28: 
			case 29: 
			case 30: 
			case 31: 
			case 32: 
			case 33: 
			case 34: 
			case 35: 
			case 36: 
			case 37: 
			case 38: 
			case 39: 
			case 40: 
			case 41: 
			case 42: idt=2; break;
			case 43: 
			case 44: 
			case 45: 
			case 46: 
			case 47: 
			case 48: 
			case 49: 
			case 50: 
			case 51: 
			case 52: 
			case 53: 
			case 54: idt=3; break;
			case 55: 
			case 56: 
			case 57: 
			case 58: 
			case 59: 
			case 60: 
			case 61: 
			case 62: 
			case 63: 
			case 64: 
			case 65: 
			case 66: 
			case 67: 
			case 68: 
			case 69: 
			case 70: 
			case 71: 
			case 72: 
			case 73: 
			case 74: 
			case 75: 
			case 76: 
			case 77: 
			case 78: 
			case 79: 
			case 80: 
			case 81: 
			case 82: 
			case 83: 
			case 84: idt=4; break;
			case 85: 
			case 86: 
			case 87: 
			case 88: 
			case 89: 
			case 90: 
			case 91: 
			case 92: 
			case 93: 
			case 94: 
			case 95: 
			case 96: 
			case 97: 
			case 98: 
			case 99: 
			case 100: 
			case 101: idt=5; break;
			case 102: 
			case 103: 
			case 104: 
			case 105: 
			case 106: 
			case 107: 
			case 108: 
			case 109: 
			case 110: idt=6; break;
			case 111: 
			case 112: 
			case 113: 
			case 114: 
			case 115: 
			case 116: 
			case 117: 
			case 118: 
			case 119: idt=7; break;
			case 120: 
			case 121: 
			case 122: 
			case 123: 
			case 124: 
			case 125: 
			case 126: 
			case 127: idt=8; break;
			case 128: 
			case 129: 
			case 130: 
			case 131: 
			case 132: 
			case 133: 
			case 134: 
			case 135: 
			case 136: 
			case 137: idt=9; break;
			case 138: 
			case 139: 
			case 140: idt=10; break;

			}
		
			return L.icon({
			    iconUrl: '/img/map/'+idt+'b.png',

			    iconSize:     [40, 40], // size of the icon

			    // shadowSize:   [50, 64], // size of the shadow
			    iconAnchor:   [20, 20], // point of the icon which will correspond to marker's location
			    // shadowAnchor: [4, 62],  // the same for the shadow
			    popupAnchor:  [0, -24] // point from which the popup should open relative to the iconAnchor
			});
		}