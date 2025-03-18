import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:1234';
axios.defaults.headers.common['Authorization'] = `Bearer ${sessionStorage.getItem('token')}`;

export interface IDevice {
  id: string;
  name: string;
  type: 'lamp' | 'fan' | 'sensor';
  // Using "status" to indicate on/off instead of isOn:
  status?: boolean;
  // For sensor data (temperature) or fan speed:
  value?: number;  // temperature / fan speed / other
  room?: string;   // Living Room, Kitchen, Bedroom Bathroom, etc.
}

/** GET /devices. Fetching all devices from backend */
export async function fetchDevices(): Promise<IDevice[]> {
    try {
      const response = await axios.get('/devices');
      return response.data;
    } catch (error: any) {
      console.error('Error fetching devices:', error);
      throw new Error(error?.message || 'Failed to fetch devices from the server.');
    }
  }

/** POST /devices/{device_id}/toggle. Toggling device's on/off state (lamp / fan) */
export async function toggleDevice(
    deviceId: string,
    newState: boolean
): Promise<void> {
    try {
      const status = newState ? "on" : "off";
      await axios.post(`/devices/${deviceId}/toggle`, { status });
    } catch (error: any) {
      console.error("Error toggling device:", error);
      throw new Error(
        error?.message || `Failed to toggle device with ID ${deviceId}.`
      );
    }
}

/** PUT /devices/{device_id}. Setting fan speed */
export async function updateFanSpeed(
    deviceId: string,
    speed: number
): Promise<void> {
    try {
      await axios.put(`/devices/${deviceId}`, { value: speed });
    } catch (error: any) {
      console.error("Error updating fan speed:", error);
      throw new Error(
        error?.message ||
          `Failed to update fan speed for device with ID ${deviceId}.`
      );
    }
}
