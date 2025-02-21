import axios from 'axios';

export interface IDevice {
  id: string;
  name: string;
  type: 'lamp' | 'fan' | 'sensor';
  isOn?: boolean;   // on/off for lamps / fans
  value?: number;  // temperature / fan speed / other
  room?: string;   // Living Room, Kitchen, Bedroom Bathroom, etc.
}

/** Fetching all devices from backend */
export async function fetchDevices(): Promise<IDevice[]> {
    try {
      const response = await axios.get('/api/devices');
      return response.data;
    } catch (error: any) {
      console.error('Error fetching devices:', error);
      throw new Error(error?.message || 'Failed to fetch devices from the server.');
    }
  }

/** Toggling device's on/off state (lamp / fan) */
export async function toggleDevice(deviceId: string, newState: boolean): Promise<void> {
  try {
    await axios.post(`/api/devices/${deviceId}/toggle`, { state: newState });
  } catch (error: any) {
    console.error('Error toggling device:', error);
    throw new Error(`Failed to toggle device with ID: ${deviceId}).`);
  }
}

/** Setting fan speed */
export async function setFanSpeed(deviceId: string, speed: number): Promise<void> {
  try {
    await axios.post(`/api/devices/${deviceId}/fan-speed`, { speed });
  } catch (error) {
    console.error('Error setting fan speed:', error);
    throw new Error(`Failed to set fan speed (ID: ${deviceId}).`);
  }
}
