import config from './_config.js';

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
		zoom: 12,
		center: { lat, lng },
	});

	setMarkers(map);
}

function setMarkers(map) {
	locations.forEach(loc => {
		const { name, lat, lng } = loc;
		const marker = new google.maps.Marker({
			position: { lat, lng },
			title: name,
			// label: name,
			icon: image,
		});

		marker.setMap(map);
	});
}

function appendMapScript() {
	const script = document.createElement('script');
	script.src = `https://maps.googleapis.com/maps/api/js?key=${config.API_KEYS}&callback=initMap`;
	document.body.appendChild(script);
}

window.initMap = initMap;
