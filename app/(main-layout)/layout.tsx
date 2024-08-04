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
      <Container>{children}</Container>
    </section>
  );
}
