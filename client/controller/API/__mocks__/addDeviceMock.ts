export const mockDevices = [
  {
    device_id: 1,
    device_name: "",
    status: "off",
    registerd: false,
    location: "",
    device_type: "light",
  },
  {
    device_id: 2,
    device_name: "",
    status: "off",
    registerd: false,
    location: "",
    device_type: "fan",
  },
  {
    device_id: 3,
    device_name: "",
    status: "off",
    registerd: false,
    location: "",
    device_type: "sensor",
  },
];

export const mockRegisterDevice = (
  deviceId: number,
  deviceName: string,
  location: string
) => {
  return {
    device_id: deviceId,
    device_name: deviceName,
    status: "off",
    registerd: true,
    location: location,
    device_type: "device_type",
  };
};
