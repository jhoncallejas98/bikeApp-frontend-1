export interface Bike {
  _id: string;
  serial: string;
  status: 'disponible' | 'en uso' | 'en mantenimiento';
  capacity: number;
  availableBikes: number;
  stationId: string;
} 