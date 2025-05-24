import React, { useRef, useState } from 'react';
import Map from 'react-map-gl/maplibre';
import type { MapRef } from 'react-map-gl/maplibre';
import { StyleSpecification } from 'maplibre-gl';

const MAP_KEY = import.meta.env.VITE_MAP_KEY;

const MAP_STYLE: StyleSpecification = {
  version: 8,
  sources: {
    'osm-raster-tiles': {
      type: 'raster',
      tiles: [
        `https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}.png?api_key=${MAP_KEY}`,
      ],
      tileSize: 256,
      attribution: '© Stadia Maps © OpenMapTiles © OSM contributors',
    },
    'terrain-source': {
      type: 'raster-dem',
      tiles: [
        `https://tiles.stadiamaps.com/terrain/{z}/{x}/{y}.png?api_key=${MAP_KEY}`
      ],
      tileSize: 256,
      encoding: 'terrarium'
    }
  },
  layers: [
    {
      id: 'osm-layer',
      type: 'raster',
      source: 'osm-raster-tiles',
      minzoom: 0,
      maxzoom: 22
    },
    {
      id: 'hillshade',
      type: 'hillshade',
      source: 'terrain-source',
      layout: { visibility: 'visible' },
      paint: { 'hillshade-exaggeration': 0.5 }
    }
  ],
  terrain: {
    source: 'terrain-source',
    exaggeration: 1.5
  }
};

interface MapPlaceholderProps {
  className?: string;
}

const MapPlaceholder: React.FC<MapPlaceholderProps> = ({ className = '' }) => {
  const mapRef = useRef<MapRef>(null);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={`relative w-full h-full ${className}`}>
      <Map
        ref={mapRef}
        initialViewState={{
          latitude: 50.8503,
          longitude: 4.3517,
          zoom: 5,
          pitch: 45,
          bearing: -10
        }}
        mapStyle={MAP_STYLE}
        terrain={{ source: 'terrain-source', exaggeration: 1.5 }}
        onLoad={() => setIsLoading(false)}
        onError={(e) => {
          console.error('Map error:', e.error);
          setIsLoading(false);
        }}
        interactiveLayerIds={['osm-layer']}
      >
        {/* Loading overlay */}
        {isLoading && (
          <div className="absolute inset-0 bg-gray-900/50 flex items-center justify-center">
            <div className="text-white text-sm">Loading 3D map...</div>
          </div>
        )}

        {/* Zoom Controls */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2 flex flex-col gap-2">
          <button 
            className="w-8 h-8 bg-gray-800 rounded text-white hover:bg-gray-700 transition-colors"
            onClick={() => mapRef.current?.zoomIn()}
            aria-label="Zoom in"
          >
            +
          </button>
          <button 
            className="w-8 h-8 bg-gray-800 rounded text-white hover:bg-gray-700 transition-colors"
            onClick={() => mapRef.current?.zoomOut()}
            aria-label="Zoom out"
          >
            −
          </button>
        </div>

        {/* 3D Tilt Controls */}
        <div className="absolute right-4 top-4 flex flex-col gap-2">
          <button 
            className="w-8 h-8 bg-gray-800 rounded text-white hover:bg-gray-700 transition-colors"
            onClick={() => mapRef.current?.easeTo({ 
              pitch: Math.min(85, (mapRef.current?.getPitch() || 0) + 10)
            })}
            aria-label="Increase tilt"
          >
            ↗
          </button>
          <button 
            className="w-8 h-8 bg-gray-800 rounded text-white hover:bg-gray-700 transition-colors"
            onClick={() => mapRef.current?.easeTo({ 
              pitch: Math.max(0, (mapRef.current?.getPitch() || 0) - 10)
            })}
            aria-label="Decrease tilt"
          >
            ↘
          </button>
        </div>

        {/* Side Labels */}
        <div className="absolute left-0 top-0 bottom-0 w-8 flex flex-col justify-between py-8">
          {['Global', 'Mapping'].map((label) => (
            <div key={label} className="flex flex-col items-center">
              <span className="text-white text-xs transform -rotate-90 whitespace-nowrap">
                {label}
              </span>
            </div>
          ))}
        </div>
        
        <div className="absolute right-0 top-0 bottom-0 w-8 flex flex-col justify-between py-8">
          {['Evaluation'].map((label) => (
            <div key={label} className="flex flex-col items-center">
              <span className="text-white text-xs transform -rotate-90 whitespace-nowrap">
                {label}
              </span>
            </div>
          ))}
        </div>
      </Map>
    </div>
  );
};

export default MapPlaceholder;