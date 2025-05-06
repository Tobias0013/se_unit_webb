/* Author(s): Tobias Vinblad */

import API from "./connection";
import { MOCK } from "./../config";
import { mockDevices, mockSchedules } from "./__mocks__/scheduleDeviceMock";

/**
 * Fetches the list of devices. If the application is in mock mode, it returns
 * a mocked response. Otherwise, it makes an API call to retrieve the devices
 * that are registered.
 *
 * @returns {Promise<{ data: any }>} A promise that resolves to the response containing the devices data.
 * 
 * @remarks
 * This function is used to get the list of devices from the server. If the
 * `MOCK` flag is set to true, it will return a predefined list of devices
 * instead of making an actual API call. This is useful for testing and
 * development purposes.
 */
export async function getDevices() {
  if (MOCK) {
    return Promise.resolve({ data: mockDevices });
  }
  return await API.get("/devices?registered=true");
}

/**
 * Adds a new schedule for a specific device with the specified action and time.
 *
 * @param deviceId - The ID of the device to schedule an action for.
 * @param actionType - The type of action to schedule (e.g., "toggle_on").
 * @param scheduledTime - The date and time when the action should be executed.
 * @returns A promise that resolves to the response data containing the schedule details.
 *
 * @remarks
 * If the `MOCK` flag is enabled, the function returns a mocked response.
 * Otherwise, it sends a POST request to the `/schedules` endpoint.
 */
export async function addSchedule(
  deviceId: number,
  actionType: string,
  scheduledTime: Date
) {
  if (MOCK) {
    return Promise.resolve({
      data: { schedule_id: 1, device_id: deviceId, action_type: "toggle_on" },
    });
  }
  return await API.post("/schedules", {
    device_id: deviceId,
    action_type: actionType,
    scheduled_time: scheduledTime,
  });
}

/**
 * Fetches the schedules from the API.
 *  
 * @returns A promise that resolves to the schedule data.
 * 
 * @remarks
 * If the `MOCK` flag is enabled, it returns mock schedule data.
 * Otherwise, it performs an API call to fetch the schedules.
 */
export async function getSchedules() {
  if (MOCK) {
    return Promise.resolve({ data: mockSchedules });
  }
  return await API.get("/schedules");
}

/**
 * Deletes a schedule by its ID.
 *
 * @param scheduleId - The unique identifier of the schedule to be deleted.
 * @returns A promise that resolves to a response object indicating the result of the deletion.
 *
 * @remarks
 * - If the `MOCK` flag is enabled, the function returns a mocked response.
 * - Otherwise, it sends a DELETE request to the `/schedules/:scheduleId` endpoint using the `API` client.
 */
export async function deleteSchedule(scheduleId: number) {
  if (MOCK) {
    return Promise.resolve({ message: "Schedule deleted" });
  }
  return await API.delete(`/schedules/${scheduleId}`);
}
