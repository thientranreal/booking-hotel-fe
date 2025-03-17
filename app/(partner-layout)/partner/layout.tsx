import Sidebar from "@/components/Sidebar";
import { Box } from "@mui/material";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section>
      <Box display="flex">
        <Sidebar />
        <Box sx={{ py: 5, ml: 5 }}>{children}</Box>
      </Box>
    </section>
  );
}
