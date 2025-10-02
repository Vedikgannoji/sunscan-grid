import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Card } from '@/components/ui/card';

interface MapComponentProps {
  center?: [number, number];
  zoom?: number;
  height?: string;
}

const MapComponent = ({ 
  center = [-73.935242, 40.730610], // NYC default
  zoom = 12,
  height = "600px"
}: MapComponentProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    // Note: User needs to add their Mapbox token
    mapboxgl.accessToken = 'YOUR_MAPBOX_TOKEN_HERE';
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: center,
      zoom: zoom,
    });

    // Add navigation controls
    map.current.addControl(
      new mapboxgl.NavigationControl({
        visualizePitch: true,
      }),
      'top-right'
    );

    // Add sample heatmap data when map loads
    map.current.on('load', () => {
      if (!map.current) return;
      
      // Add sample source and layer
      map.current.addSource('sample-data', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: []
        }
      });
    });

    return () => {
      map.current?.remove();
    };
  }, [center, zoom]);

  return (
    <Card className="overflow-hidden">
      <div 
        ref={mapContainer} 
        style={{ height }}
        className="w-full"
      />
      <div className="p-4 bg-muted/30">
        <p className="text-sm text-muted-foreground">
          <strong>Note:</strong> Add your Mapbox token in MapComponent.tsx to enable interactive maps
        </p>
      </div>
    </Card>
  );
};

export default MapComponent;