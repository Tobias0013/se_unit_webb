/* Author(s): Tobias Vinblad */

export const mockDevices = [
  {
    device_id: 1,
    device_name: "Living Room Light",
    status: "off",
    registerd: false,
    location: "living room",
    device_type: "light",
  },
  {
    device_id: 2,
    device_name: "Bedroom Fan",
    status: "off",
    registerd: false,
    location: "bedroom",
    device_type: "fan",
  },
  {
    device_id: 3,
    device_name: "Kitchen Light",
    status: "off",
    registerd: false,
    location: "kitchen",
    device_type: "light",
  },
];

export const mockSchedules = [
  {
    schedule_id: 1,
    device_id: 1,
    action_type: "toggle_on",
    scheduled_time: "2023-10-01T12:00:00Z",
  },
  {
    schedule_id: 2,
    device_id: 2,
    action_type: "toggle_off",
    scheduled_time: "2023-10-01T13:00:00Z",
  },
];