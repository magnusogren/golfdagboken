mapboxgl.accessToken =
  'pk.eyJ1IjoibWFnbnVzb2dyZW4iLCJhIjoiY2tvdmphcmZsMDNlbTJ1bnJoM2tia3VibCJ9.NcsYbg_CaxXDsH11pp8c7w';
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/light-v10',
  center: [14.942265, 63.003276],
  zoom: 4.5,
});

map.addControl(new mapboxgl.NavigationControl());

for (let golfbana of golfbanor) {
  new mapboxgl.Marker()
    .setLngLat(golfbana.geometry.coordinates)
    .setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML(`<h3>${golfbana.title}</h3></p>`))
    .addTo(map);
}
