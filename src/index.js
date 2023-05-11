//styling
import "./css/styles.css";

//modules
import weather from "./js/weather";
//import tt from "@tomtom-international/web-sdk-maps";
// import map1Style from "./js/map1";
import mapInit from "./js/mapinitializer.js";

// list of pages for nav-link
import pages from './js/json/pages.js';

//templates
import templatePages from './hbs/pages.hbs'; // daddy template
import templateRoot from './hbs/root.hbs'; // landing
import templateMap from './hbs/map.hbs'; // map
import templateInfo from './hbs/info.hbs'; // info
import templateContact from './hbs/contact.hbs'; // contact
import templateWeather from './hbs/weather.hbs'; //weather template

let appEl = document.getElementById("app");
let mainEl;
appEl.innerHTML = templateRoot({ siteInfo: { title: "30 Ottawa Nature Park Locations" } });
let locationMarkers = [];

window.onload = () => {
	console.log(pages);
	mainEl.innerHTML = templatePages(pages.pages[0]); // makes the page on load be [0] in the list (Home, in this case)

	let elsNavLink = document.getElementsByClassName("navigation-li"); // grabbing navigation-link for for loop

	for (let elLink of elsNavLink) {

		elLink.addEventListener('click', function () {
			let page = { name: this.dataset.link };

			// if Home is clicked on it shows the home page and fetches the stuff from the json file
			if (page.name === "Home") {
				mainEl.innerHTML = templateRoot();
			}

			if (page.name === "Map") {
				mainEl.innerHTML = templateMap({});
				mapInit(); // calling module mapinitializer.js

			}

			if (page.name === "Info") {
				mainEl.innerHTML = templateInfo();
			}

			else if (page.name === "Contact Us") {
				mainEl.innerHTML = templateContact();
			}

		});

	}
}

//mainEl = document.getElementById("main");
//  reactivate later
//


// weather stuff
// initWeather();

// get this to show on load
weather().then((data) => {
	let weatherEl = document.getElementById("weatherBar");
	weatherEl.innerHTML = templateWeather(data);
	//weatherEl.innerHTML = `<div>${data.date}</div>` + `<div>${data.wDescriptions}</div>` + `<div>${data.temperature}&#176C</div>`
});







