var map = L.map('weathermap').setView([38, -95], 4);
        L.tileLayer(
            "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        { attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>' }
        ).addTo(map);

var radarURL = 'https://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r.cgi';
var radarDisplayOptions = {
    layers: 'nexrad-n0r-900913',
    format: 'image/png',
    transparent: true
};

var radar = L.tileLayer.wms(radarURL, radarDisplayOptions).addTo(map);

var weatherAlertsUrl = 'https://api.weather.gov/alerts/active?region_type=land';

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