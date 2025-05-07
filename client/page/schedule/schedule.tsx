/* Author(s): Tobias Vinblad */

import React, { useEffect, useState } from "react";
import "./schedule.css";
import { toast } from "react-toastify";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { NavigateFunction, useNavigate } from "react-router-dom";

import {
  getDevices,
  deleteSchedule,
  getSchedules,
} from "../../controller/API/scheduling";
import Loading from "../../component/loading/loading";
import { handleAPIError } from "../../controller/API/connection";
import SchedulingPopup from "../../component/schedulingPopup/schedulingPopup";

type Schedule = {
  device_name: string;
  device_location: string;
  schedule_id: number;
  device_id: number;
  action_type: string;
  scheduled_time: Date;
};

export type Device = {
  device_id: number;
  device_name: string;
  location: string;
  registered: boolean;
  status: string;
  device_type: string;
};

/**
 * The `SchedulePage` component is responsible for displaying and managing scheduled actions
 * for devices. It fetches schedules and devices from the server, maps them together, and
 * provides functionality to add or delete schedules.
 *
 * @returns {JSX.Element} The rendered SchedulePage component.
 *
 * @remarks
 * - This component uses React Query's `useQuery` to fetch schedules and devices, and `useMutation` to handle schedule deletion.
 * - It displays a list of schedules with details such as device name, location, action time, and action type.
 * - A popup is available for adding new scheduled actions.
 * - Toast notifications are used to provide feedback on successful or failed operations.
 * - The component also handles mobile orientation changes to adjust the layout accordingly.
 *
 * @example
 * import SchedulePage from './schedule';
 *
 * function App() {
 *   return <SchedulePage />;
 * }
 */
export default function SchedulePage() {
  const nav = useNavigate();
  const queryClient = useQueryClient();
  const [devices, setDevices] = useState<Device[]>([]);
  const [openPopup, setOpenPopup] = useState(false);

  const [onMobile, setOnMobile] = useState(
    window.matchMedia("(orientation: portrait)").matches
  );

  useEffect(() => {
    const handleOrientationChange = () => {
      setOnMobile(window.matchMedia("(orientation: portrait)").matches);
    };
    window.addEventListener("resize", handleOrientationChange);
    return () => {
      window.removeEventListener("resize", handleOrientationChange);
    };
  }, []);

  const {
    data: schedules,
    isLoading,
    isError,
    error,
  } = useQuery<Schedule[]>({
    queryKey: ["schedules"],
    queryFn: async () => {
      const respSchedules = (await getSchedules()).data;
      const respDevices = (await getDevices()).data;
      console.log(respSchedules);

      setDevices(respDevices);
      return mapSchedulesToDevices(respSchedules, respDevices, nav);
    },
  });

  const mutation = useMutation({
    mutationFn: async (scheduleId: number) => {
      const resp = await deleteSchedule(scheduleId);
      return resp;
    },
    onSuccess: () => {
      toast.success("Schedule deleted", { className: "custom-toast" });
      queryClient.invalidateQueries({ queryKey: ["schedules"] });
    },
    onError: (error) => {
      const message = handleAPIError(error, "Schedule page");
      toast.error(message, { className: "custom-toast" });
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  if (isError || !schedules) {
    const message = handleAPIError(error, "AddDevice page", nav);
    return <div className="loading">{message}</div>;
  }

  return (
    <div className="schedule-container">
      <h1 className="schedule-title">My Schedules</h1>

      <button
        className="schedule-add-btn"
        onClick={() => setOpenPopup(!openPopup)}
      >
        Add scheduled actions
      </button>
      {openPopup && (
        <SchedulingPopup
          open={openPopup}
          setOpen={setOpenPopup}
          devices={devices}
        />
      )}

      <ul className="schedule-list">
        {!onMobile && (
          <li className="schedule-item-header">
            <span className="schedule-header">Device name</span>
            <span className="schedule-header">Device location</span>
            <span className="schedule-header">Action time</span>
            <span className="schedule-header">Action type</span>
          </li>
        )}
        {schedules.map((schedule, index) => (
          <li key={index} className="schedule-item">
            <span className="schedule-text">
              {onMobile && <strong>Device name: </strong>}
              {schedule.device_name}
            </span>
            <span className="schedule-text">
              {onMobile && <strong>Location: </strong>}
              {schedule.device_location}
            </span>
            <span className="schedule-text">
              {onMobile && <strong>Action time: </strong>}
              {schedule.scheduled_time.toLocaleString()}
            </span>
            <span className="schedule-text">
              {onMobile && <strong>Action type: </strong>}
              {schedule.action_type}
            </span>
            <div className="schedule-btn-container">
              <button
                className="schedule-button"
                onClick={() => mutation.mutate(schedule.schedule_id)}
              >
                Delete Action
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Maps schedules to devices by matching device IDs and formatting the action type.
 *
 * @param schedules - An array of schedule objects.
 * @param devices - An array of device objects.
 * @param nav - The navigation function for redirecting in case of an error.
 * @returns An array of mapped schedule objects with device information and formatted action type.
 *
 * @remarks
 * This function is used to combine schedule and device data, ensuring that each
 * schedule has the corresponding device information. It also formats the action
 * type for better readability.
 */
function mapSchedulesToDevices(
  schedules: any[],
  devices: any[],
  nav: NavigateFunction
) {
  const resp = schedules.map((schedule: any) => {
    const device = devices.find(
      (device: any) => device.device_id === schedule.device_id
    );

    if (!device) {
      console.log("Error 500: backend sent schedule with no device");
      nav("/500");
      return null;
    }

    const action = schedule.action_type.split("_");

    return {
      device_name: device.device_name,
      device_location: device.location,
      ...schedule,
      scheduled_time: new Date(schedule.scheduled_time),
      action_type:
        action[0].charAt(0).toUpperCase() +
        action[0].slice(1) +
        " " +
        action[1],
    };
  });
  return resp;
}
