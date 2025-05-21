/* Author(s): Tobias Vinblad */

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import AddDevicePopup from "../../component/addDevicePopup/addPoput";
import { handleAPIError } from "../../controller/API/connection";
import { getUnregisteredSencors } from "../../controller/API/addDevice";
import Loading from "../../component/loading/loading";

type UnregisteredSencor = {
  sensor_id: number;
  sensor_type: string;
  registered: boolean;
};

/**
 * The `AddDevice` component is responsible for displaying a list of unregistered sensors
 * and providing an interface to add them to the system. It fetches the list of sensors
 * using the `useQuery` hook and handles loading, error, and success states.
 *
 * @returns {JSX.Element} A React component that renders a list of unregistered sensors
 * and allows users to add them via a popup interface.
 *
 * @remarks
 * - Displays a loading indicator while fetching data.
 * - Shows an error message if the data fetch fails.
 * - Uses the `AddDevicePopup` component to handle the addition of sensors.
 *
 * @example
 * ```
 * function App() {
 *   return <AddDevice />;
 * }
 * ```
 */
export default function AddDevice() {
  const nav = useNavigate();

  const {
    data: sencors,
    isLoading,
    isError,
    error,
  } = useQuery<UnregisteredSencor[]>({
    queryKey: ["unregisteredSencors"],
    queryFn: async () => {
      const resp = await getUnregisteredSencors();

      // Filter out registered sencors
      const unregisteredSencors = resp["data"].filter(
        (sencor: UnregisteredSencor) => sencor["registered"] === false
      );

      return unregisteredSencors;
    },
  });

  if (isLoading) {
    return <Loading />;
  }
  if (isError || !sencors) {
    const message = handleAPIError(error, "AddDevice page", nav);
    return <div className="loading">{message}</div>;
  }

  return (
    <div className="add-device-container">
      <h1 className="add-device-title">Unregisterd Sencors</h1>
      <ul className="device-list">
        <li className="device-item-header">
          <span className="device-id-header">ID</span>
          <span className="device-type-header">Type</span>
          <button className="add-device-button" disabled>
            Add Device
          </button>
        </li>
        {sencors.map((Sencor, index) => (
          <li key={index} className="device-item">
            <span className="device-id">{Sencor.sensor_id}</span>
            <span className="device-type">{Sencor.sensor_type}</span>
            <AddDevicePopup
              deviceId={Sencor.sensor_id}
              deviceType={Sencor.sensor_type}
              isSensor={true}
            >
              <button className="add-device-button">Add Device</button>
            </AddDevicePopup>
          </li>
        ))}
      </ul>
    </div>
  );
}
