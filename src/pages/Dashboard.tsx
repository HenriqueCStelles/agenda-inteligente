import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import Menu from "../components/Menu";

import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Dashboard() {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const formattedDate = currentDate.toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const paperStyle = {
    padding: 2,
    mb: 2,
    border: "1px solid #e5e5e5",
    borderRadius: 3,
    width: "25%",
  };
  const titleBox = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
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
          <Box>
            <Typography sx={{ fontSize: 30, fontWeight: 550 }}>
              Dashboard
            </Typography>
            <Typography sx={{ color: "#6b7280" }}>{formattedDate}</Typography>
          </Box>
        </Box>
        <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
          <Paper elevation={0} sx={paperStyle}>
            <Box sx={titleBox}>
              <Typography sx={{ color: "#6b7280", fontSize: 15 }}>
                Agendamentos Hoje
              </Typography>
              <Box>
                <CalendarTodayOutlinedIcon sx={{ color: "#6b7280" }} />
              </Box>
            </Box>
            <Typography></Typography>
          </Paper>
          <Paper elevation={0} sx={paperStyle}>
            <Box sx={titleBox}>
              <Typography sx={{ color: "#6b7280", fontSize: 15 }}>
                Confirmados
              </Typography>
              <Box>
                <CheckCircleOutlineOutlinedIcon sx={{ color: "#00a63e" }} />
              </Box>
            </Box>
            <Typography></Typography>
          </Paper>
          <Paper elevation={0} sx={paperStyle}>
            <Box sx={titleBox}>
              <Typography sx={{ color: "#6b7280", fontSize: 15 }}>
                Sem Resposta
              </Typography>
              <Box>
                <QueryBuilderIcon sx={{ color: "#f54a00" }} />
              </Box>
            </Box>
            <Typography></Typography>
          </Paper>
          <Paper elevation={0} sx={paperStyle}>
            <Box sx={titleBox}>
              <Typography sx={{ color: "#6b7280", fontSize: 15 }}>
                Solicitações Pendentes
              </Typography>
              <Box>
                <ErrorOutlineOutlinedIcon
                  sx={{ fontSize: 25, color: "#155dfc" }}
                />
              </Box>
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
