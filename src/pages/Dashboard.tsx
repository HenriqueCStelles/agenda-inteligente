import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import Menu from "../components/Menu";

import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
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
          <Box>
            <Typography sx={{ fontSize: 30, fontWeight: 550 }}>
              Dashboard
            </Typography>
            <Typography sx={{ color: "#6b7280" }}>
              Configure os parâmetros do sistema
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
          <Paper
            elevation={0}
            sx={{
              padding: 2,
              mb: 2,
              border: "1px solid #e5e5e5",
              borderRadius: 3,
              width: "25%",
            }}
          >
            <Box>
              <Typography sx={{ color: "#6b7280", fontSize: 15 }}>
                Agendamentos Hoje
              </Typography>
            </Box>
            <Typography></Typography>
          </Paper>
          <Paper
            elevation={0}
            sx={{
              padding: 2,
              mb: 2,
              border: "1px solid #e5e5e5",
              borderRadius: 3,
              width: "25%",
            }}
          >
            <Box>
              <Typography sx={{ color: "#6b7280", fontSize: 15 }}>
                Confirmados
              </Typography>
            </Box>
            <Typography></Typography>
          </Paper>
          <Paper
            elevation={0}
            sx={{
              padding: 2,
              mb: 2,
              border: "1px solid #e5e5e5",
              borderRadius: 3,
              width: "25%",
            }}
          >
            <Box>
              <Typography sx={{ color: "#6b7280", fontSize: 15 }}>
                Sem Resposta
              </Typography>
            </Box>
            <Typography></Typography>
          </Paper>
          <Paper
            elevation={0}
            sx={{
              padding: 2,
              mb: 2,
              border: "1px solid #e5e5e5",
              borderRadius: 3,
              width: "25%",
            }}
          >
            <Box>
              <Typography sx={{ color: "#6b7280", fontSize: 15 }}>
                Solicitações Pendentes
              </Typography>
            </Box>
            <Typography></Typography>
          </Paper>
        </Box>
        <Paper
          elevation={0}
          sx={{
            padding: 2,
            mb: 2,
            border: "1px solid #e5e5e5",
            borderRadius: 2,
          }}
        >
          <Typography sx={{ fontWeight: 550, mb: 2 }}>Agenda do Dia</Typography>
          <Grid></Grid>
        </Paper>
        <Paper
          elevation={0}
          sx={{
            padding: 2,
            mb: 2,
            border: "1px solid #bedbff",
            borderRadius: 2,
          }}
        >
          <Box sx={{ display: "flex", mb: 3, justifyContent: "space-between" }}>
            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
              <Box>
                <ErrorOutlineOutlinedIcon
                  sx={{ fontSize: 20, mt: 0.2, color: "#155dfc" }}
                />
              </Box>
              <Typography sx={{ fontWeight: 550 }}>
                Solicitações Pendentes
              </Typography>
            </Box>
            <Box>
              <Button
                sx={{
                  color: "#000",
                  fontWeight: 550,
                  border: "1px solid #e5e5e5",
                  borderRadius: 2,
                  textTransform: "none",
                }}
                onClick={() => navigate("/solicitacoes")}
              >
                Ver todas
              </Button>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}

export default Dashboard;
