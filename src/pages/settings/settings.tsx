import { Box, Paper } from "@mui/material";
import PageWrapper from "@/components/layouts/page-wrapper";

export default function SettingsPage() {


  return <PageWrapper>
    <Paper
      elevation={0}
      sx={{
        overflow: "hidden",
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 2,
        bgcolor: "background.paper"
      }}
    >

      Settings Page

    </Paper>

  </PageWrapper>
}