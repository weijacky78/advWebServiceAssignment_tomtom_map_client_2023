import tt from "@tomtom-international/web-sdk-maps";
import ipLocation from "./ipLocation";
import jsLocation from "./jsLocation";
import ottawaLocation from "./ottawaLocation";
import map1Style from "./map1";

export default function () {
    //map stuff
    let locationMarkers = [];

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
        document.getElementById("map").addEventListener('click', function () {
            map.easeTo({ center: [-75.683692, 45.4028986], zoom: 10, pitch: 10, bearing: 0, duration: 2000 });
        });

    });

    ipLocation().then((location) => {

        jsLocation((pos) => {
            let jsMarker = new tt.Marker().setLngLat([pos.longitude, pos.latitude]).addTo(map);
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