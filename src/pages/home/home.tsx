import { Box } from "@mui/material";

export default function Home() {


  return (
    <Box
      sx={{
        minHeight: "100%",
        borderRadius: 2,
        background: (theme) =>
          theme.palette.mode === "dark"
            ? "linear-gradient(135deg, rgba(25, 118, 210, 0.22), rgba(156, 39, 176, 0.12) 45%, rgba(18, 18, 18, 0) 72%)"
            : "linear-gradient(135deg, rgba(25, 118, 210, 0.12), rgba(236, 64, 122, 0.08) 46%, rgba(255, 255, 255, 0) 72%)",
        p: { xs: 2, md: 4 }
      }}
    >
      Home Page
    </Box >
  );
}
