import { Bike } from './bike.model';
import { Station } from './station.model';

export interface Book {
  _id: string;
  user: string;
  bike: Bike | string;
  stationSalida: Station | string;
  fechaInicio: string; // ISO date
  horaInicio: string;  // 'HH:mm'
  horaFin?: string;    // 'HH:mm'
  activo: boolean;
  fechaFin?: string;   // ISO date
} 