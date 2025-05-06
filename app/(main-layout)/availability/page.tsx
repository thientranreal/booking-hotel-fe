import Availability from "@/components/availability/Availability";
import { CircularProgress } from "@mui/material";
import { Suspense } from "react";

export default function page() {
  return (
    <Suspense fallback={<CircularProgress />}>
      <Availability />
    </Suspense>
  );
}
