import { config, mapThemes } from './config.js';
let initialZoom = 12;
const points = [];
const markers = [];
let currentPoint = null;
const pointInfoContainer = document.querySelector('#selected-point-info');
const locations = [
	{ name: 'Cruz Vermelha', lat: -22.9119, lng: -43.188182 },
	{ name: 'Tavares Bastos', lat: -22.9265298, lng: -43.1798004 },
	{
		name: "Ponta D'areia",
		lat: -22.884210995190944,
		lng: -43.12261832600245,
	},
	{
		name: 'Cascadura',
		lat: -22.879670753825213,
		lng: -43.32359508844605,
	},
];

const image =
	'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';

// const image = {
// 	url: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
// 	size: new google.maps.Size(20, 32),
// 	origin: new google.maps.Point(0, 0),
// 	anchor: new google.maps.Point(0, 32),
// };

function main() {
	console.log(config);
	appendMapScript();
}

main();

function initMap() {
	const { lat, lng } = locations[0];

	const map = new google.maps.Map(document.getElementById('map'), {
		zoom: initialZoom,
		center: { lat, lng },
		styles: mapThemes.retro,
	});

	addMarkers(map);

	map.addListener('center_changed', () => {
		// console.log('center_changed', [map.center.lat(), map.center.lng()]);
	});

	map.addListener('zoom_changed', () => {
		console.log('map zoom:', map.zoom);
	});
}

function addMarkers(map) {
	locations.forEach(location => {
		const { name, lat, lng } = location;

		const marker = new google.maps.Marker({
			position: { lat, lng },
			map,
			title: name,
			icon: image,
			label: '',
			// collisionBehavior:
			// 	google.maps.CollisionBehavior.REQUIRED_AND_HIDES_OPTIONAL,
		});

		markers.push({ ...marker });
		points.push({
			name: marker.title,
			latitude: lat,
			longitude: lng,
		});

		marker.addListener('click', e => {
			let zoom = map.zoom < 18 ? map.zoom + 1 : map.zoom;
			map.setZoom(zoom);
			map.setCenter();
			console.log('marker:click', {
				e,
				map,
				marker,
			});
			updatePointDetails(marker);
		});
	});
}

function appendMapScript() {
	const script = document.createElement('script');
	script.src = `https://maps.googleapis.com/maps/api/js?key=${config.API_KEYS}&callback=initMap`;
	document.body.appendChild(script);
}

function updatePointDetails(marker) {
	const pointInfoDiv = document.createElement('div');
	const pointNameH3 = document.createElement('h3');
	const pointLocation = document.createElement('h5');
	pointInfoContainer.innerHTML = '';
	pointNameH3.textContent = 'Ponto de coleta: ' + marker.title;
	pointLocation.textContent = `latitude: ${marker.position.lat()}, longitude: ${marker.position.lng()} `;
	pointInfoDiv.appendChild(pointNameH3);
	pointInfoDiv.appendChild(pointLocation);
	pointInfoContainer.appendChild(pointInfoDiv);
}

window.initMap = initMap;
