import {
  Box,
  Button,
  FormControlLabel,
  Grid,
  Paper,
  Switch,
  TextField,
  Typography,
} from "@mui/material";

function Hours() {
  const diasSemana = [
    "Domingo",
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado",
  ];
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
  return (
    <Box>
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
            Horários de Atendimento
          </Typography>
          <Typography sx={{ color: "#6b7280" }}>
            Configure os dias e horários de funcionamento do seu estabelecimento
          </Typography>
        </Box>
        <Box sx={{ mb: 2 }}>
          <Typography sx={{ fontWeight: 550 }}>Dias de atendimento</Typography>
          <Grid container spacing={2} mb={4}>
            {diasSemana.map((dia) => (
              <Grid item xs={12} md={3} key={dia}>
                <FormControlLabel control={<Switch />} label={dia} />
              </Grid>
            ))}
          </Grid>
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            mb: 2,
          }}
        >
          <Box>
            <Typography sx={{ fontWeight: 550, fontSize: 14 }}>
              Horário de início
            </Typography>
            <TextField sx={inputStyle} type="time" />
          </Box>
          <Box>
            <Typography sx={{ fontWeight: 550, fontSize: 14 }}>
              Horário de término
            </Typography>
            <TextField sx={inputStyle} type="time" />
          </Box>
          <Box>
            <Typography sx={{ fontWeight: 550, fontSize: 14 }}>
              Intervalo (minutos)
            </Typography>
            <TextField
              sx={inputStyle}
              type="number"
              slotProps={{ htmlInput: { maxLength: 2 } }}
            />
          </Box>
        </Box>
        <Button
          sx={{
            fontWeight: 550,
            color: "#fff",
            backgroundColor: "#000",
            borderRadius: 2,
          }}
        >
          Salvar Horários
        </Button>
      </Paper>
    </Box>
  );
}

export default Hours;
