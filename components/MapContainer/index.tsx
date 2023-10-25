import mapboxgl, { type Map } from 'mapbox-gl';
import React, { type Dispatch, type SetStateAction, useEffect, useRef, useState } from 'react';
import { type LocationBase } from '@/types/search';
import { gettingZoomLevel } from '@/utils/common';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const turf = require('@turf/turf');
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || '';

interface MapContainerProps {
  points: number[][];
  locations: LocationBase[];
  setIsLoading: Dispatch<SetStateAction<any>>;
}

function makeRadius(coordinate: number[], radiusInMeters: number) {
  const point = turf.point(coordinate);
  const buffered = turf.buffer(point, radiusInMeters, { units: 'miles' });
  return buffered;
}

const removeSource = (map: any, point: number[], id: string) => {
  if (map.getSource(`points-${id}`)) {
    map.removeLayer(`point-layer-${id}`);
    map.removeLayer(`text-layer-${id}`);
    map.removeSource(`points-${id}`);
  }
  if (map.getSource(`search-radius-${id}`)) {
    map.removeLayer(`search-radius-${id}`);
    map.removeSource(`search-radius-${id}`);
  }
  if (map.getSource(`route`)) {
    map.removeLayer(`route`);
    map.removeSource(`route`);
  }
};

const initSource = (map: any, point: number[], id: string, title: string, radius: number = 0) => {
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
  if (map.getSource(`search-radius-${id}`)) {
    map.removeLayer(`search-radius-${id}`);
    map.removeSource(`search-radius-${id}`);
  }
  map.addSource(`points-${id}`, sourceData);

  let circleRadius = 5;
  const strokeWidth = 1;
  if (title) {
    map.addLayer({
      id: `search-radius-${id}`,
      source: {
        type: 'geojson',
        data: { type: 'FeatureCollection', features: [] },
      },
      type: 'fill',
      paint: {
        'fill-color': '#F16521',
        'fill-opacity': 0.2,
        'fill-outline-color': '#F16521',
      },
    });
    if (radius) {
      const searchRadius = makeRadius(point, radius);
      map.getSource(`search-radius-${id}`).setData(searchRadius);
    }
    circleRadius = 14;
  }
  map.addLayer({
    id: `point-layer-${id}`,
    type: 'circle',
    source: `points-${id}`,
    paint: {
      'circle-radius': circleRadius,
      // 'circle-color': '#F16521',
      'circle-color': 'blue',
      'circle-stroke-color': 'white',
      'circle-stroke-width': strokeWidth,
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
};

const MapContainer = ({ points, locations, setIsLoading }: MapContainerProps) => {
  const mapContainer = useRef() as React.MutableRefObject<HTMLInputElement>;
  const map = useRef<Map | null>(null);
  const [lng, setLng] = useState(locations[0]?.coordinate?.longitude || -87.9014469);
  const [lat, setLat] = useState(locations[0]?.coordinate?.latitude || 42.1175031);
  const [zoom, setZoom] = useState(5);
  async function getRoute(map: any, start: number[], end: number[], points: number[][]) {
    setIsLoading(true);
    let url = `https://api.mapbox.com/directions/v5/mapbox/driving-traffic/${start[0]},${start[1]}`;
    points.forEach((point) => {
      url += `;${point[0]},${point[1]}`;
    });
    url += `;${end[0]},${end[1]}`;
    const query = await fetch(
      `${url}?waypoints_per_route=true&alternatives=true&steps=true&annotations=duration&overview=full&geometries=geojson&access_token=${mapboxgl.accessToken}`,
      {
        method: 'GET',
      },
    );
    const json = await query.json();
    if (json.routes.length === 0) {
      // No route found
      return;
    }

    let data = json.routes[0];
    for (const route of json.routes) {
      if (route.distance < data.distance) {
        data = route;
      }
    }
    setIsLoading(false);

    const zoomLevel = gettingZoomLevel(data.distance);
    setZoom(zoomLevel);
    map.flyTo({
      zoom: zoomLevel - 3,
      essential: true,
    });

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
    const [startLocation, endLocation] = locations;
    const start = [startLocation?.coordinate?.longitude || 0, startLocation?.coordinate?.latitude || 0];
    const end = [endLocation?.coordinate?.longitude || 0, endLocation?.coordinate?.latitude || 0];

    if (points.length > 23) {
      points = points.slice(0, 23);
    }
    if (startLocation?.coordinate) {
      initSource(map.current, start, 'start', 'A', startLocation.radius);
      map.current?.flyTo({
        center: [start[0], start[1]],
        essential: true, // this animation is considered essential with respect to prefers-reduced-motion
      });
    } else {
      removeSource(map.current, start, 'start');
    }
    if (endLocation?.coordinate) {
      map.current?.flyTo({
        center: [end[0], end[1]],
        essential: true,
      });
      initSource(map.current, end, 'end', 'B', endLocation.radius);
    }
    if (startLocation?.coordinate && endLocation?.coordinate) {
      points.forEach((point, index) => {
        if (point.length > 0) {
          initSource(map.current, point, `${index}`, '', 0);
        }
      });
      getRoute(map.current, start, end, points).then(() => {});
    }
  }, [points, locations]);

  return (
    <div className="h-[calc(100vh_-_15rem)] h-full">
      <div ref={mapContainer} className="h-full w-[100%] rounded-xl" />
    </div>
  );
};
export default MapContainer;
