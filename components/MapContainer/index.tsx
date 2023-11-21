import mapboxgl, { type Map } from 'mapbox-gl';
import React, { type Dispatch, type SetStateAction, useEffect, useRef, useState } from 'react';
import { type LocationBase } from '@/types/search';
import { gettingZoomLevel } from '@/utils/common';
import { type LoadPoint } from '@/types/load';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const turf = require('@turf/turf');
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || '';

interface MapContainerProps {
  points: LoadPoint[];
  locations: LocationBase[];
  setIsLoading: Dispatch<SetStateAction<any>>;
}

function makeRadius(coordinate: number[], radiusInMeters: number) {
  const point = turf.point(coordinate);
  const buffered = turf.buffer(point, radiusInMeters, { units: 'miles' });
  return buffered;
}

const MapContainer = ({ points, locations, setIsLoading }: MapContainerProps) => {
  const mapContainer = useRef() as React.MutableRefObject<HTMLInputElement>;
  const map = useRef<Map | null>(null);
  const [lng, setLng] = useState(locations[0]?.coordinate?.longitude || -87.9014469);
  const [lat, setLat] = useState(locations[0]?.coordinate?.latitude || 42.1175031);
  const [zoom, setZoom] = useState(5);
  const [layers, setLayers] = useState<string[]>([]);
  const [sources, setSources] = useState<string[]>([]);

  async function getGeoJson(start: number[], end: number[], points: number[][]) {
    let url = `https://api.mapbox.com/directions/v5/mapbox/driving/${start[0]},${start[1]}`;
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
    setIsLoading(false);
    const json = await query.json();
    if (!json?.routes || json.routes.length === 0) {
      return null;
    }

    let data = json.routes[0];
    const otherRoutes = [];
    for (const route of json.routes) {
      if (route.distance < data.distance) {
        data = route;
      }
    }
    for (const route of json.routes) {
      if (JSON.stringify(data) !== JSON.stringify(route)) {
        otherRoutes.push(route);
      }
    }
    return { primaryRoute: data, otherRoutes };
  }

  const removeSource = (map: any) => {
    layers.forEach((layer) => {
      if (map.getLayer(layer)) {
        map.removeLayer(layer);
      }
    });
    sources.forEach((source) => {
      if (map.getSource(source)) {
        map.removeSource(source);
      }
    });
  };

  async function getRoute(map: any, start: number[], end: number[], points: number[][]) {
    setIsLoading(true);

    const routeData = await getGeoJson(start, end, points);
    const { primaryRoute: data, otherRoutes } = routeData ?? { primaryRoute: null, otherRoutes: [] };

    if (!data) {
      // No route found
      return null;
    }

    const zoomLevel = gettingZoomLevel(data.distance);
    setZoom(zoomLevel);
    map.flyTo({
      zoom: zoomLevel - 3,
      essential: true,
    });
    otherRoutes.forEach((tempRoute, index: number) => {
      const dataRoute = tempRoute.geometry.coordinates;
      drawRoute(map, dataRoute, false, index + 1);
    });
    const route = data.geometry.coordinates;
    drawRoute(map, route, true);
  }

  const drawRoute = (map: any, route: any, isPrimary: boolean = false, indexRoute: number = 0) => {
    const geojson = {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'LineString',
        coordinates: route,
      },
    };
    // if the route already exists on the map, we'll reset it using setData
    if (map.getSource(`route${indexRoute}`)) {
      map.getSource(`route${indexRoute}`).setData(geojson);
    }
    // otherwise, we'll make a new request
    else {
      map.addLayer({
        id: `route${indexRoute}`,
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
          'line-color': isPrimary ? '#F16521' : '#2E2F44',
          'line-width': 5,
          'line-opacity': isPrimary ? 0.75 : 0.5,
        },
      });
      setSources((prev) => [...prev, `route${indexRoute}`]);
      setLayers((prev) => [...prev, `route${indexRoute}`]);
    }
  };
  const initSource = (map: any, initPoints: number[][], id: string, title: string, radius: number = 0) => {
    const newLayers: string[] = [];
    const newSources: string[] = [];
    const features: any[] = [];
    initPoints.forEach((point) => {
      const obj = {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: point,
        },
        properties: title ? { title } : {},
      };

      features.push(obj);
    });
    const sourceData = {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features,
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
    map?.addSource(`points-${id}`, sourceData);
    newSources.push(`points-${id}`);
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
        const searchRadius = makeRadius(initPoints[0], radius);
        map.getSource(`search-radius-${id}`).setData(searchRadius);
      }
      circleRadius = 14;
      newSources.push(`search-radius-${id}`);
      newLayers.push(`search-radius-${id}`);
    }
    map.addLayer({
      id: `point-layer-${id}`,
      type: 'circle',
      source: `points-${id}`,
      paint: {
        'circle-radius': circleRadius,
        'circle-color': '#F16521',
        'circle-stroke-color': 'white',
        'circle-stroke-width': strokeWidth,
      },
      filter: ['==', '$type', 'Point'],
    });
    newLayers.push(`point-layer-${id}`);

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
      filter: ['==', '$type', 'Point'],
    });
    newLayers.push(`text-layer-${id}`);
    setLayers((layers) => [...layers, ...newLayers]);
    setSources((sources) => [...sources, ...newSources]);
  };

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
    map.current?.on('render', function () {
      map.current?.resize();
    });
  }, [lat, lng, zoom]);

  useEffect(() => {
    setIsLoading(true);
    const reDrawMap = async () => {
      const startLocation = locations[0];
      const endLocation = locations[locations.length - 1];
      removeSource(map.current);
      locations.forEach((location, index) => {
        if (location.coordinate) {
          const point = [[location.coordinate.longitude, location.coordinate.latitude]];
          initSource(map.current, point, `${index}`, location.title, location.radius);
        }
      });
      if (locations[locations.length - 1]?.coordinate?.longitude) {
        map.current?.setCenter([
          locations[locations.length - 1]?.coordinate?.longitude || 0,
          locations[locations.length - 1]?.coordinate?.latitude || 0,
        ]);
      }
      if (points?.length > 23) {
        points = points?.slice(0, 5);
      }

      if (startLocation?.coordinate && endLocation?.coordinate) {
        const start = [startLocation?.coordinate?.longitude || 0, startLocation?.coordinate?.latitude || 0];
        const end = [endLocation?.coordinate?.longitude || 0, endLocation?.coordinate?.latitude || 0];
        const initPoints: number[][] = [];
        const subPoints: number[][] = [];
        if (locations.length > 1) {
          for (let i = 1; i < locations.length; i++) {
            const location = locations[i];
            const previousPoint = locations[i - 1];
            const keyPoints = `${previousPoint.coordinate?.latitude}_${previousPoint.coordinate?.longitude}_${location.coordinate?.latitude}_${location.coordinate?.longitude}`;
            points?.forEach((point: LoadPoint) => {
              if (point.keyPoints === keyPoints) {
                initPoints.push(point.fromPoint);
                initPoints.push(point.toPoint);
                subPoints.push(point.fromPoint);
                subPoints.push(point.toPoint);
              }
            });
            if (i !== locations.length - 1) {
              initPoints.push([location?.coordinate?.longitude || 0, location?.coordinate?.latitude || 0]);
            }
          }
        }
        initSource(map.current, subPoints, '', '', 0);
        await getRoute(map.current, start, end, initPoints).then(() => {});
      }
    };
    reDrawMap().then(() => {
      setIsLoading(false);
    });
  }, [points, locations]);

  return (
    <div className="xl-pr-5 container fixed h-[calc(100vh_-_10rem)] w-full max-w-[58vw] pr-3">
      <div ref={mapContainer} className="h-full rounded-xl" />
    </div>
  );
};
export default MapContainer;
