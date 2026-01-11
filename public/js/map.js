OlaMapsSDK.apiKey = mapApiKey;

const olaMaps = new OlaMapsSDK.OlaMaps({
  apiKey: mapApiKey,
});

const myMap = olaMaps
  .init({
    style:
      "https://api.olamaps.io/tiles/vector/v1/styles/default-light-standard/style.json",
    container: "map",
    center: listingCoordinates,
    zoom: 15,
  })
  .then((myMap) => {
    // Custom Marker Element
    const el = document.createElement("div");
    el.className = "custom-marker";
    el.innerHTML = '<i class="fa-solid fa-house"></i>';
    // map Popup
    const popup = olaMaps.addPopup({ offset: 25, closeOnClick: false })
      .setHTML(`
        <div class="p-2">
           <h6 style="margin-bottom:5px; font-weight:bold;">${listingTitle}</h6>
           <p style="margin:0; font-size: 12px;">Exact location provided after booking</p>
        </div>
      `);
    // map Marker
    olaMaps
      .addMarker({
        element: el,
        offset: [0, -10],
        anchor: "bottom",
      })
      .setLngLat(listingCoordinates)
      .setPopup(popup)
      .addTo(myMap);
  })
  .catch((error) => {
    console.error(" Error initializing map:", error);
  });
