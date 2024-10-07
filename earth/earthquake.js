var map = L.map('earthquakemap').setView([38, -95], 4);

var CartoDB_DarkMatterNoLabels = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
	subdomains: 'abcd',
	maxZoom: 20
}).addTo(map);


var radarURL = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson';
var radarDisplayOptions = {
    layers: 'nexrad-n0r-900913',
    format: 'image/png',
    transparent: true
};

var radar = L.tileLayer.wms(radarURL, radarDisplayOptions).addTo(map);

var earthurl= 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson';

$.getJSON(earthurl, function(data) {
    L.geoJSON(data, {
        pointToLayer: function(feature, latlng) {
            var mag = feature.properties.mag;
            var markerColor = 'orange'
            if (feature.properties.mag >=5) markerColor = 'red';
            else if (feature.properties.mag >= 4) markerColor = 'blue';
            else if (feature.properties.mag >= 3) markerColor = 'yellow';
            else if (feature.properties.mag >= 2) markerColor = 'purple';
            else if (feature.properties.mag >= 1) markerColor = 'green';
            return { color: markerColor };
        },
        onEachFeature: function(feature, layer) {  
            layer.bindPopup(feature.properties.title);
        }
    }).addTo(map);
});