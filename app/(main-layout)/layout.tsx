import Navbar from "@/components/Navbar";
import { Container } from "@mui/material";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section>
      <Navbar />
      <Container sx={{ py: 5 }}>{children}</Container>
    </section>
  );
}
