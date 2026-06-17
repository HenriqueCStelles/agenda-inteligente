import {
  Alert,
  Box,
  Button,
  Container,
  Paper,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";

import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../components/firebase";
import { FirebaseError } from "firebase/app";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "error" as "error" | "success" | "warning" | "info",
  });

  const showSnackbar = (
    message: string,
    severity: "error" | "success" | "warning" | "info" = "error",
  ) => {
    setSnackbar({
      open: true,
      message,
      severity,
    });
  };

  const handleClose = () => {
    setSnackbar((prev) => ({
      ...prev,
      open: false,
    }));
  };

  const handleLogin = async () => {
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case "auth/invalid-credential":
            showSnackbar("E-mail ou senha inválidos.");
            break;

          case "auth/invalid-email":
            showSnackbar("E-mail inválido.");
            break;

          case "auth/too-many-requests":
            showSnackbar("Muitas tentativas. Tente novamente mais tarde.");
            break;

          default:
            showSnackbar("Erro ao fazer login.");
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    mb: 2,
    width: "100%",
    "& .MuiOutlinedInput-root": {
      borderRadius: "10px",
      backgroundColor: "#f3f4f6",
      height: 40,

      "& fieldset": {
        border: "1px solid #e5e7eb",
      },

      "&:hover fieldset": {
        borderColor: "#d1d5db",
      },

      "&.Mui-focused fieldset": {
        borderColor: "#3b82f6",
      },
    },

    "& input": {
      padding: "4px 12px",
    },
  };
  const inputLabel = {
    fontWeight: 550,
  };

  return (
    <Box
      sx={{
        background: "linear-gradient(180deg,#dfe4f1 0%, #d7dceb 100%)",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 4,
        px: 2,
      }}
    >
      <Container
        maxWidth="sm"
        sx={{
          justifyContent: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          px: { xs: 0, sm: 2 },
        }}
      >
        <Paper
          sx={{
            width: "100%",
            maxWidth: "420px",
            p: { xs: 3, sm: 4 },
            borderRadius: { xs: "18px", sm: "24px" },
            backgroundColor: "#fff",
            boxShadow: "0 18px 40px rgba(0, 0, 0, 0.12)",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
              mb: 4,
            }}
          >
            <Box
              sx={{
                backgroundColor: "#3b82f6",
                borderRadius: "14px",
                width: { xs: "46px", sm: "52px" },
                height: { xs: "46px", sm: "52px" },
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: 2,
              }}
            >
              <CalendarTodayOutlinedIcon sx={{ color: "#fff" }} />
            </Box>

            <Typography
              sx={{
                textAlign: "center",
                fontSize: { xs: "26px", sm: "32px" },
                color: "#111827",
                fontWeight: 550,
              }}
            >
              Agenda Inteligente
            </Typography>

            <Typography
              sx={{
                fontSize: { xs: "14px", sm: "15px" },
                color: "#6b7280",
                textAlign: "center",
                px: 1,
              }}
            >
              Sistema de gestão de agendamentos com automação via WhatsApp
            </Typography>
          </Box>
          <Box>
            <Typography sx={inputLabel}>E-mail</Typography>
            <TextField
              sx={inputStyle}
              type="email"
              variant="outlined"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Typography sx={inputLabel}>Senha</Typography>
            <TextField
              sx={inputStyle}
              variant="outlined"
              placeholder="******"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Typography
              sx={{
                textAlign: "center",
                color: "#6b7280",
                fontSize: "15px",
                mb: 2,
              }}
            >
              <Box
                component="span"
                onClick={() => navigate("/changepassword")}
                sx={{
                  color: "#3b82f6",
                  cursor: "pointer",
                  fontWeight: 600,
                }}
              >
                Esqueceu sua senha?
              </Box>
            </Typography>
            <Button
              fullWidth
              variant="contained"
              sx={{
                borderRadius: "10px",
                fontWeight: 600,
                textTransform: "none",
              }}
              disabled={loading}
              onClick={handleLogin}
            >
              {loading ? "Entrando..." : "Entrar"}
            </Button>
          </Box>
          <Typography
            sx={{
              textAlign: "center",
              color: "#6b7280",
              fontSize: "15px",
              mt: 2,
            }}
          >
            Não possui uma conta?{" "}
            <Box
              component="span"
              onClick={() => navigate("/register")}
              sx={{
                color: "#3b82f6",
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              Criar conta
            </Box>
          </Typography>
        </Paper>
        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
        >
          <Alert
            onClose={handleClose}
            severity={snackbar.severity}
            variant="filled"
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
}

export default Login;
