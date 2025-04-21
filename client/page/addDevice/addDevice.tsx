/* Author(s): Tobias Vinblad */

import React from "react";
import { useQuery } from "@tanstack/react-query";

import "./addDevice.css";
import AddDevicePopup from "../../component/addDevicePopup/addPoput";
import { handleAPIError } from "../../controller/API/connection";
import { getUnregisteredDevices } from "../../controller/API/addDevice";

type UnregisteredDevice = {
  device_id: number;
  device_type: string;
};

export default function AddDevice() {
  const {
    data: devices,
    isLoading,
    isError,
    error,
  } = useQuery<UnregisteredDevice[]>({
    queryKey: ["unregisteredDevices"],
    queryFn: async () => {
      const resp = await getUnregisteredDevices();
      return resp["data"];
    },
  });

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }
  if (isError || !devices) {
    const message = handleAPIError(error, "AddDevice page");
    return <div className="loading">{message}</div>;
  }

  return (
    <div className="add-device-container">
      <h1 className="add-device-title">Unregisterd Devices</h1>
      <ul className="device-list">
        <li className="device-item-header">
          <span className="device-id-header">ID</span>
          <span className="device-type-header">Type</span>
          <button className="add-device-button" disabled>
            Add Device
          </button>
        </li>
        {devices.map((device, index) => (
          <li key={index} className="device-item">
            <span className="device-id">{device.device_id}</span>
            <span className="device-type">{device.device_type}</span>
            <AddDevicePopup
              deviceId={device.device_id}
              deviceType={device.device_type}
            >
              <button className="add-device-button">Add Device</button>
            </AddDevicePopup>
          </li>
        ))}
      </ul>
    </div>
  );
}
