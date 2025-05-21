/* Author(s): Tobias Vinblad */

// @ts-nocheck
import React, { useState } from "react";
import Popup from "reactjs-popup";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import "reactjs-popup/dist/index.css";
import "./addPopup.css";
import { registerDevice, registerSencor } from "../../controller/API/addDevice";
import { handleAPIError } from "../../controller/API/connection";

type addDevicePopupProps = {
  deviceId: number;
  deviceType: string;
  isSensor?: boolean;
  children: any;
};

/**
 * The `AddDevicePopup` component is a modal popup that allows users to add a new device
 * or sensor to the system. It provides input fields for the name and location,
 * and handles the submission of this data to the server.
 *
 * @param {addDevicePopupProps} props - The properties passed to the component.
 * @param {number} props.deviceId - The ID of the device or sensor to be added.
 * @param {string} props.deviceType - The type of the device or sensor.
 * @param {boolean} [props.isSensor] - Optional flag indicating if the item is a sensor.
 * @param {React.ReactNode} props.children - The trigger element for the popup.
 *
 * @returns {JSX.Element} A React component that renders a modal popup for adding devices.
 */
export default function AddDevicePopup(props: addDevicePopupProps) {
  const { deviceId, deviceType, children } = props;
  const isSensor = props.isSensor || false;
  const queryClient = useQueryClient();
  const [deviceName, setDeviceName] = useState<string>("");
  const [deviceLocation, setDeviceLocation] = useState<string>("");

  const mutation = useMutation({
    mutationFn: async () => {
      const resp = isSensor
        ? await registerSencor(deviceId, deviceName, deviceLocation)
        : await registerDevice(deviceId, deviceName, deviceLocation);
      return resp;
    },
    onSuccess: () => {
      toast.success(
        `${deviceName} was successfully added to ${deviceLocation}`,
        { className: "custom-toast" }
      );
      queryClient.invalidateQueries({
        queryKey: [isSensor ? "unregisteredSencors" : "unregisteredDevices"],
      });
    },
    onError: (error) => {
      const message = handleAPIError(error, "AddDevicePopup");
      toast.error(message, { className: "custom-toast" });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    if (!deviceName || !deviceLocation) {
      toast.error("Please fill all fields", { className: "custom-toast" });
      return;
    }
    mutation.mutate();
  };

  return (
    <Popup trigger={children} modal className="add-device">
      {(close: any) => (
        <>
          {mutation.isSuccess && close()}
          <button className="add-device-close" onClick={close}>
            &times;
          </button>
          <div className="add-device-popup-header">
            {isSensor ? "Sencor" : "Device"}: {deviceId}, Type: {deviceType}
          </div>
          <div className="add-device-popup-content">
            <input
              type="text"
              placeholder="Enter name"
              onChange={(e) => setDeviceName(e.target.value)}
            />
            <input
              type="text"
              name="location"
              placeholder="Enter room"
              list="opt"
              onChange={(e) => setDeviceLocation(e.target.value)}
            />
            <datalist id="opt">
              <option value="Living Room" />
              <option value="Kitchen" />
              <option value="Bedroom" />
              <option value="Bathroom" />
              <option value="Garage" />
              <option value="Office" />
              <option value="Dining Room" />
            </datalist>
            <button
              type="submit"
              className="add-device-submit"
              onClick={handleSubmit}
            >
              Add {isSensor ? "sencor" : "device"}
            </button>
          </div>
        </>
      )}
    </Popup>
  );
}
