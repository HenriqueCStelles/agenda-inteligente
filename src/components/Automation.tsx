import {
  Box,
  Button,
  Divider,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

function Automation() {
  const inputStyle = {
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
  return (
    <Box>
      <Paper
        elevation={0}
        sx={{
          border: "1px solid #e5e5e5",
          padding: 3,
          borderRadius: 3,
          width: "60%",
          mb: 3,
        }}
      >
        <Box sx={{ mb: 2 }}>
          <Typography sx={{ fontWeight: 550 }}>
            Configurações de Automação
          </Typography>
          <Typography sx={{ color: "#6b7280" }}>
            Configure quando as mensagens automáticas devem ser enviadas
          </Typography>
        </Box>
        <Box sx={{ mb: 2, display: "flex", gap: 3 }}>
          <Box sx={{ width: "50%" }}>
            <Typography sx={{ fontWeight: 550, fontSize: 14 }}>
              Horário de envio da adenda diária
            </Typography>
            <TextField sx={inputStyle} type="time" />
            <Typography sx={{ color: "#6b7280", fontSize: 13 }}>
              Agenda será enviada ao profissional neste horário
            </Typography>
          </Box>
          <Box sx={{ width: "50%" }}>
            <Typography sx={{ fontWeight: 550, fontSize: 14 }}>
              Horário de envio dos lembretes aos clientes
            </Typography>
            <TextField sx={inputStyle} type="time" />
            <Typography sx={{ color: "#6b7280", fontSize: 13 }}>
              Lembretes serão enviados após confirmação da agenda
            </Typography>
          </Box>
        </Box>
        <Divider />
        <Box sx={{ paddingTop: 2, mb: 2 }}>
          <Typography sx={{ fontWeight: 550 }}>
            Configurações do WhatsApp
          </Typography>
          <Paper
            elevation={0}
            sx={{
              border: "1px solid #e5e5e5",
              padding: 3,
              borderRadius: 3,
              width: "95%",
              mt: 2,
            }}
          >
            <Box>
              <Typography sx={{ fontWeight: 550 }}>
                Integração com WhatsApp
              </Typography>
              <Typography sx={{ color: "#6b7280", fontSize: 14 }}>
                Status da conexão com a plataforma WhatsApp
              </Typography>
            </Box>
          </Paper>
        </Box>
        <Button
          sx={{
            fontWeight: 550,
            color: "#fff",
            backgroundColor: "#000",
            borderRadius: 2,
          }}
        >
          Salvar Configurações
        </Button>
      </Paper>
    </Box>
  );
}

export default Automation;
