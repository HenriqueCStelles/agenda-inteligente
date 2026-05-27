import {
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import CardTravelOutlinedIcon from "@mui/icons-material/CardTravelOutlined";
import EventAvailableOutlinedIcon from "@mui/icons-material/EventAvailableOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import ColorLensOutlinedIcon from "@mui/icons-material/ColorLensOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { signOut } from "firebase/auth";
import { auth } from "./firebase";

function Menu() {
  const location = useLocation();
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Erro ao sair:", error);
    }
  }
  const menus = [
    {
      label: "Dashboard",
      icon: <DashboardOutlinedIcon />,
      path: "/",
    },
    {
      label: "Agenda",
      icon: <CalendarTodayOutlinedIcon />,
      path: "/agenda",
    },
    {
      label: "Clientes",
      icon: <GroupOutlinedIcon />,
      path: "/clientes",
    },
    {
      label: "Serviços",
      icon: <CardTravelOutlinedIcon />,
      path: "/servicos",
    },
    {
      label: "Agendamentos",
      icon: <EventAvailableOutlinedIcon />,
      path: "/agendamentos",
    },
    {
      label: "Solicitações",
      icon: <NotificationsOutlinedIcon />,
      path: "/solicitacoes",
    },
    {
      label: "Configurações",
      icon: <SettingsOutlinedIcon />,
      path: "/configuracoes",
    },
    {
      label: "Personalização",
      icon: <ColorLensOutlinedIcon />,
      path: "/personalizacao",
    },
  ];

  return (
    <Box
      sx={{
        width: "255px",
        height: "100vh",
      }}
    >
      <Paper
        elevation={2}
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box sx={{ display: "flex", padding: "15px" }}>
          <Box
            sx={{
              backgroundColor: "#3b82f6",
              borderRadius: "14px",
              width: "50px",
              height: "50px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CalendarTodayOutlinedIcon sx={{ color: "#ffff" }} />
          </Box>
          <Box sx={{ paddingLeft: "10px" }}>
            <Typography sx={{ fontWeight: 600, fontSize: 20 }}>
              Agenda
            </Typography>
            <Typography sx={{ fontWeight: 600, fontSize: 20 }}>
              Inteligente
            </Typography>
          </Box>
        </Box>
        <Divider />
        <Box sx={{ flex: 1 }}>
          <List>
            {menus.map((item) => {
              const active = location.pathname === item.path;
              return (
                <ListItem key={item.label} disablePadding>
                  <ListItemButton
                    onClick={() => {
                      navigate(item.path);
                    }}
                    sx={{
                      mx: 1,
                      mb: 1,
                      borderRadius: "12px",
                      background: active
                        ? "linear-gradient(90deg, #4f8cff, #3b6eea)"
                        : "transparent",
                      color: active ? "#fff" : "#111827",
                      "&:hover": {
                        backgroundColor: active ? "#2563eb" : "#e5e7eb",
                      },
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        color: active ? "#fff" : "#4b5563",
                        minWidth: "40px",
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText primary={item.label} />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Box>
        <Divider />
        <Box sx={{ p: 2 }}>
          <Button
            fullWidth
            sx={{ color: "#000000", textTransform: "none", gap: 1 }}
            onClick={handleLogout}
          >
            <LogoutOutlinedIcon />
            Sair
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

export default Menu;
