import { Box } from "@mui/material";
import LoginForm from "./login-form";

export default function Login() {
  return (
    <Box sx={{ width: "100%", display: "flex", justifyContent: "center", border: 1, borderColor: "divider" }}>
      <Box sx={{ m: 1 }}>
        <LoginForm />
      </Box>
    </Box>
  );
}