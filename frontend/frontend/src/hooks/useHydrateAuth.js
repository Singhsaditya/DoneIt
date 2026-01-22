import { useEffect } from "react";
import { useAuthStore } from "@/stores/authStore";

export default function useHydrateAuth() {
  const hydrate = useAuthStore((s) => s.hydrate);
  useEffect(() => {
    hydrate();
  }, [hydrate]);
}
