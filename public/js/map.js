console.log("Listing:", listing);
console.log("Coordinates:", listing.geometry?.coordinates);
    mapboxgl.accessToken = mapToken;
    
    // console.log("Coordinates:", coordinates);
    // console.log("Is array:", Array.isArray(coordinates));
    // console.log("Number of coordinates:", coordinates?.length);

    const map = new mapboxgl.Map({
        container: 'map', // container ID
        style: 'mapbox://styles/mapbox/streets-v12',
        center: listing.geometry.coordinates, // starting position [lng, lat]. Note that lat must be set between -90 and 90
        zoom: 9 // starting zoom
    });

    const marker = new mapboxgl.Marker({ color: 'red' })
        .setLngLat(listing.geometry.coordinates)
        .setPopup(new mapboxgl.Popup({offset: 25})
        .setHTML(`<h4>${listing.title}</h4><p>Exact location after booking</p>`))
        .addTo(map);