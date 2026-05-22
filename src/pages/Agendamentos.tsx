import {
  Box,
  Button,
  Grid,
  InputAdornment,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import Menu from "../components/Menu";

import AddIcon from "@mui/icons-material/Add";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useState } from "react";

function Agendamentos() {
  const [status, setStatus] = useState("");
  const inputStyle = {
    mb: 2,
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
    <Box sx={{ display: "flex" }}>
      <Box>
        <Menu />
      </Box>
      <Box
        sx={{
          marginLeft: 0,
          marginRight: 0,
          paddingTop: 4,
          paddingLeft: 3,
          paddingRight: 3,
          width: "100%",
        }}
      >
        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box>
              <Typography sx={{ fontSize: 30, fontWeight: 550 }}>
                Agendamentos
              </Typography>
              <Typography>Gerencie todos os agendamentos</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#000000",
                  gap: 1,
                  px: 1,
                  borderRadius: 3,
                  fontWeight: 550,
                }}
              >
                <AddIcon />
                Novo Agendamento
              </Button>
            </Box>
          </Box>
        </Box>
        <Box>
          <Paper elevation={0} sx={{ border: "1px solid #e5e5e5" }}>
            <Box sx={{ padding: 2, paddingBottom: 0, display: "flex", gap: 1 }}>
              <TextField
                sx={{ ...inputStyle, width: "80%" }}
                fullWidth
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchOutlinedIcon sx={{ color: "#abafb4" }} />
                      </InputAdornment>
                    ),
                  },
                }}
                placeholder="Buscar por cliente ou horário..."
              />
              <Select
                defaultValue=""
                displayEmpty
                sx={{
                  ...inputStyle,
                  width: "20%",
                  "& .MuiSelect-select": {
                    padding: "14px",
                    backgroundColor: "#f3f4f6",
                  },
                  borderRadius: "10px",
                  border: "1px solid #e5e7eb",
                  height: 40,
                }}
                value={status}
                onChange={(event) => setStatus(event.target.value)}
              >
                <MenuItem value="">Todos os status</MenuItem>
                <MenuItem value="confirmado">Confirmado</MenuItem>
                <MenuItem value="pendente">Pendente</MenuItem>
                <MenuItem value="semResposta">Sem Resposta</MenuItem>
                <MenuItem value="aguardando">Aguardando</MenuItem>
                <MenuItem value="cancelado">Cancelado</MenuItem>
              </Select>
            </Box>
            <Box sx={{ paddingBottom: 1 }}>
              <Grid></Grid>
            </Box>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
}

export default Agendamentos;
