import { IControl } from 'mapbox-gl';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';

class DirectionsControl implements IControl {
  private control: MapboxDirections;

  constructor(options: any) {
    this.control = new MapboxDirections(options);
  }

  onAdd(map: mapboxgl.Map): HTMLElement {
    const container = this.control.onAdd(map); 
    // You can optionally customize the container here if needed
    return container;
  }

  onRemove(map: mapboxgl.Map): void {
    this.control.onRemove(map);
  }

  setOrigin(origin: any): void {
    this.control.setOrigin(origin);
  }

  setDestination(destination: any): void {
    this.control.setDestination(destination);
  }
}
