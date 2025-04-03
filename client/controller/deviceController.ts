import axios from 'axios';

import { API_URL } from './config'; // adjust the path if needed

const API_BASE = API_URL;

/** Interface describing the device object */
export interface IDevice {
  id: string;
  name: string;
  type: 'lamp' | 'fan' | 'sensor';
  status?: boolean; // on/off status
  value?: number;   // fan speed / temperature etc.
  room?: string;    // Living Room, Kitchen, etc.
}

// Utility function to always get a fresh token from sessionStorage
const getAuthHeaders = () => {
  const token = sessionStorage.getItem('token');
  if (!token) {
    console.warn("No token found in sessionStorage, requests will be rejected by backend");
  }
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined,
      'Content-Type': 'application/json',
    },
  };
};

/** 
 * GET /devices. Fetching all devices from backend 
 * Requires valid Bearer token.
 */
export async function fetchDevices(): Promise<IDevice[]> {
  console.log("Calling /devices with token:", sessionStorage.getItem("token"));
  try {
    const response = await axios.get(`${API_BASE}/devices`, getAuthHeaders());
    return response.data;
  } catch (error: any) {
    console.error('Error fetching devices:', error);
    throw new Error(error?.message || 'Failed to fetch devices from the server.');
  }
}

/** 
 * POST /devices/{device_id}/toggle. 
 * Toggling device's on/off state (lamp / fan)
 */
export async function toggleDevice(deviceId: string, newState: boolean): Promise<void> {
  try {
    const status = newState ? "on" : "off";
    await axios.post(`${API_BASE}/devices/${deviceId}/toggle`, { status }, getAuthHeaders());
  } catch (error: any) {
    console.error("Error toggling device:", error);
    throw new Error(
      error?.message || `Failed to toggle device with ID ${deviceId}.`
    );
  }
}

/** 
 * PUT /devices/{device_id}. 
 * Setting fan speed 
 */
export async function updateFanSpeed(deviceId: string, speed: number): Promise<void> {
  try {
    await axios.put(`${API_BASE}/devices/${deviceId}`, { value: speed }, getAuthHeaders());
  } catch (error: any) {
    console.error("Error updating fan speed:", error);
    throw new Error(
      error?.message ||
      `Failed to update fan speed for device with ID ${deviceId}.`
    );
  }
}
