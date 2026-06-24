import { TextField, Button, Typography, Paper, Box, Alert } from "@mui/material";
import { Formik } from "formik";
import * as Yup from "yup";
import { useAuth } from "../../context/use-auth";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { loginApi } from "../../api/auth-api";

export default function LoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: ({ email, password }: { email: string, password: string }) =>
      loginApi(email, password),

    onSuccess: (data) => {
      login(data.token);
      navigate("/");
    },

    onError: (error) => {
      console.error(error);
      alert("Invalid credentials");
    },
  });

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <Paper sx={{ p: 3, width: "100%", maxWidth: 448 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Login
        </Typography>

        {mutation.isError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            Login failed
          </Alert>
        )}

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={Yup.object({
            email: Yup.string(),
            password: Yup.string().required("Required"),
          })}
          onSubmit={(values, { setSubmitting }) => {
            mutation.mutate(values);
            setSubmitting(false);
          }}
        >
          {({
            handleSubmit,
            handleChange,
            values,
            errors,
            touched,
          }) => (
            <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={values.email}
                onChange={handleChange}
                error={touched.email && !!errors.email}
                helperText={touched.email && errors.email}
              />

              <TextField
                fullWidth
                label="Password"
                type="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                error={touched.password && !!errors.password}
                helperText={touched.password && errors.password}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
              >
                Login
              </Button>
            </Box>
          )}
        </Formik>
      </Paper>
    </Box>
  );
}