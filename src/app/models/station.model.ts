import { Bike } from './bike.model';
export interface Station {
  _id: string;
  name: string;
  location: string;
  capacity: number;
  bikes: Bike[];
} 