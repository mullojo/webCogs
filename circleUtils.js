export function drawCircle(map, lng, lat, radius) {
  const circle = createGeoJSONCircle([lng, lat], radius);

  if (map.getSource("circle")) {
    map.getSource("circle").setData(circle);
  } else {
    map.addSource("circle", {
      type: "geojson",
      data: circle
    });

    map.addLayer({
      id: "circle",
      type: "fill",
      source: "circle",
      paint: {
        "fill-color": "#3FB1CE",
        "fill-opacity": 0.3
      }
    });
  }
}

function createGeoJSONCircle(center, radiusInMeters, points = 64) {
  const coords = {
    latitude: center[1],
    longitude: center[0]
  };

  const km = radiusInMeters / 1000;

  const ret = [];
  const distanceX = km / (111.32 * Math.cos((coords.latitude * Math.PI) / 180));
  const distanceY = km / 110.574;

  for (let i = 0; i < points; i++) {
    const theta = (i / points) * (2 * Math.PI);
    const x = distanceX * Math.cos(theta);
    const y = distanceY * Math.sin(theta);

    ret.push([coords.longitude + x, coords.latitude + y]);
  }
  ret.push(ret[0]);

  return {
    type: "Feature",
    geometry: {
      type: "Polygon",
      coordinates: [ret]
    }
  };
}
