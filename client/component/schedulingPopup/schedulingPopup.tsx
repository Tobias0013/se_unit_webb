/* Author(s): Tobias Vinblad */

// @ts-nocheck
import React, { useState } from "react";
import Popup from "reactjs-popup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import "reactjs-popup/dist/index.css";
import "./schedulingPopup.css";

import { addSchedule } from "../../controller/API/scheduling";
import { handleAPIError } from "../../controller/API/connection";
import { Device } from "../../page/schedule/schedule";

type SchedulingPopupProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  devices: Device[];
};

/**
 * A React component that renders a popup for scheduling actions on devices.
 *
 * @component
 * @param {SchedulingPopupProps} props - The properties for the SchedulingPopup component.
 * @param {boolean} props.open - A boolean indicating whether the popup is open.
 * @param {React.Dispatch<React.SetStateAction<boolean>>} props.setOpen - A function to toggle the popup's open state.
 * @param {Array<{ device_id: number; device_name: string; location: string }>} props.devices - An array of devices available for scheduling.
 *
 * @returns {JSX.Element} The rendered SchedulingPopup component.
 *
 * @remarks
 * - This component uses the `useMutation` hook from React Query to handle scheduling actions.
 * - The user can select a device, a date/time, and an action (e.g., toggle on/off) to schedule.
 * - Displays success or error messages using the `toast` library.
 *
 * @example
 * <SchedulingPopup
 *   open={isPopupOpen}
 *   setOpen={setPopupOpen}
 *   devices={devices}
 * />
 */
export default function SchedulingPopup(props: SchedulingPopupProps) {
  const { open, setOpen, devices } = props;
  const queryClient = useQueryClient();

  const [selectedDeviceId, setSelectedDevice] = useState<number>(
    devices[0].device_id
  );
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedAction, setSelectedAction] = useState<string>("toggle_on");

  const mutation = useMutation({
    mutationFn: async () => {
      if (!selectedDate) {
        toast.error("Please select a date", { className: "custom-toast" });
        return;
      }
      const resp = await addSchedule(
        selectedDeviceId,
        selectedAction,
        selectedDate
      );
      return resp.data;
    },
    onSuccess: (data) => {
      toast.success("Schedule added successfully", {
        className: "custom-toast",
      });
      console.log("Schedule added:", data);
      setOpen(false);
      queryClient.invalidateQueries({ queryKey: ["schedules"] });
    },
    onError: (error) => {
      const message = handleAPIError(error, "SchedulingPopup", null);
      toast.error(message);
    },
  });

  return (
    <Popup
      modal
      className="schedule-device"
      open={open}
      onClose={() => setOpen(false)}
    >
      {(close) => (
        <>
          <button className="schedule-device-close" onClick={close}>
            &times;
          </button>
          <div className="schedule-device-popup-header">Schedule action</div>
          <div className="schedule-device-popup-content">
            <div>
              <label>Select device:</label>
            </div>
            <select
              onChange={(e) => setSelectedDevice(parseInt(e.target.value))}
            >
              {devices.map((device) => (
                <option key={device.device_id} value={device.device_id}>
                  {device.device_name} - {device.location}
                </option>
              ))}
            </select>

            <div>
              <label>Select time:</label>
            </div>
            <input
              type="datetime-local"
              onClick={(e) => e.target.showPicker && e.target.showPicker()}
              onChange={(e) => setSelectedDate(new Date(e.target.value))}
            />

            <div>
              <label>Select action:</label>
            </div>
            <select onChange={(e) => setSelectedAction(e.target.value)}>
              <option value="toggle_on">Toggle on</option>
              <option value="toggle_off">Toggle off</option>
            </select>

            <button
              className="schedule-device-submit"
              onClick={() => mutation.mutate()}
            >
              Add schedule
            </button>
          </div>
        </>
      )}
    </Popup>
  );
}
