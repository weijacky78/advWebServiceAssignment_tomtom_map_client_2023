import "./css/styles.css";
import tt from "@tomtom-international/web-sdk-maps"
import map1Style from "./js/map1";
import ipLocation from "./js/ipLocation";
import jsLocation from "./js/jsLocation";
import jsWatchLocation from "./js/jsWatchLocation";
import ottawaLocation from "./js/ottawaLocation";
import weather from "./js/weather";

import templateRoot from './hbs/root.hbs';
import templateMap from './hbs/map.hbs';

// use root template, apply to "app" div
let appEl = document.getElementById("app");
let mainEl;
appEl.innerHTML = templateRoot({ siteInfo: { title: "30 Ottawa Nature Park Locations" } });
let locationMarkers = [];

window.onload = () => {

	weather().then((data) => {
		let weatherEl = document.getElementById("weather");
		weatherEl.innerHTML = `<div>${data.date}</div>` + `<div>${data.wDescriptions}` + `<div>${data.temperature}`
	});



	mainEl = document.getElementById("main");
	mainEl.innerHTML = templateMap({});
	// initWeather();
	initMap();


	ottawaLocation().then((posList) => {
		let selectBox = document.getElementById("places");
		locationMarkers = []; // reset the locationMarkers into a blank array
		let i = 0;
		for (let pos of posList) {
			let lMarker = new tt.Marker().setLngLat([pos.lng, pos.lat]).addTo(map);
			lMarker.getElement().addEventListener('click', function (e) {
				map.easeTo({ center: lMarker.getLngLat(), zoom: 14, pitch: 45, bearing: 45, duration: 2000 });
				e.stopPropagation();
				var lpopup = new tt.Popup({ className: 'lpopup' })
					.setHTML(`<div>${pos.name}</div>` + `<div>${pos.address}</div>`)
					.addTo(map);

				lMarker.setPopup(lpopup);
			});
			locationMarkers[i] = lMarker;
			let opt = document.createElement("option");
			opt.value = i; // set the order number of options to 'i' which represented the order num of the array order
			opt.text = pos.name;

			selectBox.add(opt);
			i++;

		};
		selectBox.addEventListener('change', function (e) {
			map.easeTo({
				center: locationMarkers[selectBox.selectedIndex].getLngLat(),
				zoom: 18, pitch: 45, bearing: 45, duration: 2000
			});
		});


	});

	ipLocation().then((location) => {

		// jsWatchLocation((pos) => {
		// let jsMarker = new tt.Marker().setLngLat([pos.longitude, pos.latitude]).addTo(map);
		// 	// console.log(pos);
		// });


		jsLocation((pos) => {
			let jsMarker = new tt.Marker().setLngLat([pos.longitude, pos.latitude]).addTo(map);

		});

		let marker = new tt.Marker().setLngLat([location.lng, location.lat]).addTo(map);
		marker.getElement().addEventListener('click', function (e) {
			map.easeTo({ center: marker.getLngLat(), zoom: 14, pitch: 45, bearing: 45, duration: 2000 });
			e.stopPropagation();
		});

		// document.getElementById("map").addEventListener('click', function () {
		// 	map.easeTo({ center: marker.getLngLat(), zoom: 12, pitch: 10, bearing: 0, duration: 2000 });
		// });



		// map.setBearing(0);

		// var marker = new tt.Marker().setLngLat([-75.737609, 45.455313]).addTo(map);


		var popup = new tt.Popup({ className: 'popup' })
			.setHTML("<h1>Here is the location of your ip address!</h1>")
			.addTo(map);

		marker.setPopup(popup);
		// marker.getElement().addEventListener("click", function () {
		// 	console.log("marker clicked");
		// });


	});
};

let map;
let initMap = () => {
	tt.setProductInfo("test-demo", "0.0.1");
	map = tt.map({
		key: "yGAHDK7KSva4J6KDjwBtsLmFGFb0AHE9",
		container: "map",
		style: map1Style,
		center: [-75.737609, 45.455313],
		zoom: 12,
		pitch: 10
	});

};



