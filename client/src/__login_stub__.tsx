import { useEffect } from "react";
import { useLocation } from "wouter";

export default function LoginStub() {
  const [, navigate] = useLocation();

  useEffect(() => {
    navigate("/overview");
  }, [navigate]);

  return null;
}
