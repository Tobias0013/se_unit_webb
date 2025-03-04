import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { clearToken } from "../../controller/jwtToken";

export default function Logout() {
  const nav = useNavigate();

  useEffect(() => {
    clearToken();
    nav("/");
  }, []);

  return null;
}
