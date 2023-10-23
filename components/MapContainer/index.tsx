import mapboxgl, { type Map } from 'mapbox-gl';
import React, { useEffect, useRef, useState } from 'react';
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || '';

interface MapContainerProps {
  start: number[];
  end: number[];
}

async function getRoute(map: any, start: number[], end: number[]) {
  const query = await fetch(
    `https://api.mapbox.com/directions/v5/mapbox/cycling/${start[0]},${start[1]};${end[0]},${end[1]}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`,
    { method: 'GET' },
  );
  const json = await query.json();
  const data = json.routes[0];
  const route = data.geometry.coordinates;
  const geojson = {
    type: 'Feature',
    properties: {},
    geometry: {
      type: 'LineString',
      coordinates: route,
    },
  };
  // if the route already exists on the map, we'll reset it using setData
  if (map.getSource('route')) {
    map.getSource('route').setData(geojson);
  }
  // otherwise, we'll make a new request
  else {
    map.addLayer({
      id: 'route',
      type: 'line',
      source: {
        type: 'geojson',
        data: geojson,
      },
      layout: {
        'line-join': 'round',
        'line-cap': 'round',
      },
      paint: {
        'line-color': '#F16521',
        'line-width': 5,
        'line-opacity': 0.75,
      },
    });
  }
}

const initSource = (map: any, point: number[], id: string, title: string) => {
  const sourceData = {
    type: 'geojson',
    data: {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          properties: {
            title,
          },
          geometry: {
            type: 'Point',
            coordinates: point,
          },
        },
      ],
    },
  };
  if (map.getSource(`points-${id}`)) {
    map.removeLayer(`point-layer-${id}`);
    map.removeLayer(`text-layer-${id}`);
    map.removeSource(`points-${id}`);
  }
  map.addSource(`points-${id}`, sourceData);
  map.addLayer({
    id: `point-layer-${id}`,
    type: 'circle',
    source: `points-${id}`,
    paint: {
      'circle-radius': 14,
      'circle-color': '#F16521',
      'circle-stroke-color': 'white',
      'circle-stroke-width': 2,
    },
  });
  map.addLayer({
    id: `text-layer-${id}`,
    type: 'symbol',
    source: `points-${id}`,
    layout: {
      'text-field': ['get', 'title'],
      'text-size': 16,
      'text-max-width': 20,
    },
    paint: {
      'text-halo-width': 1,
      'text-color': 'white',
    },
  });

  // Add starting point to the map
  // map.addLayer({
  //   id,
  //   type: 'symbol',
  //   source: {
  //     type: 'geojson',
  //     data: {
  //       type: 'FeatureCollection',
  //       features: [
  //         {
  //           type: 'Feature',
  //           properties: {
  //             museum_count: 'A',
  //           },
  //           geometry: {
  //             type: 'Point',
  //             coordinates: point,
  //           },
  //         },
  //       ],
  //     },
  //   },
  //   layout: {
  //     'text-field': '{museum_count}',
  //     'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
  //     'text-size': 20,
  //   },
  //   paint: {
  //     // 'circle-radius': 10,
  //     // 'circle-color': '#F16521',
  //     'text-halo-width': 1,
  //     'text-halo-color': 'white',
  //   },
  // });
};

const MapContainer = ({ start, end }: MapContainerProps) => {
  const mapContainer = useRef() as React.MutableRefObject<HTMLInputElement>;
  const map = useRef<Map | null>(null);
  const [lng, setLng] = useState(start[0] || -87.9014469);
  const [lat, setLat] = useState(start[1] || 42.1175031);
  const [zoom, setZoom] = useState(5);
  useEffect(() => {
    if (map.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [lng, lat],
      zoom,
    });

    if (map.current) {
      map.current?.on('move', () => {
        setLng(map.current?.getCenter().lng.toFixed(4) as unknown as number);
        setLat(map.current?.getCenter().lat.toFixed(4) as unknown as number);
        setZoom(map.current?.getZoom().toFixed(2) as unknown as number);
      });
    }
  }, [lat, lng, zoom]);
  useEffect(() => {
    if (start.length > 0) {
      initSource(map.current, start, 'start', 'A');
      map.current?.flyTo({
        center: [start[0], start[1]],
        essential: true, // this animation is considered essential with respect to prefers-reduced-motion
      });
    }
    if (end.length > 0) {
      map.current?.flyTo({
        center: [end[0], end[1]],
        essential: true,
      });
      initSource(map.current, end, 'end', 'B');
    }
    if (start.length > 0 && end.length > 0) {
      getRoute(map.current, start, end).then(() => {});
    }
  }, [end, start]);

  return (
    <div className="h-full">
      {/* <div className="sidebar"> */}
      {/*   Longitude: {lng} | Latitude: {lat} | Zoom: {zoom} */}
      {/* </div> */}
      <div ref={mapContainer} className="h-full" />
    </div>
  );
};
export default MapContainer;
