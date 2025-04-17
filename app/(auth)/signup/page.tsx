"use client";

import { CircularProgress } from "@mui/material";
import { Suspense } from "react";
import SignupPage from "@/components/auth/SignupPage";

export default function Signup() {
  return (
    <Suspense fallback={<CircularProgress />}>
      <SignupPage />
    </Suspense>
  );
}
