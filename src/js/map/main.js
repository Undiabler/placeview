var L = require('./leaflet.js');
require('./leaflet.markercluster.js');
require('./../test.js');
var React = require('./../react-with-addons.js');

var lng=L.latLng(-37.79, 175.27);
var map = L.map('map', {
	minZoom: 3,
	center: lng,
	zoom: 13
});

L.Icon.Default.imagePath = 'img';

// var CartoDB_Positron = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
//     attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
//     subdomains: 'abcd',
//     minZoom: 0,
//     maxZoom: 10
// }).addTo(map);

var accessToken = 'pk.eyJ1IjoidW5kaWFibGVyIiwiYSI6IklmTWFaNTQifQ.AdDOmeVgWcAOPofiAolAmQ';
// Replace 'examples.map-i87786ca' with your map id.
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

		var markers = L.markerClusterGroup({ chunkedLoading: true, chunkProgress: updateProgressBar });

		var markerList = [];

		//console.log('start creating markers: ' + window.performance.now());

		for (var i = 0; i < addressPoints.length; i++) {
			var a = addressPoints[i];
			var title = a[2];
			var marker = L.marker(L.latLng(a[0], a[1]), { title: title });
			marker.bindPopup(title);
			markerList.push(marker);
		}

		//console.log('start clustering: ' + window.performance.now());

		markers.addLayers(markerList);
		map.addLayer(markers);

		//console.log('end clustering: ' + window.performance.now());