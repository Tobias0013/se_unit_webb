/* Author(s): Securella */
import { AxiosResponse } from 'axios';

export interface ISensor {
  sensor_id: string;
  sensor_name: string;
  location:   string;
  value:      number;
  unit:       string;
}

/** 
 * Fetches list of sensors from backend.
 * Returns what frontend needs.
 */
export function fetchSensors(): Promise<ISensor[]>;
