/* Author(s): Tobias Vinblad */

import React from "react";

import "./addPage.css";
import AddDevice from "../../component/addDevice/addDevice";
import AddSencor from "../../component/addSencor/addSencor";

/**
 * The `AddPage` component serves as a container for adding devices and sensors.
 * It imports and renders the `AddDevice` and `AddSencor` components, allowing users
 * to add new devices and sensors to the system.
 *
 * @returns {JSX.Element} A React component that renders the add device and sensor interfaces.
 *
 * @example
 * ```
 * import AddPage from './AddPage';
 *
 * function App() {
 *   return <AddPage />;
 * }
 * ```
 */
export default function AddPage() {
  return (
    <>
      <AddDevice />
      <AddSencor />
    </>
  );
}
