import { Box, IconButton, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

interface SidebarHeaderProps {
  isSidebarOpen: boolean,
  toggleSidebar: () => void
}

export const SidebarHeader = ({ isSidebarOpen, toggleSidebar }: SidebarHeaderProps) => {
  const { t } = useTranslation();

  return (
    <Box
      component="header"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        bgcolor: "background.paper",
        color: "text.primary",
        p: 2,
      }}
    >
      <Typography variant="h5" fontWeight="bold">
        {t("app_name")}
      </Typography>

      {isSidebarOpen && (
        <IconButton onClick={toggleSidebar} sx={{ display: { md: "block" } }}>
          <Typography variant="h5">☰</Typography>
        </IconButton>
      )}
    </Box>
  );
};

