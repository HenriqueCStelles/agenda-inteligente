import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const navigate = useNavigate();
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
            <Typography sx={{ mt: 3, fontWeight: 550, fontSize: 20 }}>
              Recuperar Conta
            </Typography>
            <Typography
              sx={{ fontSize: "15px", color: "#6b7280", textAlign: "center" }}
            >
              Enviaremos um link de recuperação para o seu e-mail
            </Typography>
          </Box>
          <Box>
            <Typography sx={inputLabel}>E-mail</Typography>
            <TextField
              sx={inputStyle}
              type="email"
              variant="outlined"
              placeholder="seu@email.com"
            />
            <Button
              fullWidth
              variant="contained"
              sx={{ borderRadius: "10px", fontWeight: 600 }}
              onClick={() => navigate("/login")}
            >
              Enviar link de recuperação
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
            {" "}
            <Box
              component="span"
              onClick={() => navigate("/login")}
              sx={{
                color: "#3b82f6",
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              Voltar ao login
            </Box>
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}

export default ForgotPassword;
