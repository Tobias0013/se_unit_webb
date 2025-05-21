/* Author(s): Tobias Vinblad */

import API from "./connection";
import { MOCK } from "./../config";
import { mockDevices, mockRegisterDevice } from "./__mocks__/addDeviceMock";

/**
 * Fetches a list of unregistered devices.
 *
 * If the `MOCK` flag is enabled, this function returns a mocked response
 * containing unregistered devices. Otherwise, it makes an API call to
 * retrieve the unregistered devices from the server.
 *
 * @returns A promise that resolves to an object containing the data of unregistered devices.
 */
export async function getUnregisteredDevices() {
  if (MOCK) {
    return Promise.resolve({ data: mockDevices });
  }
  return await API.get("/devices?registered=false");
}

/**
 * Registers or updates a device with the given details.
 *
 * @param deviceID - The unique identifier of the device.
 * @param deviceName - The name of the device to be registered or updated.
 * @param deviceLocation - The location of the device.
 * @returns A promise that resolves to the response of the API call or mock data if `MOCK` is enabled.
 */
export async function registerDevice(
  deviceID: number,
  deviceName: string,
  deviceLocation: string
) {
  if (MOCK) {
    return Promise.resolve({
      data: mockRegisterDevice(deviceID, deviceName, deviceLocation),
    });
  }
  return await API.patch(`/devices/${deviceID}`, {
    device_name: deviceName,
    location: deviceLocation,
  });
}

/**
 * Fetches a list of unregistered sensors.
 *
 * If the `MOCK` flag is enabled, this function returns a mocked response
 * containing unregistered sensors. Otherwise, it makes an API call to
 * retrieve the unregistered sensors from the server.
 *
 * @returns A promise that resolves to an object containing the data of unregistered sensors.
 */
export async function getUnregisteredSencors() {
  if (MOCK) {
    return Promise.resolve({ data: mockDevices });
  }
  return await API.get("/sensors");
}

/**
 * Registers or updates a sensor with the given details.
 *
 * @param sencorID - The unique identifier of the sensor.
 * @param sencorName - The name of the sensor to be registered or updated.
 * @param sencorLocation - The location of the sensor.
 * @returns A promise that resolves to the response of the API call or mock data if `MOCK` is enabled.
 */
export async function registerSencor(
  sencorID: number,
  sencorName: string,
  sencorLocation: string
) {
  if (MOCK) {
    return Promise.resolve({
      data: mockRegisterDevice(sencorID, sencorName, sencorLocation),
    });
  }
  return await API.patch(`/sensors/${sencorID}`, {
    sensor_name: sencorName,
    location: sencorLocation,
  });
}
