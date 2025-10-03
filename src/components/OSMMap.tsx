import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import 'leaflet-draw';
import { Card } from '@/components/ui/card';

// Fix for default markers
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface OSMMapProps {
  center?: [number, number];
  zoom?: number;
  height?: string;
  onAreaSelected?: (area: number, bounds: any) => void;
}

const OSMMap = ({ 
  center = [40.730610, -73.935242], // NYC default
  zoom = 13,
  height = "600px",
  onAreaSelected
}: OSMMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map | null>(null);
  const drawnItems = useRef<L.FeatureGroup>(new L.FeatureGroup());
  const [selectedArea, setSelectedArea] = useState<number>(0);

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    // Initialize map
    map.current = L.map(mapContainer.current).setView(center, zoom);

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map.current);

    // Add drawing controls
    map.current.addLayer(drawnItems.current);

    const drawControl = new L.Control.Draw({
      position: 'topright',
      draw: {
        polygon: {
          allowIntersection: false,
          showArea: true,
          metric: true,
        },
        rectangle: {
          showArea: true,
          metric: true,
        },
        circle: false,
        circlemarker: false,
        marker: false,
        polyline: false,
      },
      edit: {
        featureGroup: drawnItems.current,
        remove: true,
      },
    });

    map.current.addControl(drawControl);

    // Handle drawing events
    map.current.on(L.Draw.Event.CREATED, (event: any) => {
      const layer = event.layer;
      drawnItems.current.addLayer(layer);

      // Calculate area in square meters
      let area = 0;
      if (layer instanceof L.Polygon || layer instanceof L.Rectangle) {
        const latlngs = layer.getLatLngs()[0] as L.LatLng[];
        area = L.GeometryUtil.geodesicArea(latlngs);
      }

      setSelectedArea(area);
      if (onAreaSelected) {
        onAreaSelected(area, layer.getBounds());
      }

      // Add color overlay based on potential (simplified for demo)
      const potential = calculatePotential(area);
      const color = potential > 70 ? '#22c55e' : potential > 40 ? '#eab308' : '#ef4444';
      layer.setStyle({ fillColor: color, fillOpacity: 0.4 });
    });

    map.current.on(L.Draw.Event.DELETED, () => {
      setSelectedArea(0);
      if (onAreaSelected) {
        onAreaSelected(0, null);
      }
    });

    return () => {
      map.current?.remove();
    };
  }, [center, zoom, onAreaSelected]);

  // Simple potential calculation for demo
  const calculatePotential = (area: number): number => {
    // This is a simplified calculation
    // In real implementation, this would use solar irradiance data
    const usableArea = area * 0.7; // 70% usability factor
    const pvDensity = 0.18; // kWp/m²
    const capacity = usableArea * pvDensity;
    return Math.min((capacity / 100) * 100, 100); // Normalize to 0-100
  };

  return (
    <Card className="overflow-hidden">
      <div 
        ref={mapContainer} 
        style={{ height }}
        className="w-full"
      />
      <div className="p-4 bg-muted/30 border-t">
        <p className="text-sm text-muted-foreground">
          <strong>Instructions:</strong> Use the drawing tools on the right to select an area. 
          The map will automatically color-code the potential: 
          <span className="text-success font-medium"> Green (High)</span>, 
          <span className="text-warning font-medium"> Yellow (Medium)</span>, 
          <span className="text-danger font-medium"> Red (Low)</span>
        </p>
        {selectedArea > 0 && (
          <p className="text-sm text-primary font-medium mt-2">
            Selected area: {(selectedArea).toFixed(2)} m²
          </p>
        )}
      </div>
    </Card>
  );
};

export default OSMMap;
