import { Box, Button, Paper, TextField, Typography } from "@mui/material";

function Messages() {
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
            Mensagem da Agenda Diária
          </Typography>
          <Typography sx={{ color: "#6b7280" }}>
            Mensagem enviada ao profissional no início do dia com a lista de
            agendamentos
          </Typography>
        </Box>
        <Box sx={{ mb: 2 }}>
          <TextField
            sx={{
              "& .MuiOutlinedInput-root": {
                height: 80,
                borderRadius: "10px",
                backgroundColor: "#f3f4f6",
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
            }}
            fullWidth
            type="text"
            variant="outlined"
            placeholder="Mensagem da Agenda Diária"
            multiline
            rows={2}
          />
        </Box>
        <Button
          sx={{
            fontWeight: 550,
            color: "#fff",
            backgroundColor: "#000",
            borderRadius: 2,
          }}
        >
          Salvar
        </Button>
      </Paper>
      <Paper
        elevation={0}
        sx={{
          border: "1px solid #e5e5e5",
          padding: 3,
          borderRadius: 3,
          width: "60%",
        }}
      >
        <Box sx={{ mb: 2 }}>
          <Typography sx={{ fontWeight: 550 }}>
            Mensagem de Lembrete aos Clientes
          </Typography>
          <Typography sx={{ color: "#6b7280" }}>
            Mensagem enviada aos clientes solicitando confirmação de presença
          </Typography>
        </Box>
        <Box sx={{ mb: 2 }}>
          <TextField
            sx={{
              "& .MuiOutlinedInput-root": {
                height: 80,
                borderRadius: "10px",
                backgroundColor: "#f3f4f6",
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
            }}
            fullWidth
            type="text"
            variant="outlined"
            placeholder="Mensagem de Lembrete aos Clientes"
            multiline
            rows={2}
          />
        </Box>
        <Button
          sx={{
            fontWeight: 550,
            color: "#fff",
            backgroundColor: "#000",
            borderRadius: 2,
          }}
        >
          Salvar
        </Button>
      </Paper>
    </Box>
  );
}

export default Messages;
