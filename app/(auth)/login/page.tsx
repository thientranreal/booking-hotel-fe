"use client";

import { CircularProgress } from "@mui/material";
import { Suspense } from "react";
import LoginPage from "@/components/auth/LoginPage";

export default function Login() {
  return (
    <Suspense fallback={<CircularProgress />}>
      <LoginPage />
    </Suspense>
  );
}
