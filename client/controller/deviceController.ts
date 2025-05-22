import API from './API/connection';

// import { API_URL } from './config'; // <-- NOT NEEDED
// const API_BASE = API_URL;          // <-- COMMENTED OUT TO CHANGE TO CENTRALIZED API

/** Interface describing the device object */
export interface IDevice {
  id: string;
  name: string;
  // expanded to support buzzer, coffee machine, media player
  type: 'light' | 'fan' | 'sensor' | 'buzzer' | 'coffee_machine' | 'mediaplayer';
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
 * GET /devices - Fetching all devices from backend 
 */
export async function fetchDevices(): Promise<IDevice[]> {
  console.log("Calling /devices with token:", sessionStorage.getItem("token"));
  try {
    // const response = await axios.get(`${API_BASE}/devices`, getAuthHeaders()); <-- OLD
    const response = await API.get('/devices', getAuthHeaders());
    return response.data;
  } catch (error: any) {
    console.error('Error fetching devices:', error);
    throw new Error(
      error.response?.data?.message ||
      error?.message ||
      'Failed to fetch devices from the server.'
    );
  }
}

/** 
 * PATCH /devices/{device_id}/toggle - Toggle or send command to any device
 */
export async function toggleDevice(
  deviceId: string,
  // boolean = on/off, string = custom command (e.g. nextTrack)
  newState: boolean | string
): Promise<void> {
  // map booleans → "on"/"off", pass strings through
  const status = typeof newState === 'boolean'
    ? (newState ? 'on' : 'off')
    : newState;

  try {
    // await axios.patch(`${API_BASE}/devices/${deviceId}/toggle`, { status }, getAuthHeaders()); <-- OLD
    await API.patch(`/devices/${deviceId}/toggle`, { status }, getAuthHeaders());
  } catch (error: any) {
    console.error("Error sending command to device:", error);
    throw new Error(
      error.response?.data?.message ||
      error?.message ||
      `Failed to send "${status}" to device ${deviceId}.`
    );
  }
}

/** 
 * PUT /devices/{device_id} - Update fan speed 
 * (dummy: frontend only, no backend call)
 */
export async function updateFanSpeed(
  deviceId: string,
  speed: number
): Promise<void> {
  // await axios.put(`${API_BASE}/devices/${deviceId}`, { value: speed }, getAuthHeaders()); <-- OLD
  // await API.put(`/devices/${deviceId}`, { value: speed }, getAuthHeaders()); <-- commented out on purpose
  console.info(`(dummy) Set fan ${deviceId} speed to ${speed}`);
  return Promise.resolve();
}
