/* eslint-disable react-hooks/immutability */
import * as maptilersdk from '@maptiler/sdk';
import React, { useEffect, useRef, useState } from 'react';
import '@maptiler/sdk/dist/maptiler-sdk.css';

const Map = ({ locationHandler }) => {
  const [coordinates, setCoordinates] = useState([0, 0]);
  const mapContainer = useRef(null);
  const map = useRef(null);

  maptilersdk.config.apiKey = process.env.NEXT_PUBLIC_MAP_TILER_KEY;

  useEffect(() => {
    if (map.current) {
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { longitude, latitude } = position.coords;
        setCoordinates([longitude, latitude]);
        map.current = new maptilersdk.Map({
          container: mapContainer.current,
          style: 'base-v4',
          center: [longitude, latitude],
          zoom: 14
        });

        new maptilersdk.Marker().setLngLat([longitude, latitude]).addTo(map.current);
      },
      () => {
        map.current = new maptilersdk.Map({
          container: mapContainer.current,
          style: maptilersdk.MapStyle.BACKDROP.DARK,
          center: [139.753, 35.6844], // Tokyo
          zoom: 14
        });
      }
    );
  }, []);

  return (
    <div className="w-full">
      <button className="btn-outlined mb-3" onClick={() => locationHandler(coordinates)}>
        Use current location
      </button>
      <div ref={mapContainer} className="map w-full h-80" />
    </div>
  );
};

export default Map;
