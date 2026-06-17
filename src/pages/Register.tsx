import {
  Alert,
  Box,
  Button,
  Container,
  MenuItem,
  Paper,
  Select,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";

import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../components/firebase";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { FirebaseError } from "firebase/app";

function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [stabName, setStabName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [service, setService] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setCPassword] = useState("");
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

  const handleRegister = async () => {
    try {
      if (
        !name.trim() ||
        !email.trim() ||
        !number.trim() ||
        !service.trim() ||
        !password.trim() ||
        !confirmPassword.trim()
      ) {
        return showSnackbar("Preencha todos os campos!");
      }
      if (password.length < 6) {
        return showSnackbar("A senha deve ter no mínimo 6 caracteres");
      }
      if (password !== confirmPassword) {
        showSnackbar("As senhas não coincidem!");
        return;
      }
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name,
        stabName,
        email,
        phone: number.replace(/\D/g, ""),
        serviceType: service,
        role: "professional",
        plan: "free",
        createdAt: serverTimestamp(),
      });
      showSnackbar("Conta criada com sucesso!");
      navigate("/login");
    } catch (error) {
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case "auth/email-already-in-use":
            showSnackbar("Este e-mail já está em uso.");
            setLoading(false);
            break;

          case "auth/invalid-email":
            showSnackbar("E-mail inválido.");
            setLoading(false);
            break;

          case "auth/weak-password":
            showSnackbar("Senha muito fraca.");
            setLoading(false);
            break;

          default:
            showSnackbar("Erro ao criar conta.");
            setLoading(false);
            break;
        }
      } else {
        showSnackbar("Erro inesperado.");
        setLoading(false);
      }
    }
  };

  function formatPhone(phone: string) {
    const numbers = phone.replace(/\D/g, "").slice(0, 13);

    if (numbers.length <= 2) {
      return numbers;
    }

    if (numbers.length <= 8) {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    }

    return `(${numbers.slice(0, 2)}) ${numbers.slice(
      2,
      8,
    )}-${numbers.slice(8)}`;
  }

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
            maxWidth: "520px",
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

            <Typography
              sx={{
                mt: 3,
                fontWeight: 550,
                fontSize: { xs: 18, sm: 20 },
              }}
            >
              Criar Conta
            </Typography>
          </Box>
          <Box>
            <Typography sx={inputLabel}>Nome do Profissional</Typography>
            <TextField
              sx={inputStyle}
              variant="outlined"
              placeholder="Nome completo"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
            <Typography sx={inputLabel}>Nome do Negócio (opcional)</Typography>
            <TextField
              sx={inputStyle}
              variant="outlined"
              placeholder="Nome do seu negócio"
              value={stabName}
              onChange={(event) => setStabName(event.target.value)}
            />
            <Typography sx={inputLabel}>E-mail</Typography>
            <TextField
              sx={inputStyle}
              type="email"
              variant="outlined"
              placeholder="seu@email.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <Typography sx={inputLabel}>Telefone</Typography>
            <TextField
              sx={inputStyle}
              variant="outlined"
              placeholder="(99) 99999-9999"
              value={formatPhone(number)}
              onChange={(event) => {
                const numbers = event.target.value
                  .replace(/\D/g, "")
                  .slice(0, 13);
                setNumber(numbers);
              }}
            />
            <Typography sx={inputLabel}>
              Tipo de Serviço/Área de Atuação
            </Typography>
            <Select
              defaultValue=""
              displayEmpty
              sx={{
                ...inputStyle,
                "& .MuiSelect-select": {
                  padding: "14px",
                  backgroundColor: "#f3f4f6",
                },
                borderRadius: "10px",
                border: "1px solid #e5e7eb",
                height: 40,
              }}
              value={service}
              onChange={(event) => setService(event.target.value)}
            >
              <MenuItem value="">Selecione uma opção</MenuItem>
              <MenuItem value="barbearia">Barbearia</MenuItem>
              <MenuItem value="salao">Salão de Beleza</MenuItem>
              <MenuItem value="manicure">Manicure</MenuItem>
              <MenuItem value="clinica">Clínica</MenuItem>
              <MenuItem value="tattoo">Tatuagem</MenuItem>
            </Select>
            <Typography sx={inputLabel}>Senha</Typography>
            <TextField
              sx={inputStyle}
              variant="outlined"
              placeholder="******"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <Typography sx={inputLabel}>Confirmar Senha</Typography>
            <TextField
              sx={inputStyle}
              variant="outlined"
              placeholder="******"
              type="password"
              value={confirmPassword}
              onChange={(event) => setCPassword(event.target.value)}
            />
            <Button
              fullWidth
              variant="contained"
              sx={{
                borderRadius: "10px",
                fontWeight: 600,
                textTransform: "none",
              }}
              disabled={loading}
              onClick={handleRegister}
            >
              {loading ? "Criando conta..." : "Registrar"}
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
            Ja possui uma conta?{" "}
            <Box
              component="span"
              onClick={() => navigate("/login")}
              sx={{
                color: "#3b82f6",
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              Fazer Login
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

export default Register;
