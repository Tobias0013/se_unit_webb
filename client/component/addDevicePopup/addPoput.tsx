// @ts-nocheck
import React, { useState } from "react";
import Popup from "reactjs-popup";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import "reactjs-popup/dist/index.css";
import "./addPopup.css";
import { registerDevice } from "../../controller/API/addDevice";
import { handleAPIError } from "../../controller/API/connection";

type addDevicePopupProps = {
  deviceId: number;
  deviceType: string;
  children: any;
};

export default function AddDevicePopup(props: addDevicePopupProps) {
  const { deviceId, deviceType, children } = props;
  const [deviceName, setDeviceName] = useState<string>("");
  const [deviceLocation, setDeviceLocation] = useState<string>("");

  const mutation = useMutation({
    mutationFn: async () => {
      const resp = await registerDevice(deviceId, deviceName, deviceLocation);
      return resp;
    },
    onSuccess: () => {
      toast.success(
        `${deviceName} was successfully added to ${deviceLocation}`,
        { className: "custom-toast" }
      );
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
            Device: {deviceId}, Type: {deviceType}
          </div>
          <div className="add-device-popup-content">
            <input
              type="text"
              placeholder="Enter device name"
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
              Add device
            </button>
          </div>
        </>
      )}
    </Popup>
  );
}
