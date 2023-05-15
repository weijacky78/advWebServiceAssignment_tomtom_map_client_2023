import tt from "@tomtom-international/web-sdk-maps";
import ipLocation from "./ipLocation";
import jsLocation from "./jsLocation";
import ottawaLocation from "./ottawaLocation";
import map1Style from "./map1";

export default function () {
    //map stuff
    let locationMarkers = [];
    let jsMarker;
    let map;
    let initMap = () => {
        console.log("hello mao");
        tt.setProductInfo("test-demo", "0.0.1");
        map = tt.map({
            key: "yGAHDK7KSva4J6KDjwBtsLmFGFb0AHE9",
            container: "map",
            style: map1Style,
            center: [-75.683692, 45.4028986],
            zoom: 10,
            pitch: 10
        });

    };

    initMap();

    ottawaLocation().then((posList) => {
        let locationsEl = document.getElementById("locations");
        locationMarkers = []; // reset the locationMarkers into a blank array
        let i = 0;
        for (let pos of posList) {
            let lMarker = new tt.Marker().setLngLat([pos.lng, pos.lat]).addTo(map);
            lMarker.getElement().addEventListener('click', async function (e) {
                let diff = {
                    "distance_in_meter": "geolocation must be enabled"
                };
                if (jsMarker != null) {
                    // console.log(jsMarker.getLngLat(), lMarker.getLngLat());
                    const payload = {
                        start: jsMarker.getLngLat(),
                        end: lMarker.getLngLat()
                    };
                    let result = await fetch("https://localhost:7777/geo/route_distance",
                        {
                            method: "post",
                            headers: {
                                "Content-Type": "application/json",
                                Accept: "application/json"
                            },
                            body: JSON.stringify(payload)

                        });
                    diff = await result.json();
                    // console.log(diff);
                }
                map.easeTo({ center: lMarker.getLngLat(), zoom: 14, pitch: 45, bearing: 45, duration: 2000 });
                e.stopPropagation();
                var lpopup = new tt.Popup({ className: 'lpopup' })
                    .setHTML(`<div id="home">🏞️${pos.name}</div>` + `<div>Address: ${pos.address}</div>` + `<div>${pos.city}, ${pos.province}</div>` + `<div>Distance: <span class="distance">${diff.distance_in_meter / 1000}(km)  from your location</span></div>`)
                    .addTo(map);

                lMarker.setPopup(lpopup);
            });
            locationMarkers[i] = lMarker;
            let opt = document.createElement("div"); // creates a div
            opt.className = "locations-container";
            opt.innerHTML = `<div>${pos.name}</div>` + `<div>${pos.address}</div>`; // puts a div inside of the opt div (line 44)
            opt.dataset.i = i; // set the order number of options to 'i' which represented the order num of the array order

            opt.addEventListener('click', function (e) {
                let j = this.dataset.i; // setting j = i which is the thing we clicked in the list
                map.easeTo({
                    center: locationMarkers[j].getLngLat(),
                    zoom: 18, pitch: 45, bearing: 45, duration: 2000
                });
            });

            locationsEl.appendChild(opt);

            i++;

        };
        // 
        document.getElementById("map").addEventListener('click', function () {
            map.easeTo({ center: [-75.683692, 45.4028986], zoom: 10, pitch: 10, bearing: 0, duration: 2000 });
        });

    });

    ipLocation().then((location) => {

        jsLocation((pos) => {
            jsMarker = new tt.Marker().setLngLat([pos.longitude, pos.latitude]).addTo(map);
            jsMarker.getElement().addEventListener('click', function (e) {
                map.easeTo({ center: jsMarker.getLngLat(), zoom: 14, pitch: 45, bearing: 45, duration: 2000 });
                e.stopPropagation();
            });
            var popup = new tt.Popup({ className: 'popup' })
                .setHTML('<span id="home">💒</span>')
                .addTo(map);

            jsMarker.setPopup(popup);

        });

    });

};
