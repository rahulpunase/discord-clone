import { useEffect, useState } from "react";

export const useOrigin = (): string => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const origin = typeof window !== "undefined" ? window.location.origin : "";

  if (!mounted) {
    return "";
  }

  return origin;
};
