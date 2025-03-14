import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { clearToken } from "../../controller/jwtToken";


/**
 * A React component that handles user logout.
 * 
 * This component clears the user's authentication token and navigates
 * them back to the home page.
 * 
 * @example
 * // Usage
 * <Logout />
 * 
 * @returns {null} This component does not render anything.
 */
export default function Logout() {
  const nav = useNavigate();

  useEffect(() => {
    clearToken();
    nav("/");
  }, []);

  return null;
}
