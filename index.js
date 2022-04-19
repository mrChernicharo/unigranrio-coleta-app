import { config, mapThemes } from './config.js';
let initialZoom = 12;
const points = [];
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

	setPoints(map);

	map.addListener('center_changed', () => {
		console.log('center_changed', [map.center.lat(), map.center.lng()]);
	});
}

function setPoints(map) {
	let i = 0;
	locations.forEach(location => {
		const { name, lat, lng } = location;

		const marker = new google.maps.Marker({
			position: { lat, lng },
			map,
			title: name,
			icon: image,
			// label: name,
			// collisionBehavior:
			// 	google.maps.CollisionBehavior.REQUIRED_AND_HIDES_OPTIONAL,
		});

		points.push({
			title: marker.title,
			latitude: lat,
			longitude: lng,
		});

		marker.addListener('click', e => {
			let zoom = map.zoom < 18 ? map.zoom + 1 : map.zoom;
			map.setZoom(zoom);
			map.setCenter();
			currentPoint = points[i];
			console.log('marker:click', {
				e,
				map,
				marker,
				markerData: points[i],
			});
			i++;
		});
	});
}

function appendMapScript() {
	const script = document.createElement('script');
	script.src = `https://maps.googleapis.com/maps/api/js?key=${config.API_KEYS}&callback=initMap`;
	document.body.appendChild(script);
}

window.initMap = initMap;
