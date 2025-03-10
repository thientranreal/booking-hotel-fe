import Navbar from "@/components/Navbar";
import { CircularProgress, Container } from "@mui/material";
import { Suspense } from "react";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section>
      <Suspense fallback={<CircularProgress />}>
        <Navbar />
      </Suspense>
      <Container sx={{ py: 5 }}>{children}</Container>
    </section>
  );
}
