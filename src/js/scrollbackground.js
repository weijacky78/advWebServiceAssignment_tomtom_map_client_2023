const bgs = [
    { startY: 0, endY: 699, filename: "infobackground.jpg" },
    { startY: 700, endY: 1200, filename: "infobackgroundthree.jpg" }];

let bgEl;

export default () => {
    bgEl = document.getElementById("info-master-container");
    bgEl.style.backgroundRepeat = "no-repeat";
    bgEl.style.transition = "background-image 0.5s ease-out";
    bgEl.style.backgroundSize = "cover";
    bgEl.style.backgroundPosition = "center";

    const imageUrls = bgs.map(bgp => "/img/" + bgp.filename);
    preloadImages(imageUrls);

    window.addEventListener("scroll", (ev) => {

        for (const bgp of bgs) {

            if (window.scrollY >= bgp.startY && window.scrollY <= bgp.endY) {
                bgEl.style.backgroundImage = "url('/img/" + bgp.filename + "')";
            }
        }
    });
    return "";
}

function preloadImages(imageUrls) {
    imageUrls.forEach(imageUrl => {
        const img = new Image();
        img.src = imageUrl;
    });
}