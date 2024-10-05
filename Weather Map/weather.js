var map = L.map('weathermap').setView([38, -95], 4);

var CartoDB_DarkMatterNoLabels = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
	subdomains: 'abcd',
	maxZoom: 20
}).addTo(map);

var radarURL = 'https://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r.cgi';
var radarDisplayOptions = {
    layers: 'nexrad-n0r-900913',
    format: 'image/png',
    transparent: true,
    maxZoom: 20
};
var radar = L.tileLayer.wms(radarURL, radarDisplayOptions).addTo(map);

var weatherAlertsUrl = 'https://www.weather.gov/documentation/services-web-api#/default/get_alerts_active';

$.getJSON(weatherAlertsUrl, function(data) {
    L.geoJSON(data, {
        style: function(feature) {
            var alertColor = 'orange';
            if (feature.properties.severity === 'Severe') alertColor = 'red';
            else if (feature.properties.severity === 'Minor') alertColor = 'pink';
            return { color: alertColor };
        },
        onEachFeature: function(feature, layer) {  
            layer.bindPopup(feature.properties.headline);
        }
    }).addTo(map);
});